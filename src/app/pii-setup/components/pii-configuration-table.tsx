"use client"

import { Pencil, Trash2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import type { PiiConfigurationTableProps } from "@/types/pii"
import { SENSITIVITY_BADGE_VARIANTS, TABLE_HEADERS } from "@/constants/pii-options"
import { useState } from "react"

export function PiiConfigurationTable({
  configurations,
  onEdit,
  onDelete,
  isLoading = false,
}: PiiConfigurationTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    try {
      await onDelete(id)
    } finally {
      setDeletingId(null)
    }
  }

  const getSensitivityBadgeVariant = (level: string) => {
    return SENSITIVITY_BADGE_VARIANTS[level as keyof typeof SENSITIVITY_BADGE_VARIANTS] || "outline"
  }

  const getBooleanBadge = (value: boolean) => (
    <Badge variant={value ? "default" : "outline"}>{value ? "Yes" : "No"}</Badge>
  )

  const TruncatedCell = ({ content, maxWidth = "max-w-xs" }: { content: string; maxWidth?: string }) => (
    <div className={`truncate ${maxWidth}`} title={content}>
      {content}
    </div>
  )

  if (isLoading) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              {TABLE_HEADERS.map((header) => (
                <TableHead key={header.key} className="border border-gray-300 px-4 py-3 font-semibold">
                  {header.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 3 }).map((_, index) => (
              <TableRow key={index}>
                {TABLE_HEADERS.map((header) => (
                  <TableCell key={header.key} className="border border-gray-300 px-4 py-3">
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  if (configurations.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <div className="text-lg font-medium mb-2">No PII configurations found</div>
        <div className="text-sm">Add your first configuration to get started with PII management.</div>
      </div>
    )
  }

  return (
    <div className="rounded-md border border-gray-300 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            {TABLE_HEADERS.map((header) => (
              <TableHead key={header.key} className="border border-gray-300 px-4 py-3 font-semibold">
                {header.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {configurations.map((item) => (
            <TableRow key={item.id} className="hover:bg-gray-50/50">
              <TableCell className="border border-gray-300 px-4 py-3 font-medium">{item.piiCategory}</TableCell>
              <TableCell className="border border-gray-300 px-4 py-3">{item.dataElementName}</TableCell>
              <TableCell className="border border-gray-300 px-4 py-3">
                <TruncatedCell content={item.description} />
              </TableCell>
              <TableCell className="border border-gray-300 px-4 py-3">
                <Badge variant={getSensitivityBadgeVariant(item.sensitivityLevel)}>{item.sensitivityLevel}</Badge>
              </TableCell>
              <TableCell className="border border-gray-300 px-4 py-3">
                {getBooleanBadge(item.maskingRequired)}
              </TableCell>
              <TableCell className="border border-gray-300 px-4 py-3">
                {getBooleanBadge(item.encryptionRequired)}
              </TableCell>
              <TableCell className="border border-gray-300 px-4 py-3">
                <TruncatedCell content={item.accessControlLevel} />
              </TableCell>
              <TableCell className="border border-gray-300 px-4 py-3">{item.retentionPolicy}</TableCell>
              <TableCell className="border border-gray-300 px-4 py-3">
                <TruncatedCell content={item.purpose} />
              </TableCell>
              <TableCell className="border border-gray-300 px-4 py-3">
                <div className="flex justify-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(item)}
                    className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                    title="Edit configuration"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-800 hover:bg-red-50"
                        title="Delete configuration"
                        disabled={deletingId === item.id}
                      >
                        {deletingId === item.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete PII Configuration</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete the configuration for "{item.dataElementName}"? This action
                          cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(item.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
