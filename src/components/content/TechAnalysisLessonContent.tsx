import React from "react";

interface TechAnalysisLessonContentProps {
  definition: React.ReactNode;
  example: {
    title: string;
    chart: string[];
    explanation: string[];
  };
  list?: {
    title: string;
    points: string[];
  };
}

const TechAnalysisLessonContent = ({
  definition,
  example,
  list,
}: TechAnalysisLessonContentProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Definition</h2>
        <div className="prose prose-invert max-w-none">{definition}</div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">{example.title}</h2>
        <div className="prose prose-invert max-w-none">
          {example.explanation.map((explanation, index) => (
            <p key={index}>{explanation}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechAnalysisLessonContent;
