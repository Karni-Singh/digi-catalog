"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, ChevronRight, Database, Settings, Shield, BookOpen, Layers } from "lucide-react"
import { cn } from "@/app/pii-setup/lib/utils"

interface NavItem {
  label: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
}

interface NavSection {
  section: string
  key: "catalogManagement" | "administration" // Restrict to valid keys
  icon: React.ComponentType<{ className?: string }>
  items: NavItem[]
}

// Define the type for expandedSections
type ExpandedSections = {
  catalogManagement: boolean
  administration: boolean
}

const LeftNavigation = () => {
  const pathname = usePathname()
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
    catalogManagement: true,
    administration: true,
  })

  // Fix the toggleSection function to use proper typing
  const toggleSection = (section: keyof ExpandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const navConfig: NavSection[] = [
    {
      section: "Catalog Management",
      key: "catalogManagement",
      icon: Database,
      items: [{ label: "Column Catalog", href: "/column-catalog", icon: Layers }],
    },
    {
      section: "Administration",
      key: "administration",
      icon: Settings,
      items: [
        { label: "Source Setup", href: "/source-setup", icon: Database },
        { label: "DB Connector", href: "/connect-db", icon: Database },
        { label: "PII Setup", href: "/pii-setup", icon: Shield },
        { label: "PCI Setup", href: "/pci-setup", icon: Shield },
        { label: "Our Glossary", href: "/our-glossary", icon: BookOpen },
      ],
    },
  ]

  const isActiveLink = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/")
  }

  return (
    <aside className="w-64 bg-slate-900 text-white h-screen shadow-xl fixed top-0 left-0 z-40 border-r border-slate-700">
      <div className="p-6 border-b border-slate-700">
        <h2 className="text-xl font-bold text-white">Data Catalog</h2>
        <p className="text-sm text-slate-400 mt-1">Management Portal</p>
      </div>

      <nav className="p-4 overflow-y-auto h-[calc(100vh-88px)]">
        <ul className="space-y-2">
          {navConfig.map(({ section, key, icon: SectionIcon, items }) => (
            <li key={key}>
              <button
                onClick={() => toggleSection(key)}
                className={cn(
                  "w-full flex items-center justify-between text-left font-medium transition-all duration-200",
                  "hover:bg-slate-800 px-3 py-2 rounded-lg group",
                  "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900",
                )}
                aria-expanded={expandedSections[key]}
                aria-controls={`section-${key}`}
              >
                <div className="flex items-center space-x-3">
                  <SectionIcon className="h-5 w-5 text-slate-400 group-hover:text-white transition-colors" />
                  <span className="text-slate-200 group-hover:text-white transition-colors">{section}</span>
                </div>
                {expandedSections[key] ? (
                  <ChevronDown className="h-4 w-4 text-slate-400 group-hover:text-white transition-all duration-200" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-white transition-all duration-200" />
                )}
              </button>

              {expandedSections[key] && (
                <ul id={`section-${key}`} className="ml-8 mt-2 space-y-1 animate-in slide-in-from-top-2 duration-200">
                  {items.map(({ label, href, icon: ItemIcon }) => {
                    const isActive = isActiveLink(href)
                    return (
                      <li key={href}>
                        <Link
                          href={href}
                          className={cn(
                            "flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200",
                            "hover:bg-slate-800 group relative",
                            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900",
                            isActive ? "bg-blue-600 text-white shadow-lg" : "text-slate-300 hover:text-white",
                          )}
                        >
                          {ItemIcon && (
                            <ItemIcon
                              className={cn(
                                "h-4 w-4 transition-colors",
                                isActive ? "text-white" : "text-slate-400 group-hover:text-white",
                              )}
                            />
                          )}
                          <span className="font-medium">{label}</span>
                          {isActive && (
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-400 rounded-r-full" />
                          )}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default LeftNavigation
