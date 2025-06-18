"use client"

import { useState } from "react"
import { Plus, RefreshCw, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { PiiConfigurationTable } from "./components/pii-configuration-table"
import { PiiConfigurationDialog } from "./components/pii-configuration-dialog"
import { usePiiConfigurations } from "@/hooks/use-pii-configurations"
import type { PiiConfiguration } from "@/types/pii"
import Header from "@/app/components/Header"

export default function PiiSetupPage() {
  const {
    configurations,
    isLoading,
    error,
    addConfiguration,
    updateConfiguration,
    deleteConfiguration,
    refreshConfigurations,
  } = usePiiConfigurations()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingConfiguration, setEditingConfiguration] = useState<PiiConfiguration | undefined>(undefined)

  const handleAdd = () => {
    setEditingConfiguration(undefined)
    setIsDialogOpen(true)
  }

  const handleEdit = (configuration: PiiConfiguration) => {
    setEditingConfiguration(configuration)
    setIsDialogOpen(true)
  }

  const handleSubmit = async (data: any) => {
    if (editingConfiguration) {
      await updateConfiguration(editingConfiguration.id, data)
    } else {
      await addConfiguration(data)
    }
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setEditingConfiguration(undefined)
  }

  const handleDelete = async (id: string) => {
    await deleteConfiguration(id)
  }

  return (
    <div className="min-h-screen bg-gray-50">
        <Header />
      <div className="container mx-auto p-6">
        <Card className="shadow-sm">
          <CardHeader className="border-b bg-white">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="text-2xl font-semibold text-gray-900">PII Configuration Management</CardTitle>
                <CardDescription className="text-gray-600 mt-1">
                  Manage personally identifiable information (PII) field configurations and security policies
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={refreshConfigurations}
                  disabled={isLoading}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                  Refresh
                </Button>
                <Button
                  onClick={handleAdd}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-md"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add PII Configuration
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {error && (
              <Alert className="mb-6 border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">{error}</AlertDescription>
              </Alert>
            )}

            <PiiConfigurationTable
              configurations={configurations}
              onEdit={handleEdit}
              onDelete={handleDelete}
              isLoading={isLoading}
            />
          </CardContent>
        </Card>

        <PiiConfigurationDialog
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
          onSubmit={handleSubmit}
          initialData={editingConfiguration}
          isEditMode={!!editingConfiguration}
        />
      </div>
    </div>
  )
}
