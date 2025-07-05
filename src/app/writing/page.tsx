import Link from "next/link";
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

interface Article {
  id: string;
  title: string;
  year: number;
  description: string;
  date: string;
  filename: string;
}

// Get all articles from the articles directory
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
        const { data } = matter(fileContents);

        const id = filename.replace(/\.md$/, '');

        articles.push({
          id,
          title: data.title || id,
          year: data.year || new Date().getFullYear(),
          description: data.description || '',
          date: data.date || new Date().toISOString().split('T')[0],
          filename
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

  const groupedArticles = articles.reduce((acc, article) => {
    if (!acc[article.year]) {
      acc[article.year] = [];
    }
    acc[article.year].push(article);
    return acc;
  }, {} as Record<number, Article[]>);

  const years = Object.keys(groupedArticles).map(Number).sort((a, b) => b - a);

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
            <div className="text-sm space-y-2 serif sticky top-4">
              <div className="font-bold">By Year</div>
              <div className="flex flex-col space-y-1">
                {years.map(year => (
                  <a key={year} href={`#${year}`} className="text-red-600 hover:text-red-800">
                    {year}
                  </a>
                ))}
              </div>

              {/* Instructions */}
              <div className="mt-6 pt-4 border-t">
                <div className="text-xs text-gray-500 space-y-2">
                  <p className="font-medium">How to add articles:</p>
                  <p>1. Place .md files in <code className="bg-gray-100 px-1 rounded">public/articles/</code></p>
                  <p>2. Include frontmatter with title, date, year, description</p>
                  <p>3. Rebuild the site to see changes</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-3">
            <div className="space-y-8">
              {articles.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No articles found.</p>
                  <p className="text-gray-400 text-sm mt-2">
                    Add .md files to the <code className="bg-gray-100 px-1 rounded">public/articles/</code> directory.
                  </p>
                </div>
              ) : (
                years.map(year => (
                  <div key={year} id={year.toString()}>
                    <h2 className="text-xl font-bold serif mb-4">{year}</h2>
                    <div className="space-y-6">
                      {groupedArticles[year].map(article => (
                        <div key={article.id} className="border-l-2 border-gray-100 pl-4">
                          <h3 className="text-lg text-red-600 hover:text-red-800 mb-2">
                            <Link href={`/writing/${article.id}`}>
                              {article.title}
                            </Link>
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {article.date}
                          </p>
                          <p className="text-gray-700 leading-relaxed">
                            {article.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
