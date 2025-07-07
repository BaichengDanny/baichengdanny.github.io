import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Code | Baicheng Chen",
  description: "Research code and projects by Baicheng Chen, including adversarial examples, security tools, and creative coding experiments.",
};

export default function CodePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl serif">Code</h1>
            <nav className="flex space-x-8">
              <Link href="/" className="text-gray-600 hover:text-gray-900 fancy">Main</Link>
              <Link href="/papers" className="text-gray-600 hover:text-gray-900 fancy">Papers</Link>
              <Link href="/talks" className="text-gray-600 hover:text-gray-900 fancy">Talks</Link>
              <Link href="https://baichengdanny.github.io/doc/CV_Danny.pdf" className="text-gray-600 hover:text-gray-900 fancy">CV</Link>
              <Link href="/writing" className="text-gray-600 hover:text-gray-900 fancy">Writing</Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="space-y-6">

            {/* <div>
              <p>
                <a href="#" className="text-red-600 hover:text-red-800 text-lg font-semibold">
                  Test Code Section
                </a>
              </p>
              <p className="text-gray-700 leading-relaxed">
                This is the description for the test code section. It can include links to various code repositories, projects, or experiments.
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
