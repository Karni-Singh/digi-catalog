"use client"

import React from "react"
import { useState, useEffect, useRef, useMemo } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { PiiConfigurationForm } from "./pii-configuration-form"
import { DEFAULT_FORM_DATA } from "@/app/pii-setup/constants/pii-options"
import type { PiiConfigurationDialogProps, PiiConfigurationFormData } from "@/app/pii-setup/types/pii"

export function PiiConfigurationDialog({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isEditMode = false,
}: PiiConfigurationDialogProps) {
  const [formData, setFormData] = useState<PiiConfigurationFormData>({ ...DEFAULT_FORM_DATA })
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Create a stable key for the dialog content
  const dialogKey = useMemo(() => {
    return `dialog-${isEditMode ? initialData?.id || 'edit' : 'add'}-${isOpen}`
  }, [isEditMode, initialData?.id, isOpen])

  // Initialize form data when dialog opens or when switching between add/edit
  useEffect(() => {
    if (isOpen) {
      if (initialData && isEditMode) {
        const { id, createdAt, updatedAt, ...dataWithoutMeta } = initialData
        setFormData({ ...DEFAULT_FORM_DATA, ...dataWithoutMeta })
      } else {
        setFormData({ ...DEFAULT_FORM_DATA })
      }
    }
  }, [isOpen, initialData?.id, isEditMode]) // Only depend on dialog open state and edit mode

  // Stable input change handler with useCallback
  const handleInputChange = React.useCallback((field: keyof PiiConfigurationFormData, value: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return // Prevent double submission
    
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

  const handleClose = React.useCallback(() => {
    if (!isSubmitting) {
      setFormData({ ...DEFAULT_FORM_DATA })
      onClose()
    }
  }, [isSubmitting, onClose])

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent 
        key={dialogKey} // Add stable key here
        className="max-w-4xl max-h-[90vh] overflow-y-auto"
      >
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
          key={`form-${dialogKey}`} // Add stable key to form as well
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