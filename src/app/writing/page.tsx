import Link from "next/link";
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import WritingClient from './WritingClient';

interface Article {
  id: string;
  title: string;
  year: number;
  description: string;
  date: string;
  filename: string;
  content?: string;
}

// Get all articles from the articles directory with content for search
function getArticles(): Article[] {
  try {
    const articlesDirectory = path.join(process.cwd(), 'public', 'articles');

    if (!fs.existsSync(articlesDirectory)) {
      return [];
    }

    const filenames = fs.readdirSync(articlesDirectory);
    const articles: Article[] = [];

    for (const filename of filenames) {
      if (!filename.endsWith('.md')) continue;

      try {
        const fullPath = path.join(articlesDirectory, filename);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        const id = filename.replace(/\.md$/, '');

        articles.push({
          id,
          title: data.title || id,
          year: data.year || new Date().getFullYear(),
          description: data.description || '',
          date: data.date || new Date().toISOString().split('T')[0],
          filename,
          content: content.slice(0, 500) // First 500 chars for search performance
        });
      } catch (error) {
        console.warn(`Could not parse article ${filename}:`, error);
      }
    }

    return articles;
  } catch (error) {
    console.error('Error reading articles directory:', error);
    return [];
  }
}

export default function WritingPage() {
  const articles = getArticles();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl serif">Writing</h1>
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

      {/* Main Content with Search */}
      <WritingClient articles={articles} />
    </div>
  );
}
