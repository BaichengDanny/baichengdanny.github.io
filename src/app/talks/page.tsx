import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Talks | Baicheng Chen",
  description: "Presentations and talks by Baicheng Chen.",
};

export default function TalksPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl serif">Talks</h1>
            <nav className="flex space-x-8">
              <Link href="/" className="text-gray-600 hover:text-gray-900 fancy">Main</Link>
              <Link href="/papers" className="text-gray-600 hover:text-gray-900 fancy">Papers</Link>
              <Link href="/talks" className="text-gray-600 hover:text-gray-900 fancy">Talks</Link>
              <Link href="/code" className="text-gray-600 hover:text-gray-900 fancy">Code</Link>
              <Link href="/writing" className="text-gray-600 hover:text-gray-900 fancy">Writing</Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <p>
              A Study Guide for Computer Science.{" "}
              <em>Week 3 AA Meeting, School of Data Science</em>.{" "}
              {/* <a href="#" className="text-red-600 hover:text-red-800">Talk.</a>{" "} */}
              <a href="https://baichengdanny.github.io/public/doc/Week_3_Meeting_SDS.pdf" className="text-red-600 hover:text-red-800">Slides.</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
