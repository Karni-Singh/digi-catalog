"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { PiiConfigurationForm } from "./pii-configuration-form"
import { DEFAULT_FORM_DATA } from "@/constants/pii-options"
import type { PiiConfigurationDialogProps, PiiConfigurationFormData } from "@/types/pii"

export function PiiConfigurationDialog({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isEditMode = false,
}: PiiConfigurationDialogProps) {
  const [formData, setFormData] = useState<PiiConfigurationFormData>({ ...DEFAULT_FORM_DATA })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const initializedRef = useRef(false)

  // Initialize form data when dialog opens
  useEffect(() => {
    if (isOpen && !initializedRef.current) {
      if (initialData && isEditMode) {
        const { id, createdAt, updatedAt, ...dataWithoutMeta } = initialData
        setFormData({ ...DEFAULT_FORM_DATA, ...dataWithoutMeta })
      } else {
        setFormData({ ...DEFAULT_FORM_DATA })
      }
      initializedRef.current = true
    } else if (!isOpen) {
      initializedRef.current = false
    }
  }, [isOpen, initialData, isEditMode])

  // Stable input change handler
  const handleInputChange = (field: keyof PiiConfigurationFormData, value: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await onSubmit(formData)
      handleClose()
    } catch (error) {
      console.error("Form submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({ ...DEFAULT_FORM_DATA })
      initializedRef.current = false
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {isEditMode ? "Edit PII Configuration" : "Add New PII Configuration"}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Configure how personally identifiable information should be handled for this data element. Fields marked
            with * are required.
          </DialogDescription>
        </DialogHeader>
        <PiiConfigurationForm
          formData={formData}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          onCancel={handleClose}
          isEditMode={isEditMode}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  )
}
