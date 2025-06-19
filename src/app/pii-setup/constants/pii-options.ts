import type { PiiConfigurationFormData } from "@/app/pii-setup/types/pii"

export const PII_CATEGORIES = [
  "Personal Identifiers",
  "Contact Information",
  "Financial Information",
  "Health Information",
  "Biometric Data",
  "Location Data",
  "Employment Information",
  "Educational Information",
] as const

export const SENSITIVITY_LEVELS = ["High", "Medium", "Low"] as const

export const DEFAULT_FORM_DATA: PiiConfigurationFormData = {
  piiCategory: "",
  dataElementName: "",
  description: "",
  sensitivityLevel: "Medium",
  maskingRequired: false,
  encryptionRequired: false,
  accessControlLevel: "",
  retentionPolicy: "",
  purpose: "",
}

export const SENSITIVITY_BADGE_VARIANTS = {
  High: "destructive",
  Medium: "default",
  Low: "secondary",
} as const

export const TABLE_HEADERS = [
  { key: "piiCategory", label: "PII Category" },
  { key: "dataElementName", label: "Data Element Name" },
  { key: "description", label: "Description" },
  { key: "sensitivityLevel", label: "Sensitivity Level" },
  { key: "maskingRequired", label: "Masking Required" },
  { key: "encryptionRequired", label: "Encryption Required" },
  { key: "accessControlLevel", label: "Access Control Level" },
  { key: "retentionPolicy", label: "Retention Policy" },
  { key: "purpose", label: "Purpose" },
  { key: "actions", label: "Actions" },
] as const
