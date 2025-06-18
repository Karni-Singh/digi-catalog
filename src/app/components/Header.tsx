import Link from "next/link"

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 px-6 shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold">Existing PII Configurations</h1>
          </div>
          <nav className="flex items-center space-x-4">
          </nav>
        </div>
      </div>
    </header>
  )
}