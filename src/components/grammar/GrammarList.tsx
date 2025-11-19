"use client";

import { Row, Col } from "antd";
import { GrammarTopic } from "@/data/grammar/grammarCore";
import GrammarCard from "./GrammarCard";

interface GrammarListProps {
  topics: GrammarTopic[];
}

export default function GrammarList({ topics }: GrammarListProps) {
  return (
    <Row gutter={[16, 16]}>
      {topics.map((topic) => (
        <Col key={topic.slug} xs={24} sm={24} md={12} lg={8}>
          <GrammarCard topic={topic} />
        </Col>
      ))}
    </Row>
  );
}
