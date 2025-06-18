"use client"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
export default function PiiSetupError() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-center mb-4">
          <AlertCircle className="h-12 w-12 text-red-500" />
        </div>
        <h1 className="text-xl font-semibold text-gray-800 mb-2">Error</h1>
        <p className="text-gray-600 mb-4">
          An error occurred while setting up PII configurations. Please try again later.
        </p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    </div>
  )
}