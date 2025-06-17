import { useState, useEffect } from "react";
import { Brain, Loader2 } from "lucide-react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState("준비 중...");

  const stages = [
    "검사 환경을 준비하고 있습니다...",
    "질문 데이터를 불러오고 있습니다...",
    "개인화 설정을 적용하고 있습니다...",
    "MBTI 분석 엔진을 초기화하고 있습니다...",
    "검사 준비가 완료되었습니다!"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15 + 5;
        
        // Update stage based on progress
        if (newProgress < 20) {
          setStage(stages[0]);
        } else if (newProgress < 40) {
          setStage(stages[1]);
        } else if (newProgress < 60) {
          setStage(stages[2]);
        } else if (newProgress < 80) {
          setStage(stages[3]);
        } else if (newProgress < 100) {
          setStage(stages[4]);
        }
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 800);
          return 100;
        }
        
        return newProgress;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center z-50">
      <div className="text-center max-w-md mx-auto px-6">
        {/* Animated Brain Icon */}
        <div className="relative mb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Brain className="text-white text-4xl" />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-secondary rounded-full animate-ping"></div>
          <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-accent rounded-full animate-bounce delay-300"></div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-neutral-200 rounded-full h-3 mb-6 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-300 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-white/30 animate-pulse rounded-full"></div>
          </div>
        </div>

        {/* Progress Percentage */}
        <div className="text-3xl font-bold text-primary mb-4 tabular-nums">
          {Math.round(progress)}%
        </div>

        {/* Loading Stage */}
        <div className="flex items-center justify-center mb-6">
          <Loader2 className="mr-3 h-5 w-5 animate-spin text-primary" />
          <p className="text-lg text-neutral-700 font-medium">{stage}</p>
        </div>

        {/* Loading Dots Animation */}
        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-secondary rounded-full animate-bounce delay-150"></div>
          <div className="w-3 h-3 bg-accent rounded-full animate-bounce delay-300"></div>
        </div>

        {/* Subtle Tip */}
        <p className="text-sm text-neutral-500 mt-8 leading-relaxed">
          정확한 결과를 위해 각 질문에 첫 번째 직감으로 답변해주세요
        </p>
      </div>

      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-bounce"></div>
        <div className="absolute bottom-32 right-16 w-16 h-16 bg-secondary/10 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-accent/10 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 left-20 w-14 h-14 bg-primary/5 rounded-full animate-spin"></div>
      </div>
    </div>
  );
}