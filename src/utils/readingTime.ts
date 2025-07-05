import readingTime from 'reading-time';

export interface ReadingTimeResult {
  text: string;
  minutes: number;
  time: number;
  words: number;
}

export function calculateReadingTime(content: string): ReadingTimeResult {
  // Remove markdown syntax for more accurate word count
  const cleanContent = content
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]*`/g, '') // Remove inline code
    .replace(/\$\$[\s\S]*?\$\$/g, '') // Remove display math
    .replace(/\$[^$]*\$/g, '') // Remove inline math
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/\[.*?\]\(.*?\)/g, '') // Remove links
    .replace(/#{1,6}\s+/g, '') // Remove heading markers
    .replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, '$1') // Remove bold/italic markers
    .replace(/^\s*[-*+]\s+/gm, '') // Remove list markers
    .replace(/^\s*\d+\.\s+/gm, '') // Remove numbered list markers
    .replace(/^\s*>\s+/gm, '') // Remove blockquote markers
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim();

  const stats = readingTime(cleanContent);

  return {
    text: stats.text,
    minutes: stats.minutes,
    time: stats.time,
    words: stats.words
  };
}

export function formatReadingTime(minutes: number): string {
  if (minutes < 1) {
    return 'Less than 1 min read';
  } else if (minutes === 1) {
    return '1 min read';
  } else {
    return `${Math.ceil(minutes)} min read`;
  }
}
