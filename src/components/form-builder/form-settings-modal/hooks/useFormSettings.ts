import { useEffect, useState } from "react";

import type { FormSchema } from "@/lib/database";
import {
  DEFAULT_BOT_PROTECTION_SETTINGS,
  DEFAULT_DUPLICATE_PREVENTION_SETTINGS,
  DEFAULT_NOTIFICATION_SETTINGS,
  DEFAULT_PASSWORD_PROTECTION_SETTINGS,
  DEFAULT_PROFANITY_FILTER_SETTINGS,
  DEFAULT_RATE_LIMIT_SETTINGS,
  DEFAULT_RESPONSE_LIMIT_SETTINGS,
} from "@/lib/forms";
import { DEFAULT_FORM_DESIGN } from "../constants";
import type { LocalSettings } from "../types";

export function useFormSettings(schema: FormSchema, userEmail?: string) {
  const [localSettings, setLocalSettings] = useState<LocalSettings>({
    ...schema.settings,

    layout: {
      maxWidth:
        schema.settings.layout?.maxWidth || DEFAULT_FORM_DESIGN.maxWidth,
      padding: schema.settings.layout?.padding || DEFAULT_FORM_DESIGN.padding,
      spacing: schema.settings.layout?.spacing || "normal",
      alignment: schema.settings.layout?.alignment || "left",
      margin: schema.settings.layout?.margin || DEFAULT_FORM_DESIGN.margin,
      borderRadius:
        schema.settings.layout?.borderRadius ||
        DEFAULT_FORM_DESIGN.borderRadius,
    },
    rateLimit: {
      ...DEFAULT_RATE_LIMIT_SETTINGS,
      ...schema.settings.rateLimit,
    },
    duplicatePrevention: {
      ...DEFAULT_DUPLICATE_PREVENTION_SETTINGS,
      ...(schema.settings as any).duplicatePrevention,
    },
    profanityFilter: {
      ...DEFAULT_PROFANITY_FILTER_SETTINGS,
      ...schema.settings.profanityFilter,
    },
    botProtection: {
      ...DEFAULT_BOT_PROTECTION_SETTINGS,
      ...schema.settings.botProtection,
    },
    responseLimit: {
      ...DEFAULT_RESPONSE_LIMIT_SETTINGS,
      ...schema.settings.responseLimit,
    },
    passwordProtection: {
      ...DEFAULT_PASSWORD_PROTECTION_SETTINGS,
      ...schema.settings.passwordProtection,
    },
    notifications: {
      ...DEFAULT_NOTIFICATION_SETTINGS,
      ...schema.settings.notifications,
      email: schema.settings.notifications?.email || userEmail || "",
    },
    api: {
      enabled: false,
      apiKey: undefined,
      allowExternalSubmissions: false,
      ...schema.settings?.api,
    },
  });

  useEffect(() => {
    // Only update if the schema has actually changed
    setLocalSettings({
      ...schema.settings,

      layout: {
        maxWidth:
          schema.settings.layout?.maxWidth || DEFAULT_FORM_DESIGN.maxWidth,
        padding: schema.settings.layout?.padding || DEFAULT_FORM_DESIGN.padding,
        spacing: schema.settings.layout?.spacing || "normal",
        alignment: schema.settings.layout?.alignment || "left",
        margin: schema.settings.layout?.margin || DEFAULT_FORM_DESIGN.margin,
        borderRadius:
          schema.settings.layout?.borderRadius ||
          DEFAULT_FORM_DESIGN.borderRadius,
      },
      rateLimit: {
        ...DEFAULT_RATE_LIMIT_SETTINGS,
        ...schema.settings.rateLimit,
      },
      duplicatePrevention: {
        ...DEFAULT_DUPLICATE_PREVENTION_SETTINGS,
        ...schema.settings.duplicatePrevention,
      },
      profanityFilter: {
        ...DEFAULT_PROFANITY_FILTER_SETTINGS,
        ...schema.settings.profanityFilter,
      },
      botProtection: {
        ...DEFAULT_BOT_PROTECTION_SETTINGS,
        ...schema.settings.botProtection,
      },
      responseLimit: {
        ...DEFAULT_RESPONSE_LIMIT_SETTINGS,
        ...schema.settings.responseLimit,
      },
      passwordProtection: {
        ...DEFAULT_PASSWORD_PROTECTION_SETTINGS,
        ...schema.settings.passwordProtection,
      },
      notifications: {
        ...DEFAULT_NOTIFICATION_SETTINGS,
        ...schema.settings.notifications,
        email: schema.settings.notifications?.email || userEmail || "",
      },
      api: {
        enabled: false,
        apiKey: undefined,
        allowExternalSubmissions: false,
        ...schema.settings?.api,
      },
    });
  }, [schema.settings, userEmail]);

  const updateSettings = (updates: Partial<LocalSettings>) => {
    setLocalSettings({
      ...localSettings,
      ...updates,
      layout: {
        ...localSettings.layout,
        ...updates.layout,
        margin: updates.layout?.margin ?? localSettings.layout?.margin,
        borderRadius:
          updates.layout?.borderRadius ?? localSettings.layout?.borderRadius,
      },
      rateLimit: {
        ...localSettings.rateLimit,
        ...updates.rateLimit,
      },
      duplicatePrevention: {
        ...localSettings.duplicatePrevention,
        ...updates.duplicatePrevention,
      },
      profanityFilter: {
        ...localSettings.profanityFilter,
        ...updates.profanityFilter,
      },
      responseLimit: {
        ...localSettings.responseLimit,
        ...updates.responseLimit,
      },
      passwordProtection: {
        ...localSettings.passwordProtection,
        ...updates.passwordProtection,
      },
    });
  };

  const updateRateLimit = (
    rateLimitUpdates: Partial<NonNullable<LocalSettings["rateLimit"]>>
  ) => {
    setLocalSettings({
      ...localSettings,
      rateLimit: {
        ...localSettings.rateLimit,
        ...rateLimitUpdates,
      },
    });
  };

  const updateDuplicatePrevention = (
    duplicatePreventionUpdates: Partial<
      NonNullable<LocalSettings["duplicatePrevention"]>
    >
  ) => {
    setLocalSettings({
      ...localSettings,
      duplicatePrevention: {
        ...localSettings.duplicatePrevention,
        ...duplicatePreventionUpdates,
      },
    });
  };

  const updateProfanityFilter = (
    profanityFilterUpdates: Partial<
      NonNullable<LocalSettings["profanityFilter"]>
    >
  ) => {
    setLocalSettings({
      ...localSettings,
      profanityFilter: {
        ...localSettings.profanityFilter,
        ...profanityFilterUpdates,
      },
    });
  };

  const updateBotProtection = (
    botProtectionUpdates: Partial<NonNullable<LocalSettings["botProtection"]>>
  ) => {
    setLocalSettings({
      ...localSettings,
      botProtection: {
        ...localSettings.botProtection,
        ...botProtectionUpdates,
      },
    });
  };

  const updateResponseLimit = (
    responseLimitUpdates: Partial<NonNullable<LocalSettings["responseLimit"]>>
  ) => {
    setLocalSettings({
      ...localSettings,
      responseLimit: {
        ...localSettings.responseLimit,
        ...responseLimitUpdates,
      },
    });
  };

  const updatePasswordProtection = (
    passwordProtectionUpdates: Partial<
      NonNullable<LocalSettings["passwordProtection"]>
    >
  ) => {
    setLocalSettings({
      ...localSettings,
      passwordProtection: {
        ...localSettings.passwordProtection,
        ...passwordProtectionUpdates,
      },
    });
  };

  const updateSocialMedia = (
    socialMediaUpdates: Partial<
      NonNullable<NonNullable<LocalSettings["branding"]>["socialMedia"]>
    >
  ) => {
    setLocalSettings({
      ...localSettings,
      branding: {
        ...localSettings.branding,
        socialMedia: {
          ...localSettings.branding?.socialMedia,
          ...socialMediaUpdates,
        },
      },
    });
  };

  const updateNotifications = (
    notificationUpdates: Partial<LocalSettings["notifications"]>
  ) => {
    setLocalSettings({
      ...localSettings,
      notifications: {
        ...localSettings.notifications,
        ...notificationUpdates,
      },
    });
  };

  const updateApi = (
    apiUpdates: Partial<NonNullable<LocalSettings["api"]>>
  ) => {
    setLocalSettings({
      ...localSettings,
      api: {
        ...localSettings.api,
        ...apiUpdates,
      },
    });
  };

  const resetSettings = () => {
    setLocalSettings({
      ...schema.settings,
      layout: {
        maxWidth:
          schema.settings.layout?.maxWidth || DEFAULT_FORM_DESIGN.maxWidth,
        padding: schema.settings.layout?.padding || DEFAULT_FORM_DESIGN.padding,
        spacing: schema.settings.layout?.spacing || "normal",
        alignment: schema.settings.layout?.alignment || "left",
        margin: schema.settings.layout?.margin || DEFAULT_FORM_DESIGN.margin,
        borderRadius:
          schema.settings.layout?.borderRadius ||
          DEFAULT_FORM_DESIGN.borderRadius,
      },
      rateLimit: {
        ...DEFAULT_RATE_LIMIT_SETTINGS,
        ...schema.settings.rateLimit,
      },
      duplicatePrevention: {
        ...DEFAULT_DUPLICATE_PREVENTION_SETTINGS,
        ...(schema.settings as any).duplicatePrevention,
      },
      profanityFilter: {
        ...DEFAULT_PROFANITY_FILTER_SETTINGS,
        ...schema.settings.profanityFilter,
      },
      responseLimit: {
        ...DEFAULT_RESPONSE_LIMIT_SETTINGS,
        ...schema.settings.responseLimit,
      },
      passwordProtection: {
        ...DEFAULT_PASSWORD_PROTECTION_SETTINGS,
        ...schema.settings.passwordProtection,
      },
      notifications: {
        ...DEFAULT_NOTIFICATION_SETTINGS,
        ...schema.settings.notifications,
        email: schema.settings.notifications?.email || userEmail || "",
      },
    });
  };

  return {
    localSettings,
    updateSettings,
    updateRateLimit,
    updateDuplicatePrevention,
    updateProfanityFilter,
    updateBotProtection,
    updateResponseLimit,
    updatePasswordProtection,
    updateSocialMedia,
    updateNotifications,
    updateApi,
    resetSettings,
  };
}
