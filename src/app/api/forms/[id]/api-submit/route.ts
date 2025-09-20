import { checkBotId } from "botid/server";
import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import {
  DEFAULT_PROFANITY_FILTER_SETTINGS,
  DEFAULT_RATE_LIMIT_SETTINGS,
} from "@/lib";
import { formsDbServer } from "@/lib/database/database";
import { validateFormApiAccess } from "@/lib/forms/api-keys";
import {
  checkDuplicateSubmission,
  extractEmailFromSubmissionData,
  generateIdentifier,
} from "@/lib/forms/duplicate-prevention";
import { checkFormRateLimit } from "@/lib/forms/rate-limit";
import { createProfanityFilter } from "@/lib/validation/profanity-filter";

/**
 * Sanitizes object strings to prevent XSS attacks
 */
function sanitizeObjectStrings(obj: any): any {
  if (typeof obj === "string")
    return obj.replace(
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      ""
    );

  if (obj && typeof obj === "object") {
    const result: any = {};
    for (const key in obj) result[key] = sanitizeObjectStrings(obj[key]);
    return result;
  }
  return obj;
}

/**
 * API endpoint for external form submissions using API key authentication
 * POST /api/forms/[id]/api-submit
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: formId } = await params;
    const body = await request.json();
    const { data: submissionData } = body;

    // Get API key from Authorization header
    const authHeader = request.headers.get("authorization");
    if (!(authHeader && authHeader.startsWith("Bearer "))) {
      return NextResponse.json(
        {
          error:
            "Missing or invalid authorization header. Use 'Bearer <api_key>'",
        },
        { status: 401 }
      );
    }

    const apiKey = authHeader.substring(7); // Remove "Bearer " prefix

    // Validate API key and get form
    const validationResult = await validateFormApiAccess(apiKey, formId);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error },
        { status: 401 }
      );
    }

    const form = validationResult.form;

    // Check bot protection if enabled
    const botProtection = form.schema.settings.botProtection;
    if (botProtection?.enabled) {
      const verification = await checkBotId();
      if (verification.isBot) {
        return NextResponse.json(
          {
            error: "Bot detected",
            message: botProtection.message || "Bot detected. Access denied.",
          },
          { status: 403 }
        );
      }
    }

    // Get IP address for rate limiting and duplicate prevention
    const headersList = await headers();
    const ipAddress =
      headersList.get("x-forwarded-for")?.split(",")[0] ||
      headersList.get("x-real-ip") ||
      "unknown";

    // Apply rate limiting
    const rateLimit = {
      ...DEFAULT_RATE_LIMIT_SETTINGS,
      ...form.schema.settings.rateLimit,
    };

    if (rateLimit.enabled) {
      const rateLimitResult = await checkFormRateLimit(
        ipAddress,
        formId,
        rateLimit
      );
      if (!rateLimitResult.success) {
        return NextResponse.json(
          {
            error: "Rate limit exceeded",
            message: rateLimitResult.message,
            limit: rateLimitResult.limit,
            remaining: rateLimitResult.remaining,
            reset: rateLimitResult.reset,
          },
          { status: 429 }
        );
      }
    }

    // Check response limit
    const responseLimit = form.schema.settings.responseLimit;
    if (responseLimit?.enabled) {
      const count = await formsDbServer.countFormSubmissions(formId);
      if (count >= (responseLimit.maxResponses || 100)) {
        return NextResponse.json(
          {
            error: "Response limit reached",
            message:
              responseLimit.message ||
              "This form is no longer accepting responses.",
          },
          { status: 403 }
        );
      }
    }

    // Apply profanity filter
    const profanityFilter = {
      ...DEFAULT_PROFANITY_FILTER_SETTINGS,
      ...form.schema.settings.profanityFilter,
    };

    if (profanityFilter.enabled) {
      const profanityFilterService = createProfanityFilter(profanityFilter);
      const result =
        profanityFilterService.filterSubmissionData(submissionData);
      if (!result.isValid) {
        return NextResponse.json(
          {
            error: "Content filtered",
            message:
              result.message || "Submission contains inappropriate content",
            violations: result.violations.length,
          },
          { status: 400 }
        );
      }
    }

    // Check for duplicate submissions
    const duplicatePrevention = form.schema.settings.duplicatePrevention;
    if (duplicatePrevention?.enabled) {
      const email = extractEmailFromSubmissionData(submissionData);
      const identifier = generateIdentifier(
        duplicatePrevention.strategy,
        ipAddress,
        email
      );

      const isDuplicate = await checkDuplicateSubmission(
        formId,
        identifier,
        duplicatePrevention
      );

      if (isDuplicate) {
        return NextResponse.json(
          {
            error: "Duplicate submission",
            message:
              duplicatePrevention.message ||
              "This submission has already been received",
          },
          { status: 409 }
        );
      }
    }

    // Sanitize submission data
    const sanitizedData = sanitizeObjectStrings(submissionData);

    // Submit the form
    try {
      const submissionResult = await formsDbServer.submitForm(
        formId,
        sanitizedData,
        ipAddress
      );

      // Return success response
      return NextResponse.json(
        {
          success: true,
          message:
            form.schema.settings.successMessage ||
            "Form submitted successfully",
          submissionId: submissionResult.id,
          timestamp: new Date().toISOString(),
        },
        { status: 200 }
      );
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      return NextResponse.json(
        { error: "Failed to submit form", details: err.message },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("API form submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint to retrieve form schema for API integration
 * GET /api/forms/[id]/api-submit
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: formId } = await params;

    // Get API key from Authorization header
    const authHeader = request.headers.get("authorization");
    if (!(authHeader && authHeader.startsWith("Bearer "))) {
      return NextResponse.json(
        {
          error:
            "Missing or invalid authorization header. Use 'Bearer <api_key>'",
        },
        { status: 401 }
      );
    }

    const apiKey = authHeader.substring(7); // Remove "Bearer " prefix

    // Validate API key and get form
    const validationResult = await validateFormApiAccess(apiKey, formId);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error },
        { status: 401 }
      );
    }

    const form = validationResult.form;

    // Extract form fields for API documentation
    const fields = form.schema.fields.map((field: any) => ({
      id: field.id,
      type: field.type,
      label: field.label,
      required: field.required,
      placeholder: field.placeholder,
      options: field.options, // For select, radio, checkbox fields
      validation: field.validation,
    }));

    // Return form schema information
    return NextResponse.json(
      {
        formId: form.id,
        title: form.schema.settings.title,
        description: form.schema.settings.description,
        fields,
        settings: {
          rateLimit: form.schema.settings.rateLimit,
          responseLimit: form.schema.settings.responseLimit,
          duplicatePrevention: form.schema.settings.duplicatePrevention,
          profanityFilter: form.schema.settings.profanityFilter,
        },
        apiEndpoint: `/api/forms/${formId}/api-submit`,
        documentation: {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer <your_api_key>",
          },
          body: {
            data: "Object containing form field values keyed by field ID",
          },
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API form schema error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
