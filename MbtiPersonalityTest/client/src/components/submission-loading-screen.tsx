import { useState, useEffect } from "react";
import { Brain } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function SubmissionLoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "답변 데이터 수집 중...",
    "성격 차원 분석 중...",
    "가중치 점수 계산 중...",
    "MBTI 유형 결정 중...",
    "결과 보고서 생성 중..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(stepInterval);
          return steps.length - 1;
        }
        return prev + 1;
      });
    }, 300);

    return () => clearInterval(stepInterval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="mb-6">
            <Brain className="w-16 h-16 text-primary mx-auto mb-4 animate-pulse" />
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
          
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">검사 결과 분석 중...</h2>
          
          <p className="text-neutral-600 mb-6">
            24개 문항에 대한 답변을 바탕으로<br/>
            당신의 성격 유형을 정밀 분석하고 있습니다.
          </p>

          <div className="mb-4">
            <div className="bg-neutral-100 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-primary to-blue-600 h-full rounded-full transition-all duration-75 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-neutral-500 mt-2">
              <span>0%</span>
              <span className="font-medium">{Math.round(progress)}%</span>
              <span>100%</span>
            </div>
          </div>

          <div className="min-h-[20px] mb-4">
            <p className="text-sm text-primary font-medium transition-all duration-300">
              {steps[currentStep]}
            </p>
          </div>

          <p className="text-xs text-neutral-400">
            잠시만 기다려주세요...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}