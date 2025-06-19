export interface PiiConfiguration {
  id: string
  piiCategory: string
  dataElementName: string
  description: string
  sensitivityLevel: "High" | "Medium" | "Low"
  maskingRequired: boolean
  encryptionRequired: boolean
  accessControlLevel: string
  retentionPolicy: string
  purpose: string
  createdAt?: string
  updatedAt?: string
}

export type PiiConfigurationFormData = Omit<PiiConfiguration, "id" | "createdAt" | "updatedAt">

export interface PiiConfigurationDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: PiiConfigurationFormData) => Promise<void>
  initialData?: PiiConfiguration
  isEditMode?: boolean
}

export interface PiiConfigurationTableProps {
  configurations: PiiConfiguration[]
  onEdit: (configuration: PiiConfiguration) => void
  onDelete: (id: string) => Promise<void>
  isLoading?: boolean
}

export interface ApiResponse<T> {
  data?: T
  error?: string
  success: boolean
}
