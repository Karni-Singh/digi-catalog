"use client"

import { useState, useEffect, useCallback } from "react"
import type { PiiConfiguration, PiiConfigurationFormData } from "@/app/pii-setup/types/pii"
import { piiApiService } from "@/app/pii-setup/lib/api/pii-service"
import { toast } from "sonner" // You can use any toast library

interface UsePiiConfigurationsReturn {
  configurations: PiiConfiguration[]
  isLoading: boolean
  error: string | null
  addConfiguration: (data: PiiConfigurationFormData) => Promise<void>
  updateConfiguration: (id: string, data: PiiConfigurationFormData) => Promise<void>
  deleteConfiguration: (id: string) => Promise<void>
  refreshConfigurations: () => Promise<void>
}

export function usePiiConfigurations(): UsePiiConfigurationsReturn {
  const [configurations, setConfigurations] = useState<PiiConfiguration[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchConfigurations = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    const response = await piiApiService.getAllConfigurations()

    if (response.success && response.data) {
      setConfigurations(response.data)
    } else {
      setError(response.error || "Failed to fetch configurations")
      toast?.error("Failed to load PII configurations")
    }

    setIsLoading(false)
  }, [])

  const addConfiguration = useCallback(async (data: PiiConfigurationFormData) => {
    const response = await piiApiService.createConfiguration(data)

    if (response.success && response.data) {
      setConfigurations((prev) => [...prev, response.data!])
      toast?.success("Configuration added successfully")
    } else {
      toast?.error(response.error || "Failed to add configuration")
      throw new Error(response.error || "Failed to add configuration")
    }
  }, [])

  const updateConfiguration = useCallback(async (id: string, data: PiiConfigurationFormData) => {
    const response = await piiApiService.updateConfiguration(id, data)

    if (response.success && response.data) {
      setConfigurations((prev) => prev.map((item) => (item.id === id ? response.data! : item)))
      toast?.success("Configuration updated successfully")
    } else {
      toast?.error(response.error || "Failed to update configuration")
      throw new Error(response.error || "Failed to update configuration")
    }
  }, [])

  const deleteConfiguration = useCallback(async (id: string) => {
    const response = await piiApiService.deleteConfiguration(id)

    if (response.success) {
      setConfigurations((prev) => prev.filter((item) => item.id !== id))
      toast?.success("Configuration deleted successfully")
    } else {
      toast?.error(response.error || "Failed to delete configuration")
      throw new Error(response.error || "Failed to delete configuration")
    }
  }, [])

  useEffect(() => {
    fetchConfigurations()
  }, [fetchConfigurations])

  return {
    configurations,
    isLoading,
    error,
    addConfiguration,
    updateConfiguration,
    deleteConfiguration,
    refreshConfigurations: fetchConfigurations,
  }
}
