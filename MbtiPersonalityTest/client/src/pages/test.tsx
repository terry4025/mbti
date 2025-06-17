import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Brain, ChevronLeft, ChevronRight, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Link, useLocation } from "wouter";
import { ProgressBar } from "@/components/progress-bar";
import { QuestionCard } from "@/components/question-card";
import { LoadingScreen } from "@/components/loading-screen";
import { SubmissionLoadingScreen } from "@/components/submission-loading-screen";
import { apiRequest } from "@/lib/queryClient";
import type { MbtiQuestion, MbtiAnswer } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export default function Test() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, MbtiAnswer>>({});
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [showLoading, setShowLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: questions, isLoading } = useQuery<MbtiQuestion[]>({
    queryKey: ["/api/mbti/questions"],
  });

  const submitMutation = useMutation({
    mutationFn: async (submissionData: { answers: MbtiAnswer[], sessionId: string }) => {
      setIsSubmitting(true);
      const response = await apiRequest("POST", "/api/mbti/submit", submissionData);
      return response.json();
    },
    onSuccess: (data) => {
      // Clear saved progress when test is completed
      localStorage.removeItem('mbti_progress');
      // Dispatch custom event to notify other components
      window.dispatchEvent(new Event('progressCleared'));
      
      // Show loading for a brief moment before redirecting
      setTimeout(() => {
        setIsSubmitting(false);
        setLocation(`/results/${sessionId}`);
      }, 1500);
    },
    onError: (error) => {
      setIsSubmitting(false);
      toast({
        title: "오류가 발생했습니다",
        description: "검사 결과 제출에 실패했습니다. 다시 시도해주세요.",
        variant: "destructive",
      });
    },
  });

  const handleAnswerChange = (value: string) => {
    if (!questions) return;
    
    const question = questions[currentQuestion];
    const selectedOption = (question.options as any[]).find((opt: any) => opt.value === value);
    
    if (selectedOption) {
      setAnswers(prev => ({
        ...prev,
        [currentQuestion]: {
          questionId: question.id,
          selectedOption: selectedOption.value,
          selectedValue: selectedOption.value,
          dimension: selectedOption.dimension,
        }
      }));
    }
  };

  const goToNextQuestion = () => {
    if (!questions) return;
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Submit the test
      const answersArray = Object.values(answers);
      submitMutation.mutate({
        answers: answersArray,
        sessionId,
      });
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const currentAnswer = answers[currentQuestion]?.selectedOption || "";
  const isAnswered = !!currentAnswer;
  const isLastQuestion = questions && currentQuestion === questions.length - 1;

  useEffect(() => {
    // Auto-save progress
    const saveProgress = () => {
      localStorage.setItem('mbti_progress', JSON.stringify({
        currentQuestion,
        answers,
        sessionId,
        timestamp: Date.now()
      }));
    };

    const interval = setInterval(saveProgress, 10000); // Save every 10 seconds
    return () => clearInterval(interval);
  }, [currentQuestion, answers, sessionId]);

  useEffect(() => {
    // Check if we should load saved progress
    const savedProgress = localStorage.getItem('mbti_progress');
    if (savedProgress) {
      try {
        const progress = JSON.parse(savedProgress);
        const timeDiff = Date.now() - progress.timestamp;
        
        // Resume if saved within last 24 hours and has answers
        if (timeDiff < 24 * 60 * 60 * 1000 && Object.keys(progress.answers).length > 0) {
          setCurrentQuestion(progress.currentQuestion);
          setAnswers(progress.answers);
          return; // Exit early to keep saved progress
        }
      } catch (error) {
        console.error('Failed to load saved progress:', error);
      }
    }
    
    // Clear progress and reset if no valid saved data
    localStorage.removeItem('mbti_progress');
    setCurrentQuestion(0);
    setAnswers({});
  }, []);

  // Show loading screen first, then regular loading if needed
  if (showLoading) {
    return <LoadingScreen onComplete={() => setShowLoading(false)} />;
  }

  // Show submission loading screen
  if (isSubmitting) {
    return <SubmissionLoadingScreen />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <Brain className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-lg text-neutral-600">검사 문항을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6 text-center">
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">검사 문항을 불러올 수 없습니다</h2>
            <p className="text-neutral-600 mb-4">잠시 후 다시 시도해주세요.</p>
            <Link href="/">
              <Button>홈으로 돌아가기</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Brain className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-neutral-900">MBTI 성격유형 검사</h1>
                <p className="text-sm text-neutral-500">전문 심리 테스트</p>
              </div>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        <ProgressBar 
          current={currentQuestion + 1} 
          total={questions.length}
          estimatedTime={Math.max(1, Math.round((questions.length - currentQuestion - 1) * 0.5))}
        />

        {/* Question Card */}
        <QuestionCard 
          question={questions[currentQuestion]}
          selectedAnswer={currentAnswer}
          onAnswerChange={handleAnswerChange}
        />

        {/* Navigation Controls */}
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={goToPreviousQuestion}
            disabled={currentQuestion === 0}
            className="flex items-center text-neutral-600 hover:text-primary"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            이전
          </Button>
          
          <div className="text-center">
            <Button
              variant="ghost"
              className="text-primary hover:text-primary/80"
              onClick={() => {
                localStorage.setItem('mbti_progress', JSON.stringify({
                  currentQuestion,
                  answers,
                  sessionId,
                  timestamp: Date.now()
                }));
                toast({
                  title: "진행상황이 저장되었습니다",
                  description: "나중에 이어서 검사를 진행할 수 있습니다.",
                });
                // Navigate to home page after saving
                setTimeout(() => {
                  setLocation('/');
                }, 1500);
              }}
            >
              <Pause className="mr-2 h-4 w-4" />
              잠시 중단
            </Button>
          </div>

          <Button
            onClick={goToNextQuestion}
            disabled={!isAnswered || submitMutation.isPending}
            className="flex items-center"
          >
            {submitMutation.isPending ? (
              "제출 중..."
            ) : isLastQuestion ? (
              "결과 보기"
            ) : (
              <>
                다음
                <ChevronRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
