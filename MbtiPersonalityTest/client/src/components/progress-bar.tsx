import { Card, CardContent } from "@/components/ui/card";

interface ProgressBarProps {
  current: number;
  total: number;
  estimatedTime: number;
}

export function ProgressBar({ current, total, estimatedTime }: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <Card className="shadow-lg mb-8">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-neutral-900">성격유형 검사 진행 중</h2>
          <span className="text-sm text-neutral-500">문항 {current} / {total}</span>
        </div>
        <div className="w-full bg-neutral-200 rounded-full h-3 mb-2">
          <div 
            className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-500" 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-neutral-500">
          <span>시작</span>
          <span>예상 소요시간: {estimatedTime}분</span>
          <span>완료</span>
        </div>
      </CardContent>
    </Card>
  );
}
