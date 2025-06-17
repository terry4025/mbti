import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import type { MbtiQuestion } from "@shared/schema";

interface QuestionCardProps {
  question: MbtiQuestion;
  selectedAnswer: string;
  onAnswerChange: (value: string) => void;
}

export function QuestionCard({ question, selectedAnswer, onAnswerChange }: QuestionCardProps) {
  return (
    <Card className="shadow-lg mb-8">
      <CardContent className="p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-semibold text-neutral-900 mb-4">
            {question.text}
          </h3>
          <p className="text-neutral-600">가장 나에게 해당하는 답변을 선택해주세요</p>
        </div>

        <RadioGroup value={selectedAnswer} onValueChange={onAnswerChange} className="space-y-4">
          {(question.options as any[]).map((option, index) => (
            <div key={`${question.id}-${index}`} className="flex items-start">
              <Label 
                htmlFor={`option-${question.id}-${index}`}
                className="flex items-start p-4 border-2 border-neutral-200 rounded-xl cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 w-full"
              >
                <RadioGroupItem 
                  value={option.value} 
                  id={`option-${question.id}-${index}`}
                  className="mt-1 mr-4 text-primary"
                />
                <div className="flex-1">
                  <div className="font-medium text-neutral-900 mb-1">
                    {String.fromCharCode(65 + index)}. {option.text}
                  </div>
                  <div className="text-sm text-neutral-600">{option.description}</div>
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
