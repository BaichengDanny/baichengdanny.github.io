import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Talks | Nicholas Carlini",
  description: "Presentations and talks by Nicholas Carlini on machine learning security and adversarial examples.",
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
              Applications of Large Language Models to Security{" "}
              <em>Stanford, 2023</em>.{" "}
              <a href="#" className="text-red-600 hover:text-red-800">Slides</a>
            </p>

            <p>
              Security & Privacy of LLMs{" "}
              <em>Various guest lectures, 2023</em>.{" "}
              <a href="#" className="text-red-600 hover:text-red-800">Slides</a>
            </p>

            <p>
              Are aligned language models adversarially aligned?{" "}
              <em>Simons Institute, 2023</em>.{" "}
              <a href="#" className="text-red-600 hover:text-red-800">Talk</a>,{" "}
              <a href="#" className="text-red-600 hover:text-red-800">Slides</a>
            </p>

            <p>
              Practical poisoning of machine learning models{" "}
              <em>Stanford, 2023</em>.{" "}
              <a href="#" className="text-red-600 hover:text-red-800">Talk</a>,{" "}
              <a href="#" className="text-red-600 hover:text-red-800">Slides</a>
            </p>

            <p>
              An Intro to Adversarial Machine Learning{" "}
              <em>Simons Institute, 2023</em>.{" "}
              <a href="#" className="text-red-600 hover:text-red-800">Slides</a>
            </p>

            <p>
              Underspecified Foundation Models Considered Harmful{" "}
              <em>ICICS (keynote), 2022</em>.{" "}
              <a href="#" className="text-red-600 hover:text-red-800">Talk</a>,{" "}
              <a href="#" className="text-red-600 hover:text-red-800">Slides</a>
            </p>

            <p>
              Machine learning is becoming less dependable{" "}
              <em>DSN (keynote), 2022</em>.{" "}
              <a href="#" className="text-red-600 hover:text-red-800">Slides</a>
            </p>

            <p>
              A collection of things you can (and can not do) with training data poisoning{" "}
              <em>DLS (keynote), 2022</em>.{" "}
              <a href="#" className="text-red-600 hover:text-red-800">Slides</a>
            </p>

            <p>
              A crisis in adversarial machine learning{" "}
              <em>Art of Robustness, 2022</em>.{" "}
              <a href="#" className="text-red-600 hover:text-red-800">Slides</a>
            </p>

            <p>
              When Machine Learning Isn't Private{" "}
              <em>USENIX Enigma, 2022</em>.{" "}
              <a href="#" className="text-red-600 hover:text-red-800">Talk</a>,{" "}
              <a href="#" className="text-red-600 hover:text-red-800">Slides</a>
            </p>

            <p>
              Adversarial Attacks That Matter.{" "}
              <em>ICCV AROW2, 2021</em>.{" "}
              <a href="#" className="text-red-600 hover:text-red-800">Slides</a>
            </p>

            <p>
              An Unreliable Foundation: Security & Privacy of Large Scale Machine Learning.{" "}
              <em>UK Security and Privacy Seminar</em>.{" "}
              <a href="#" className="text-red-600 hover:text-red-800">Talk</a>.{" "}
              <a href="#" className="text-red-600 hover:text-red-800">Slides</a>
            </p>

            <p>
              Extracting Training Data from Large Language Models.{" "}
              <em>Alan Turing Institute's Interest Group on Privacy and Machine Learning</em>.{" "}
              <a href="#" className="text-red-600 hover:text-red-800">Talk.</a>{" "}
              <a href="#" className="text-red-600 hover:text-red-800">Slides.</a>
            </p>

            <p>
              Extracting Training Data from Large Language Models.{" "}
              <em>USENIX Security, 2021</em>.{" "}
              <a href="#" className="text-red-600 hover:text-red-800">Talk.</a>.{" "}
              <a href="#" className="text-red-600 hover:text-red-800">Slides.</a>
            </p>

            <p>
              Poisoning the Unlabeled Dataset of Semi Supervised Learning.{" "}
              <em>USENIX Security, 2021</em>.{" "}
              <a href="#" className="text-red-600 hover:text-red-800">Talk.</a>{" "}
              <a href="#" className="text-red-600 hover:text-red-800">Slides.</a>
            </p>

            <p>
              Adversarially (non-)Robust Deep Learning.{" "}
              <em>AI For Good, 2021</em>.{" "}
              <a href="#" className="text-red-600 hover:text-red-800">Slides.</a>{" "}
              <a href="#" className="text-red-600 hover:text-red-800">Talk.</a>
            </p>

            <p>
              How Private is Machine Learning?{" "}
              <em>Boston University, 2021</em>.{" "}
              <a href="#" className="text-red-600 hover:text-red-800">Slides.</a>{" "}
              <a href="#" className="text-red-600 hover:text-red-800">Talk.</a>
            </p>

            <p>
              Deep Learning: (still) Not Robust.{" "}
              <em>S+SSPR, 2021</em>.{" "}
              <a href="#" className="text-red-600 hover:text-red-800">Slides.</a>{" "}
              <a href="#" className="text-red-600 hover:text-red-800">Talk.</a>
            </p>

            <p>
              Cryptanalytic Extraction of Neural Networks.{" "}
              <em>CRYPTO, 2020</em>.{" "}
              <a href="#" className="text-red-600 hover:text-red-800">Slides.</a>{" "}
              <a href="#" className="text-red-600 hover:text-red-800">Talk.</a>
            </p>

            <p>
              On Evaluating Adversarial Robustness.{" "}
              <em>CAMLIS (keynote), 2019</em>.{" "}
              <a href="#" className="text-red-600 hover:text-red-800">Slides.</a>{" "}
              <a href="#" className="text-red-600 hover:text-red-800">Talk.</a>
            </p>

            <p>
              Obfuscated Gradients Give a False Sense of Security: Circumventing Defenses to Adversarial Examples.{" "}
              <em>ICML Plenary, 2018</em>.{" "}
              <a href="#" className="text-red-600 hover:text-red-800">Talk.</a>{" "}
              <a href="#" className="text-red-600 hover:text-red-800">Slides.</a>
            </p>

            <p>
              Audio Adversarial Examples: Targeted Attacks on Speech-to-Text.{" "}
              <em>IEEE DLS, 2018</em>.{" "}
              <a href="#" className="text-red-600 hover:text-red-800">Talk.</a>{" "}
              <a href="#" className="text-red-600 hover:text-red-800">Slides.</a>
            </p>

            <p>
              Towards Evaluating the Robustness of Neural Networks.{" "}
              <em>IEEE Symposium on Security and Privacy, 2017</em>.{" "}
              <a href="#" className="text-red-600 hover:text-red-800">Talk.</a>{" "}
              <a href="#" className="text-red-600 hover:text-red-800">Slides.</a>
            </p>

            <p>
              Hidden Voice Commands.{" "}
              <em>USENIX Security, 2016</em>.{" "}
              <a href="#" className="text-red-600 hover:text-red-800">Talk.</a>{" "}
              <a href="#" className="text-red-600 hover:text-red-800">Slides.</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
