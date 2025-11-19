import { GRAMMAR_TOPICS } from "@/data/grammar/grammarCore";
import GrammarList from "@/components/grammar/GrammarList";

export default function GrammarPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Ngữ pháp theo chuyên đề
        </h1>
        <p className="text-lg text-gray-600">
          Học các chuyên đề ngữ pháp quan trọng cho kỳ thi THPT Quốc Gia 2025
        </p>
      </div>
      
      <GrammarList topics={GRAMMAR_TOPICS} />
    </div>
  );
}
