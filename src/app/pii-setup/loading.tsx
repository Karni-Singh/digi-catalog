"use client";
export default function PiiLoading(){
    return <div>
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <div className="text-center text-gray-600 mt-4">Loading PII configurations...</div>
    </div>}