import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Papers | Baicheng Chen",
  description: "List of academic publications by Baicheng Chen, mostly in the areas of Trustworthy AI.",
};

export default function PapersPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl serif">Papers</h1>
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
      <div className="max-w-6xl mx-auto px-4 py-8 fancy">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Navigation */}
          <div className="lg:col-span-1">
            <div className="text-sm space-y-2 serif">
              <div className="font-bold">By Year</div>
              <div className="flex flex-col space-y-1">
                <a href="#2025" className="text-red-600 hover:text-red-800">2025</a>
                <a href="#2024" className="text-red-600 hover:text-red-800">2024</a>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-3">
            <div className="space-y-8">
              <div>
                <h2 className="text-lg font-bold serif mb-4">List of Publications</h2>
              </div>

              {/* 2024 */}
              <div id="2024">
                <h3 className="text-xl font-bold serif mb-4">2024</h3>
                <div className="space-y-6">
                  <div className="border-l-2 border-gray-100 pl-4">
                    <h4 className="text-lg text-red-600 hover:text-red-800 mb-2">
                      <a href="https://www.scitepress.org/Papers/2024/129509/129509.pdf">Federated Learning-Based EfficientNet in Brain Tumor Classification</a>
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      2024 International Conference on Engineering Management, Information Technology and Intelligence (EMITI, 2024).
                    </p>
                    <p className="text-sm mb-2">
                      <strong>Baicheng Chen</strong>.
                    </p>
                    {/* <p className="text-gray-700 leading-relaxed">
                      We introduce the first model-stealing attack that extracts precise, nontrivial information from black-box production language models like OpenAI's ChatGPT or Google's PaLM-2. Specifically, our attack recovers the embedding projection layer (up to symmetries) of a transformer model, given typical API access. For under $20 USD, our attack extracts the entire projection matrix of OpenAI's Ada and Babbage language models.
                    </p> */}
                  </div>
                  
                </div>
              </div>

              {/* Add note about more papers */}
              <div className="text-center py-8 text-gray-500 italic">
                <p><strong>[Last Update]</strong> July 5, 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
