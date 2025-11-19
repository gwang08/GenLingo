import { GrammarTopic } from "./types";
import { TENSES_TOPIC } from "./tenses";
import { CONDITIONALS_TOPIC } from "./conditionals";
import { PASSIVE_VOICE_TOPIC } from "./passiveVoice";
import { REPORTED_SPEECH_TOPIC } from "./reportedSpeech";
import { RELATIVE_CLAUSES_TOPIC } from "./relativeClauses";
import { ARTICLES_TOPIC } from "./articles";
import { PHRASAL_VERBS_TOPIC } from "./phrasalVerbs";
import { MODAL_VERBS_TOPIC } from "./modalVerbs";

export const GRAMMAR_TOPICS: GrammarTopic[] = [
  TENSES_TOPIC,
  CONDITIONALS_TOPIC,
  PASSIVE_VOICE_TOPIC,
  REPORTED_SPEECH_TOPIC,
  RELATIVE_CLAUSES_TOPIC,
  ARTICLES_TOPIC,
  PHRASAL_VERBS_TOPIC,
  MODAL_VERBS_TOPIC,
];

export * from "./types";
