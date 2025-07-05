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
              <Link href="https://baichengdanny.github.io/doc/CV_Danny.pdf" className="text-gray-600 hover:text-gray-900 fancy">CV</Link>
              <Link href="/writing" className="text-gray-600 hover:text-gray-900 fancy">Writing</Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold serif mb-6">About</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2">
            <div className="prose prose-lg max-w-none fancy">
              <p className="text-lg leading-relaxed">
                Hi! This is Baicheng Chen (Danny, 陈柏成).
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
                If you are interested in any aspect of me, would like to chat with me further, please email me at <i>baichengchen[at]link[dot]cuhk[dot]edu[dot]cn</i>. I'm looking for like-minded people!
              </p>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="mb-4">
                <Image
                  src="https://baichengdanny.github.io/image/danny.jpg"
                  alt="Baicheng Chen"
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

            {/* Mobile contact info
            <div className="lg:hidden mt-8 text-center space-y-2">
              <div className="font-bold">Baicheng Chen</div>
              <div>Sophomore, CUHK-Shenzhen</div>
              <div className="text-sm">nicholas [at] carlini [dot] com</div>
              <div className="flex justify-center space-x-2 text-sm">
                <a href="#" className="text-red-600 hover:text-red-800">GitHub</a>
                <span>|</span>
                <a href="#" className="text-red-600 hover:text-red-800">Google Scholar</a>
              </div>
            </div> */}
          </div>
        </div>

        {/* Academic Background Section */}
        <div className="mt-16 fancy">
          <h2 className="text-2xl font-bold serif mb-6">Academic Background</h2>
          <div className="border-l-4 border-red-600 pl-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4">
                <div className="font-semibold text-lg text-gray-900 md:col-span-1">
                  Sep 2023 - Now
                </div>
                <div className="text-lg leading-relaxed md:col-span-3">
                  The Chinese University of Hong Kong, Shenzhen
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4">
                <div className="font-semibold text-lg text-gray-900 md:col-span-1">
                  June 2024 - Aug 2024
                </div>
                <div className="text-lg leading-relaxed md:col-span-3">
                  University of California, Berkeley (Summer Session)
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4">
                <div className="font-semibold text-lg text-gray-900 md:col-span-1">
                  Sep 2020 - June 2023
                </div>
                <div className="text-lg leading-relaxed md:col-span-3">
                  Qingdao NO. 9 High School
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Research Interests Section */}
        <div className="mt-16 fancy">
          <h2 className="text-2xl font-bold serif mb-6">Research Interests</h2>
          <div className="border-l-4 border-red-600 pl-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                  <span className="text-lg">Trustworthy AI</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                  <span className="text-lg">AI Security and Privacy</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                  <span className="text-lg">Generative Model</span>
                </li>
              </ul>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                  <span className="text-lg">Deepfake Detection</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                  <span className="text-lg">Deep Learning</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                  <span className="text-lg">Federated Learning</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-red-600">
              <p className="text-lg leading-relaxed text-gray-800">
                My current research focuses on <span className="font-semibold text-red-700">Trustworthy AI</span>.
                The course <span className="font-semibold">Computer Security</span> I took in the summer particularly impressed me
                by unfolding the severe consequences of private data being breached and the increasingly serious security issues
                in the rapid development of AI (e.g. deepfake) reinforcing my determination to learn how to solve these issues.
              </p>
            </div>
          </div>
        </div>

        {/* Recent News Section */}
        <div className="mt-16 fancy">
          <h2 className="text-2xl font-bold serif mb-6">Recent News</h2>
          <div className="border-l-4 border-red-600 pl-6">
            <div className="space-y-4">
              
              <div className="flex items-start">
                <div className="w-2 h-2 bg-red-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span className="text-lg">
                  <strong>[2025.07]</strong> My new personal website is now available! 🎉
                </span>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
