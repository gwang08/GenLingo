// Grammar Data Types
export type GrammarExample = {
  en: string;
  vi: string;
};

export type GrammarQuestion = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type GrammarTopic = {
  slug: string;
  title: string;
  shortDescription: string;
  keyPoints: string[];
  examples: GrammarExample[];
  quiz: GrammarQuestion[];
};
