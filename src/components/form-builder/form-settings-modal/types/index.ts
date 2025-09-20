import type { FormSchema } from "@/lib/database";

export interface FormSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  schema: FormSchema;
  onSchemaUpdate: (updates: Partial<FormSchema>) => void;
  userEmail?: string;
  formId?: string;
}

export interface NotificationLink {
  label: string;
  url: string;
}

export interface NotificationSettings {
  enabled?: boolean;
  email?: string;
  subject?: string;
  message?: string;
  customLinks?: NotificationLink[];
}

export interface LocalSettings {
  title: string;
  publicTitle?: string;
  hideHeader?: boolean;
  description?: string;
  submitText?: string;
  successMessage?: string;
  redirectUrl?: string;

  layout?: {
    maxWidth?: "sm" | "md" | "lg" | "xl" | "full" | "custom";
    customWidth?: string;
    padding?: "none" | "sm" | "md" | "lg";
    margin?: "none" | "sm" | "md" | "lg";
    borderRadius?: "none" | "sm" | "md" | "lg" | "xl";
    spacing?: "compact" | "normal" | "relaxed";
    alignment?: "left" | "center" | "right";
  };
  colors?: {
    background?: string;
    text?: string;
    primary?: string;
    border?: string;
  };
  typography?: {
    fontFamily?: string;
    fontSize?: "xs" | "sm" | "base" | "lg" | "xl";
    fontWeight?: "light" | "normal" | "medium" | "semibold" | "bold";
    lineHeight?: "tight" | "normal" | "relaxed";
    letterSpacing?: "tight" | "normal" | "wide";
  };
  branding?: {
    socialMedia?: {
      enabled?: boolean;
      platforms?: {
        linkedin?: string;
        twitter?: string;
        youtube?: string;
        instagram?: string;
        facebook?: string;
        github?: string;
        website?: string;
      };
      showIcons?: boolean;
      iconSize?: "sm" | "md" | "lg";
      position?: "footer" | "header" | "both";
    };
    showIkiformBranding?: boolean;
  };
  rateLimit?: {
    enabled?: boolean;
    maxSubmissions?: number;
    timeWindow?: number;
    blockDuration?: number;
    message?: string;
  };
  duplicatePrevention?: {
    enabled?: boolean;
    strategy?: "ip" | "email" | "session" | "combined";
    mode?: "time-based" | "one-time";
    timeWindow?: number;
    message?: string;
    allowOverride?: boolean;
    maxAttempts?: number;
  };
  botProtection?: {
    enabled?: boolean;
    message?: string;
  };
  profanityFilter?: {
    enabled?: boolean;
    strictMode?: boolean;
    replaceWithAsterisks?: boolean;
    customMessage?: string;
    customWords?: string[];
    whitelistedWords?: string[];
  };
  responseLimit?: {
    enabled?: boolean;
    maxResponses?: number;
    message?: string;
  };
  passwordProtection?: {
    enabled?: boolean;
    password?: string;
    message?: string;
  };
  rtl?: boolean;
  notifications?: NotificationSettings;
  showProgress?: boolean;
  quiz?: {
    enabled?: boolean;
    passingScore?: number;
    showScore?: boolean;
    showCorrectAnswers?: boolean;
    allowRetake?: boolean;
    timeLimit?: number;
    resultMessage?: {
      pass?: string;
      fail?: string;
    };
  };
  api?: {
    enabled?: boolean;
    apiKey?: string;
    allowExternalSubmissions?: boolean;
  };
}

export interface BasicInfoSectionProps {
  localSettings: LocalSettings;
  updateSettings: (updates: Partial<LocalSettings>) => void;
}

export interface RateLimitSectionProps {
  localSettings: LocalSettings;
  updateRateLimit: (
    updates: Partial<NonNullable<LocalSettings["rateLimit"]>>
  ) => void;
}

export interface DuplicatePreventionSectionProps {
  localSettings: LocalSettings;
  updateDuplicatePrevention: (
    updates: Partial<NonNullable<LocalSettings["duplicatePrevention"]>>
  ) => void;
}

export interface ProfanityFilterSectionProps {
  localSettings: LocalSettings;
  updateProfanityFilter: (
    updates: Partial<NonNullable<LocalSettings["profanityFilter"]>>
  ) => void;
}

export interface BotProtectionSectionProps {
  localSettings: LocalSettings;
  updateBotProtection: (
    updates: Partial<NonNullable<LocalSettings["botProtection"]>>
  ) => void;
}

export interface SocialMediaSectionProps {
  localSettings: LocalSettings;
  updateSocialMedia: (
    updates: Partial<
      NonNullable<NonNullable<LocalSettings["branding"]>["socialMedia"]>
    >
  ) => void;
}

export interface ApiSectionProps {
  localSettings: LocalSettings;
  updateApi: (updates: Partial<NonNullable<LocalSettings["api"]>>) => void;
  formId?: string;
  schema?: any;
}

export type FormSettingsSection =
  | "basic"
  | "limits"
  | "security"
  | "branding"
  | "notifications"
  | "design"
  | "webhooks"
  | "quiz"
  | "api";

export interface FormSettingsSectionConfig {
  id: FormSettingsSection;
  label: string;
  iconName: string;
}
