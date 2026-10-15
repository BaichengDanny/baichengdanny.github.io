import type { Metadata } from "next";
import WritingClient from './WritingClient';
import Footer from "../../components/Footer";
import SiteHeader from "../../components/SiteHeader";
import { getSearchEntries } from "../../lib/articles";

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes, tutorials and essays by Baicheng Chen.",
  alternates: { canonical: "/writing/" },
};

export default function WritingPage() {
  const articles = getSearchEntries();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <SiteHeader title="Writing" current="writing" />
      <WritingClient articles={articles} />
      <Footer />
    </div>
  );
}
