import { notFound } from "next/navigation";
import { GRAMMAR_TOPICS } from "@/data/grammar/grammarCore";
import GrammarDetail from "@/components/grammar/GrammarDetail";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return GRAMMAR_TOPICS.map((topic) => ({
    slug: topic.slug,
  }));
}

export default async function GrammarDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const topic = GRAMMAR_TOPICS.find((t) => t.slug === slug);

  if (!topic) {
    notFound();
  }

  return <GrammarDetail topic={topic} />;
}
