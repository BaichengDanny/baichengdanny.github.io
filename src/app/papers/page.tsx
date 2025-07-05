import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Papers | Nicholas Carlini",
  description: "List of academic publications by Nicholas Carlini, mostly in the areas of computer security and machine learning.",
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
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Navigation */}
          <div className="lg:col-span-1">
            <div className="text-sm space-y-2 serif">
              <div className="font-bold">By Year</div>
              <div className="flex flex-col space-y-1">
                <a href="#2024" className="text-red-600 hover:text-red-800">2024</a>
                <a href="#2023" className="text-red-600 hover:text-red-800">2023</a>
                <a href="#2022" className="text-red-600 hover:text-red-800">2022</a>
                <a href="#2021" className="text-red-600 hover:text-red-800">2021</a>
                <a href="#2020" className="text-red-600 hover:text-red-800">2020</a>
                <a href="#2019" className="text-red-600 hover:text-red-800">2019</a>
                <a href="#2018" className="text-red-600 hover:text-red-800">2018</a>
                <a href="#2017" className="text-red-600 hover:text-red-800">2017</a>
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
                      <a href="#">Stealing Part of a Production Language Model</a>
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      ICML, 2024. <span className="bg-yellow-100 px-1 rounded">Best Paper</span>.
                    </p>
                    <p className="text-sm mb-2">
                      <strong>Nicholas Carlini</strong>, Daniel Paleka, Krishnamurthy Dj Dvijotham, Thomas Steinke, Jonathan Hayase, A. Feder Cooper, Katherine Lee, Matthew Jagielski, Milad Nasr, Arthur Conmy, Itay Yona, Eric Wallace, David Rolnick, Florian Tramr
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      We introduce the first model-stealing attack that extracts precise, nontrivial information from black-box production language models like OpenAI's ChatGPT or Google's PaLM-2. Specifically, our attack recovers the embedding projection layer (up to symmetries) of a transformer model, given typical API access. For under $20 USD, our attack extracts the entire projection matrix of OpenAI's Ada and Babbage language models.
                    </p>
                  </div>

                  <div className="border-l-2 border-gray-100 pl-4">
                    <h4 className="text-lg text-red-600 hover:text-red-800 mb-2">
                      <a href="#">Considerations for Differentially Private Learning with Large-Scale Public Pretraining</a>
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      ICML, 2024. <span className="bg-yellow-100 px-1 rounded">Best Paper</span>.
                    </p>
                    <p className="text-sm mb-2">
                      Florian Tramr, Gautam Kamath, <strong>Nicholas Carlini</strong>
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      The performance of differentially private machine learning can be boosted significantly by leveraging the transfer learning capabilities of non-private models pretrained on large public datasets. We critically review this approach.
                    </p>
                  </div>

                  <div className="border-l-2 border-gray-100 pl-4">
                    <h4 className="text-lg text-red-600 hover:text-red-800 mb-2">
                      <a href="#">Evading black-box classifiers without breaking eggs</a>
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      SaTML, 2024. <span className="bg-green-100 px-1 rounded">Distinguished Paper Award, Runner Up</span>
                    </p>
                    <p className="text-sm mb-2">
                      Edoardo Debenedetti, <strong>Nicholas Carlini</strong>, Florian Tramr
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Decision-based evasion attacks repeatedly query a black-box classifier to generate adversarial examples. Prior work measures the cost of such attacks by the total number of queries made to the classifier. We argue this metric is flawed.
                    </p>
                  </div>
                </div>
              </div>

              {/* 2023 */}
              <div id="2023">
                <h3 className="text-xl font-bold serif mb-4">2023</h3>
                <div className="space-y-6">
                  <div className="border-l-2 border-gray-100 pl-4">
                    <h4 className="text-lg text-red-600 hover:text-red-800 mb-2">
                      <a href="#">Scalable Extraction of Training Data from (Production) Language Models</a>
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      [preprint], 2023.
                      <span className="ml-2">
                        Press [<a href="#" className="text-red-600 hover:text-red-800">1</a>,
                        <a href="#" className="text-red-600 hover:text-red-800">2</a>,
                        <a href="#" className="text-red-600 hover:text-red-800">3</a>]
                      </span>
                    </p>
                    <p className="text-sm mb-2">
                      Milad Nasr, <strong>Nicholas Carlini</strong>, Jonathan Hayase, Matthew Jagielski, A. Feder Cooper, Daphne Ippolito, Christopher A. Choquette-Choo, Eric Wallace, Florian Tramer, Katherine Lee
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      This paper studies extractable memorization: training data that an adversary can efficiently extract by querying a machine learning model without prior knowledge of the training dataset. We show an adversary can extract gigabytes of training data from open-source language models like Pythia or GPT-Neo, semi-open models like LLaMA or Falcon, and closed models like ChatGPT.
                    </p>
                  </div>

                  <div className="border-l-2 border-gray-100 pl-4">
                    <h4 className="text-lg text-red-600 hover:text-red-800 mb-2">
                      <a href="#">Are aligned neural networks adversarially aligned?</a>
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      NeurIPS, 2023.
                    </p>
                    <p className="text-sm mb-2">
                      <strong>Nicholas Carlini</strong>, Milad Nasr, Christopher A. Choquette-Choo, Matthew Jagielski, Irena Gao, Anas Awadalla, Pang Wei Koh, Daphne Ippolito, Katherine Lee, Florian Tramer, Ludwig Schmidt
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Aligned language models are "helpful and harmless". They respond helpfully to user questions, but when asked to perform some behavior that would cause harm, will politely refuse. We study to what extent these models are aligned even when interacting with an adversarial user.
                    </p>
                  </div>
                </div>
              </div>

              {/* Add note about more papers */}
              <div className="text-center py-8 text-gray-500 italic">
                <p>More papers from previous years available on the original site...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
