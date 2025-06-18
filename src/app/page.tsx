import Image from "next/image";
import PiiSetupPage from "./pii-setup/page";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl font-bold text-center text-gray-900">
        Welcome to the Digital Catalog
      </h1>
      <p className="text-lg text-center text-gray-600">
        Explore our collection of digital resources and tools.
      </p>
    </div>
  );
}
