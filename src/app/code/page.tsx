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
                <a href="https://github.com/carlini/printf-tac-toe" className="text-red-600 hover:text-red-800 text-lg font-semibold">
                  printf-tac-toe
                </a>
              </p>
              <p className="text-gray-700 leading-relaxed">
                A C implementation of tic-tac-toe that it all implemented within a single call to printf.
              </p>
            </div> */}

            {/* <div>
              <p>
                <a href="https://github.com/carlini/js13k2019-yet-another-doom-clone" className="text-red-600 hover:text-red-800 text-lg font-semibold">
                  Yet Another Doom Clone
                </a>
              </p>
              <p className="text-gray-700 leading-relaxed">
                A doom clone in 13k of JavaScript.
              </p>
            </div> */}

            {/* <div>
              <p>
                <a href="https://github.com/anishathalye/obfuscated-gradients" className="text-red-600 hover:text-red-800 text-lg font-semibold">
                  Obfuscated Gradients Code
                </a>
              </p>
              <p className="text-gray-700 leading-relaxed">
                We broke a number of defenses to adversarial examples, this code reproduces the attacks we implemented.
              </p>
            </div> */}

            {/* <div>
              <p>
                <a href="#" className="text-red-600 hover:text-red-800 text-lg font-semibold">
                  Audio Adversarial Examples
                </a>
              </p>
              <p className="text-gray-700 leading-relaxed">
                We show that neural networks on audio are also vulnerable to adversarial examples by making a speech-to-text neural network transcribe any input waveform as any any desired sentence.
              </p>
            </div> */}

            {/* <div>
              <p>
                <a href="#" className="text-red-600 hover:text-red-800 text-lg font-semibold">
                  Robust attacks on Neural Networks
                </a>
              </p>
              <p className="text-gray-700 leading-relaxed">
                Neural networks are highly vulnerable to evasion attacks. This project contains code to perform these attacks in a robust manner to evaluate future possible defenses.
              </p>
            </div> */}

            {/* <div>
              <p>
                <a href="#" className="text-red-600 hover:text-red-800 text-lg font-semibold">
                  Break of Defensive Distillation
                </a>
              </p>
              <p className="text-gray-700 leading-relaxed">
                Defensive Distillation was recently proposed as a defense to adversarial examples. This project contains the TensorFlow models required to train a defensively distilled network and show it is broken.
              </p>
            </div> */}

            {/* <div>
              <p>
                <a href="https://github.com/HexHive/printbf" className="text-red-600 hover:text-red-800 text-lg font-semibold">
                  Brainfuck interpreter in printf
                </a>
              </p>
              <p className="text-gray-700 leading-relaxed">
                Printf is, unintentionally, a Turing-complete language. We demonstrate this by implementing a brainfuck interpreter through using only calls to the standard C printf.
              </p>
            </div> */}

            {/* <div>
              <p>
                <a href="#" className="text-red-600 hover:text-red-800 text-lg font-semibold">
                  Cryptanalytic Extraction of Neural Networks
                </a>
              </p>
              <p className="text-gray-700 leading-relaxed">
                Code for extracting neural network parameters through cryptanalytic attacks on machine learning models.
              </p>
            </div> */}

            {/* <div>
              <p>
                <a href="#" className="text-red-600 hover:text-red-800 text-lg font-semibold">
                  Training Data Extraction from Language Models
                </a>
              </p>
              <p className="text-gray-700 leading-relaxed">
                Implementation of attacks to extract training data from large language models, demonstrating privacy vulnerabilities in current ML systems.
              </p>
            </div> */}

            {/* <div>
              <p>
                <a href="#" className="text-red-600 hover:text-red-800 text-lg font-semibold">
                  Adversarial Example Evaluation Suite
                </a>
              </p>
              <p className="text-gray-700 leading-relaxed">
                A comprehensive toolkit for evaluating adversarial robustness of machine learning models, including implementation of various attack methods.
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
