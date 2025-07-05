import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl serif">Baicheng Chen</h1>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed">
                I am a sophomore majoring in Computer Science and Engineering (CSE) at the School of Data Science, The Chinese University of Hong Kong, Shenzhen (CUHK-Shenzhen). 
                In our university, I'm also a student at Minerva College (厚含书院). 
                Furthermore, I'm a video Editor and Colorist working in the Student Union currently (You can follow the{" "}
                <a href="https://space.bilibili.com/508002687" className="text-red-600 hover:text-red-800">Bilibili account of the Student Union🔗</a> to watch our works).
              </p>

              <p className="text-lg leading-relaxed">
                I have learned several programming languages like C++, Java, Python and Go, familiar with lots of commonly used Python libraries for machine learning, deep learning and data analysis such as pytorch, numpy, pandas, matplotlib and sklearn. I also mastered the grammar of LaTex and Markdown. Moreover, in middle school, I used to attend NOIP programming contests and learned many Algorithms. The experience also triggers my interest in computer science and algorithms.
              </p>

              <p className="text-lg leading-relaxed">
                My hobbies include many fields. Except for computer science and research, I like literature, music (singing and piano) and swimming. I'm interested in reading and thinking, empathizing with the characters in the book, and writing thoughts and experiences of me.
              </p>

              <p className="text-lg leading-relaxed">
                If you are interested in any aspect of me, would like to chat with me further, please email me at baichengchen[at]link[dot]cuhk[dot]edu[dot]cn. I'm looking for like-minded people!
              </p>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="mb-4">
                <Image
                  src="https://ext.same-assets.com/3995253316/1504311476.jpeg"
                  alt="Nicholas Carlini"
                  width={200}
                  height={200}
                  className="rounded-lg mx-auto"
                />
              </div>
              <div className="text-center fancy space-y-2">
                <div className="font-bold">Baicheng Chen</div>
                <div>Sophomore, CUHK-Shenzhen</div>
                <div className="text-sm">baichengchen [at] link [dot] cuhk [dot] edu [dot] com</div>
                <div className="flex justify-center space-x-2 text-sm">
                  <a href="https://github.com/BaichengDanny" className="text-red-600 hover:text-red-800">GitHub</a>
                  <span>|</span>
                  <a href="#" className="text-red-600 hover:text-red-800">Google Scholar</a>
                </div>
              </div>
            </div>

            {/* Mobile contact info */}
            <div className="lg:hidden mt-8 text-center space-y-2">
              <div className="font-bold">Nicholas Carlini</div>
              <div>Research Scientist, Anthropic</div>
              <div className="text-sm">nicholas [at] carlini [dot] com</div>
              <div className="flex justify-center space-x-2 text-sm">
                <a href="#" className="text-red-600 hover:text-red-800">GitHub</a>
                <span>|</span>
                <a href="#" className="text-red-600 hover:text-red-800">Google Scholar</a>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Background Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold serif mb-6">Academic Background</h2>
          <div className="border-l-4 border-red-600 pl-6">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center">
                <div className="font-semibold text-lg text-gray-900 sm:min-w-48">
                  Sep 2023 - Now
                </div>
                <div className="text-lg leading-relaxed">
                  The Chinese University of Hong Kong, Shenzhen
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center">
                <div className="font-semibold text-lg text-gray-900 sm:min-w-48">
                  June 2024 - Aug 2024
                </div>
                <div className="text-lg leading-relaxed">
                  University of California, Berkeley (Summer Session)
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center">
                <div className="font-semibold text-lg text-gray-900 sm:min-w-48">
                  Sep 2020 - June 2023
                </div>
                <div className="text-lg leading-relaxed">
                  Qingdao NO. 9 High School
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Research Interests Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold serif mb-6">Research Interests</h2>
          <div className="border-l-4 border-red-600 pl-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                  <span className="text-lg">Machine Learning</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                  <span className="text-lg">AI Security and Privacy</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                  <span className="text-lg">Deepfake Detection</span>
                </li>
              </ul>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                  <span className="text-lg">Federated Learning</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                  <span className="text-lg">Computer Vision</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                  <span className="text-lg">Deep Learning</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-red-600">
              <p className="text-lg leading-relaxed text-gray-800">
                My current research focuses on <span className="font-semibold text-red-700">Deepfake Detection</span>.
                The course <span className="font-semibold">Computer Security</span> I took in the summer particularly impressed me
                by unfolding the severe consequences of private data being breached and the increasingly serious security issues
                in the rapid development of AI (e.g. deepfake) reinforcing my determination to learn how to solve these issues.
              </p>
            </div>
          </div>
        </div>

        {/* Selected Recent Work Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold serif mb-8">Selected Recent Work</h2>

          <div className="space-y-12">
            {/* ICML Alignment Workshop */}
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-1/3">
                <video
                  controls
                  poster="https://ext.same-assets.com/3995253316/2182514803.jpeg"
                  className="w-full rounded-lg shadow-md"
                  preload="none"
                >
                  <source src="/talks/2024_alignment_lessons.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="lg:w-2/3">
                <p className="text-lg leading-relaxed">
                  At the ICML alignment workshop last year I gave a short talk discussing what we can
                  (and can't) learn from adversarial machine learning, for people who work on "alignment"
                  of large language models. This talk tries to explain the difficulties that we have had
                  in making machine learning models robust to adversaries, and explains how these difficulties
                  will carry over to those who are trying to make large language models that generally are
                  helpful and harmless.
                </p>
              </div>
            </div>

            {/* Practical Poisoning */}
            <div className="flex flex-col lg:flex-row-reverse gap-6">
              <div className="lg:w-1/3">
                <video
                  controls
                  poster="https://ext.same-assets.com/3995253316/840045437.jpeg"
                  className="w-full rounded-lg shadow-md"
                  preload="none"
                >
                  <source src="/talks/2023_practical_poisoning.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="lg:w-2/3">
                <p className="text-lg leading-relaxed">
                  Earlier last year I introduced a recent paper of ours developing the first practical{" "}
                  <em>poisoning attack</em> on large-scale machine learning models. With our attack I could
                  have poisoned the training dataset for anyone who has used LAION-400M (or other popular datasets)
                  in the last six months. Our attack is trivial: I bought expired domains corressponding to URLs
                  in popular image datasets. This gave us control over 0.01% of each of these datasets.
                  In this talk (given at the Stanford MLSys seminar) discuss how the attack works, the consequences
                  of this attack, and potential defenses. More broadly, we hope machine learning researchers will
                  study other simple but practical attacks on the machine learning pipeline.
                </p>
              </div>
            </div>

            {/* Extracting Training Data */}
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-1/3">
                <video
                  controls
                  poster="https://ext.same-assets.com/3995253316/2391361194.jpeg"
                  className="w-full rounded-lg shadow-md"
                  preload="none"
                >
                  <source src="/talks/2021_extracting_training_data.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="lg:w-2/3">
                <p className="text-lg leading-relaxed">
                  In 2021, at USENIX Security, I presented a paper that was the result of a massive collaboration
                  with ten co-authors to measure the privacy of large language models. It's been academically known
                  for quite some time that if you train a machine learning model on a sensitive dataset, it's
                  mathematically possible that releasing the model could violate the privacy of the users from the
                  training data. But this has remained mostly something theory people say <em>could</em> happen,
                  because math says so. In this paper we show that large language models actually <em>do</em> leak
                  individual training examples from datasets they were trained on. To do this we show that given
                  query access to GPT-2, it's possible to recover hundreds of training datapoints including PII,
                  random numbers, and URLs from leaked email dumps.
                </p>
              </div>
            </div>

            {/* Cryptanalytic Extraction */}
            <div className="flex flex-col lg:flex-row-reverse gap-6">
              <div className="lg:w-1/3">
                <video
                  controls
                  poster="https://ext.same-assets.com/3995253316/1349848504.jpeg"
                  className="w-full rounded-lg shadow-md"
                  preload="none"
                >
                  <source src="/talks/2020_crypto_extraction.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="lg:w-2/3">
                <p className="text-lg leading-relaxed">
                  At CRYPTO'20, I presented a paper I wrote with Matthew Jagielski and Ilya Mironov
                  that introduces an improved model stealing attack. Given query access to a remote neural network,
                  we are able to extract out an almost identical copy of the parameters, layer-by-layer, one at a time.
                  For models we extract, we cam prove that the stolen copy is identical up to 30 bits of precision
                  with respect to the original model. (If you're a ML person, you might want to skip the background,
                  where I explain to the crypto audience what a fully connected neural network is.)
                </p>
              </div>
            </div>

            {/* Doom Clone Game */}
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-1/3">
                <video
                  controls
                  loop
                  className="w-full rounded-lg shadow-md"
                  preload="metadata"
                >
                  <source src="https://ext.same-assets.com/3995253316/1538345779.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="lg:w-2/3">
                <p className="text-lg leading-relaxed">
                  In 2019 I <a href="#" className="text-red-600 hover:text-red-800">made a doom clone in JavaScript</a>.
                  Until recently all content on this website was research, and while writing papers can be
                  fun<span className="text-xs text-muted-foreground">
                    <a href="#" className="text-red-600">[a]</a>
                  </span>, sometimes you just need to blow off a little steam. The entire game fits in 13k---the
                  3d renderer, shadow mapper, game engine, levels, enemies, and music. The post talks about the
                  process of designing the game and how to make it all happen under the constraints.
                </p>
              </div>
            </div>

            {/* CAMLIS Talk */}
            <div className="flex flex-col lg:flex-row-reverse gap-6">
              <div className="lg:w-1/3">
                <video
                  controls
                  poster="https://ext.same-assets.com/3995253316/2640208664.jpeg"
                  className="w-full rounded-lg shadow-md"
                  preload="none"
                >
                  <source src="/talks/2019_camlis_evaluatingadversarial.mp4" type="video/mp4" />
                </video>
                <div className="mt-2 text-center">
                  <a href="#" className="text-red-600 hover:text-red-800 text-sm">[View on YouTube]</a>
                </div>
              </div>
              <div className="lg:w-2/3">
                <p className="text-lg leading-relaxed">
                  At <a href="#" className="text-red-600 hover:text-red-800">CAMLIS</a> 2019 I gave a talk covering
                  what it means to evaluate adversarial robustness. This is a much higher-level talk for an audience
                  that isn't deeply familiar with the area of adversarial machine learning research. (For a more
                  technical version of this talk, see my recent{" "}
                  <a href="#" className="text-red-600 hover:text-red-800">USENIX Security invited talk</a> that discusses
                  these same topics in more depth.) The talk covers what adversarial examples are, how to generate them,
                  how to (try to) defend against them, and finally what the future may hold.
                </p>
              </div>
            </div>

            {/* Obfuscated Gradients */}
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-1/3">
                <video
                  controls
                  poster="https://ext.same-assets.com/3995253316/1128544978.jpeg"
                  className="w-full rounded-lg shadow-md"
                  preload="none"
                >
                  <source src="/talks/2018_icml_obfuscatedgradients.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="lg:w-2/3">
                <p className="text-lg leading-relaxed">
                  At ICML 2018, I presented a paper I wrote with Anish Athalye and my advisor David Wagner:{" "}
                  <a href="#" className="text-red-600 hover:text-red-800">Obfuscated Gradients Give a False Sense of Security:
                  Circumventing Defenses to Adversarial Examples</a>. In this paper, we demonstrate that most of the
                  ICLR'18 adversarial example defenses were, in fact, ineffective at defending against attack and in
                  fact just broke existing attack algorithms. We introduce stronger attacks that work in the presence
                  of what we call "obfuscated gradients". Because we won best paper, we were able to give two talks,
                  the talk linked here is plenary talk where I argue that the evaluation methodology used widely in
                  the community today is insufficient, and can be improved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
