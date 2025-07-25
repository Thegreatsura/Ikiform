import { Kbd } from "@/components/ui/kbd";
import React from "react";

const featureCategories = [
  {
    name: "Features",
    features: [
      {
        label: "Unlimited submissions",
        description:
          "Collect as many responses as you want without any limits.",
        included: true,
      },
      {
        label: "Remove Ikiform branding",
        description: "Customize your forms without Ikiform branding.",
        included: true,
      },
      {
        label: "AI Form builder",
        description: "Generate forms instantly using AI based on your needs.",
        included: true,
      },
      {
        label: "Exporting responses",
        description: "Export your form responses as CSV or JSON files.",
        included: true,
      },
      {
        label: "Priority support",
        description:
          "Get faster responses and priority assistance from our team.",
        included: true,
      },
      {
        label: "Mobile builder",
        description: "Build and manage forms easily from your mobile device.",
        included: true,
      },
      {
        label: "Logic builder",
        description: "Create logic and conditional flows for your forms.",
        included: true,
      },
      {
        label: "Webhooks",
        description: "Enhanced webhook support for advanced workflows.",
        included: true,
      },
      {
        label: "Fetching form field data from API",
        description: "Populate form fields dynamically from external APIs.",
        included: true,
      },
      {
        label: "Email notifications",
        description: "Receive email notifications for form submissions.",
        included: true,
      },
      {
        label: "Advance customization",
        description: "Customize your forms with advanced styling options.",
        included: true,
      },
    ],
  },
  {
    name: "Analytics",
    features: [
      {
        label: "Advanced analytics",
        description:
          "Gain insights with detailed analytics and visualizations.",
        included: true,
      },
      {
        label: "Form visit analytics",
        description: "Track visits and interactions with your forms.",
        included: true,
      },
      {
        label: "AI Analytics",
        description: "Get AI-powered suggestions and analytics for your forms.",
        included: true,
      },
      {
        label: "Trend analytics",
        description: "Analyze trends and patterns in your form responses.",
        included: true,
      },
      {
        label: "Drop-off analytics",
        description: "Understand where users drop off in your forms.",
        included: true,
      },
    ],
  },

  {
    name: "Upcoming features",
    features: [
      {
        label: "Team collaboration",
        description: "Work together with your team on forms and analytics.",
        included: false,
      },
      {
        label: "Custom domains",
        description: "Use your own domain for form links and branding.",
        included: false,
      },
      {
        label: "Flagging responses",
        description:
          "Easily flag and review suspicious or important responses.",
        included: false,
      },
      {
        label: "Integrations",
        description: "More integrations with popular tools coming soon.",
        included: false,
      },
      {
        label: "File uploads (in few days)",
        description: "Allow users to upload files with their form submissions.",
        included: false,
      },
      {
        label: "and more",
        description: "We are constantly adding new features and improvements.",
        included: false,
      },
    ],
  },
];

export default function FeatureComparisonTable() {
  return (
    <div className="w-full px-4 md:px-8 pb-8 mx-auto overflow-x-auto">
      <div className="w-full bg-background rounded-card shadow-md/2 border">
        <table className="w-full border-collapse text-left rounded-card overflow-hidden">
          <tbody>
            {featureCategories.map((category) => (
              <React.Fragment key={category.name}>
                <tr>
                  <td
                    colSpan={2}
                    className="bg-muted p-4 font-medium text-base"
                  >
                    {category.name}
                  </td>
                </tr>
                {category.features.map((feature) => (
                  <tr key={feature.label} className="border-b last:border-0">
                    <td className="p-4 align-top">
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="font-medium text-sm text-foreground">
                            {feature.label}
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {feature.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td
                      className={`p-4 text-center align-top max-sm:hidden ${!feature.included ? "text-muted-foreground" : ""}`}
                    >
                      {feature.included ? (
                        <Kbd size={"sm"}>Included</Kbd>
                      ) : (
                        <Kbd size={"sm"}>Soon</Kbd>
                      )}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
