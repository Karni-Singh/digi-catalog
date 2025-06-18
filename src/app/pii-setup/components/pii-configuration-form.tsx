"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"
import { PII_CATEGORIES, SENSITIVITY_LEVELS } from "@/constants/pii-options"
import type { PiiConfigurationFormData } from "@/types/pii"

interface PiiConfigurationFormProps {
  formData: PiiConfigurationFormData
  onInputChange: (field: keyof PiiConfigurationFormData, value: any) => void
  onSubmit: (e: React.FormEvent) => Promise<void>
  onCancel: () => void
  isEditMode: boolean
  isSubmitting?: boolean
}

export function PiiConfigurationForm({
  formData,
  onInputChange,
  onSubmit,
  onCancel,
  isEditMode,
  isSubmitting = false,
}: PiiConfigurationFormProps) {
  const FormField = ({
    label,
    required = false,
    children,
    className = "",
  }: {
    label: string
    required?: boolean
    children: React.ReactNode
    className?: string
  }) => (
    <div className={`space-y-2 ${className}`}>
      <Label className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      {children}
    </div>
  )

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="PII Category" required>
          <Select value={formData.piiCategory || ""} onValueChange={(value) => onInputChange("piiCategory", value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select PII category" />
            </SelectTrigger>
            <SelectContent>
              {PII_CATEGORIES.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>

        <FormField label="Data Element Name" required>
          <Input
            type="text"
            value={formData.dataElementName || ""}
            onChange={(e) => onInputChange("dataElementName", e.target.value)}
            placeholder="e.g., Email Address, Phone Number"
            className="w-full"
            disabled={isSubmitting}
            autoComplete="off"
          />
        </FormField>

        <FormField label="Description" required className="md:col-span-2">
          <Textarea
            value={formData.description || ""}
            onChange={(e) => onInputChange("description", e.target.value)}
            placeholder="Brief description of the data element and its usage"
            className="min-h-[80px] w-full resize-none"
            disabled={isSubmitting}
          />
        </FormField>

        <FormField label="Sensitivity Level" required>
          <Select
            value={formData.sensitivityLevel || ""}
            onValueChange={(value) => onInputChange("sensitivityLevel", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select sensitivity level" />
            </SelectTrigger>
            <SelectContent>
              {SENSITIVITY_LEVELS.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>

        <FormField label="Access Control Level" required>
          <Input
            type="text"
            value={formData.accessControlLevel || ""}
            onChange={(e) => onInputChange("accessControlLevel", e.target.value)}
            placeholder="e.g., Restricted - Manager Approval Required"
            className="w-full"
            disabled={isSubmitting}
            autoComplete="off"
          />
        </FormField>

        <FormField label="Retention Policy" required>
          <Input
            type="text"
            value={formData.retentionPolicy || ""}
            onChange={(e) => onInputChange("retentionPolicy", e.target.value)}
            placeholder="e.g., 7 years, 5 years, Indefinite"
            className="w-full"
            disabled={isSubmitting}
            autoComplete="off"
          />
        </FormField>

        <FormField label="Purpose" required className="md:col-span-2">
          <Textarea
            value={formData.purpose || ""}
            onChange={(e) => onInputChange("purpose", e.target.value)}
            placeholder="Detailed purpose for collecting and using this data"
            className="min-h-[80px] w-full resize-none"
            disabled={isSubmitting}
          />
        </FormField>
      </div>

      <div className="space-y-4 border-t pt-6">
        <h4 className="font-semibold text-gray-900">Security Requirements</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="maskingRequired"
              checked={formData.maskingRequired || false}
              onCheckedChange={(checked) => onInputChange("maskingRequired", !!checked)}
              disabled={isSubmitting}
            />
            <Label htmlFor="maskingRequired" className="text-sm font-normal cursor-pointer">
              Masking Required
            </Label>
          </div>
          <div className="flex items-center space-x-3">
            <Checkbox
              id="encryptionRequired"
              checked={formData.encryptionRequired || false}
              onCheckedChange={(checked) => onInputChange("encryptionRequired", !!checked)}
              disabled={isSubmitting}
            />
            <Label htmlFor="encryptionRequired" className="text-sm font-normal cursor-pointer">
              Encryption Required
            </Label>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-6 border-t">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting} className="px-6">
          Cancel
        </Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 px-6" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isEditMode ? "Updating..." : "Adding..."}
            </>
          ) : isEditMode ? (
            "Update Configuration"
          ) : (
            "Add Configuration"
          )}
        </Button>
      </div>
    </form>
  )
}
