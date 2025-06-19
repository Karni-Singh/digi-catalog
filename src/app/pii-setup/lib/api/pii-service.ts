import type { PiiConfiguration, PiiConfigurationFormData, ApiResponse } from "@/app/pii-setup/types/pii"

const API_BASE_URL = "https://6851ae668612b47a2c0af27f.mockapi.io/pii/identifiers/PII"

class PiiApiService {
  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    try {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      return { data, success: true }
    } catch (error) {
      console.error("API Error:", error)
      return {
        error: error instanceof Error ? error.message : "An unknown error occurred",
        success: false,
      }
    }
  }

  async getAllConfigurations(): Promise<ApiResponse<PiiConfiguration[]>> {
    try {
      const response = await fetch(API_BASE_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      })

      const result = await this.handleResponse<PiiConfiguration[]>(response)

      // Ensure all fields have default values to prevent undefined issues
      if (result.success && result.data) {
        result.data = result.data.map((item) => ({
          ...item,
          piiCategory: item.piiCategory || "",
          dataElementName: item.dataElementName || "",
          description: item.description || "",
          sensitivityLevel: item.sensitivityLevel || "Medium",
          maskingRequired: Boolean(item.maskingRequired),
          encryptionRequired: Boolean(item.encryptionRequired),
          accessControlLevel: item.accessControlLevel || "",
          retentionPolicy: item.retentionPolicy || "",
          purpose: item.purpose || "",
        }))
      }

      return result
    } catch (error) {
      return {
        error: "Failed to fetch configurations",
        success: false,
      }
    }
  }

  async createConfiguration(data: PiiConfigurationFormData): Promise<ApiResponse<PiiConfiguration>> {
    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          maskingRequired: Boolean(data.maskingRequired),
          encryptionRequired: Boolean(data.encryptionRequired),
        }),
      })
      return this.handleResponse<PiiConfiguration>(response)
    } catch (error) {
      return {
        error: "Failed to create configuration",
        success: false,
      }
    }
  }

  async updateConfiguration(id: string, data: PiiConfigurationFormData): Promise<ApiResponse<PiiConfiguration>> {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          maskingRequired: Boolean(data.maskingRequired),
          encryptionRequired: Boolean(data.encryptionRequired),
        }),
      })
      return this.handleResponse<PiiConfiguration>(response)
    } catch (error) {
      return {
        error: "Failed to update configuration",
        success: false,
      }
    }
  }

  async deleteConfiguration(id: string): Promise<ApiResponse<void>> {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
      return this.handleResponse<void>(response)
    } catch (error) {
      return {
        error: "Failed to delete configuration",
        success: false,
      }
    }
  }
}

export const piiApiService = new PiiApiService()
