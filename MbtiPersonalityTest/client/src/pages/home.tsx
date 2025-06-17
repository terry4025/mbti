import { Brain, Clock, Shield, TrendingUp, Play, Eye, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useState, useEffect } from "react";

export default function Home() {
  const [hasProgress, setHasProgress] = useState(false);
  const [progressData, setProgressData] = useState<any>(null);

  useEffect(() => {
    const checkProgress = () => {
      const savedProgress = localStorage.getItem('mbti_progress');
      if (savedProgress) {
        try {
          const progress = JSON.parse(savedProgress);
          const timeDiff = Date.now() - progress.timestamp;
          
          // Check if saved within last 24 hours and has answers
          if (timeDiff < 24 * 60 * 60 * 1000 && Object.keys(progress.answers).length > 0) {
            setHasProgress(true);
            setProgressData(progress);
          } else {
            setHasProgress(false);
            setProgressData(null);
          }
        } catch (error) {
          console.error('Failed to load saved progress:', error);
          setHasProgress(false);
          setProgressData(null);
        }
      } else {
        setHasProgress(false);
        setProgressData(null);
      }
    };

    checkProgress();
    
    // Add event listener to check when localStorage changes
    const handleStorageChange = () => {
      checkProgress();
    };
    
    window.addEventListener('storage', handleStorageChange);
    // Also listen for custom events when localStorage is modified
    window.addEventListener('progressCleared', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('progressCleared', handleStorageChange);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Brain className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-neutral-900">MBTI 성격유형 검사</h1>
                <p className="text-sm text-neutral-500">전문 심리 테스트</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-neutral-600 hover:text-primary transition-colors">홈</Link>
              <Link href="/test" className="text-neutral-600 hover:text-primary transition-colors">검사하기</Link>
              <Link href="/types" className="text-neutral-600 hover:text-primary transition-colors">유형별 특징</Link>
              <Link href="/faq" className="text-neutral-600 hover:text-primary transition-colors">FAQ</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <section className="relative py-20 lg:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50 opacity-70"></div>
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: "radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)"
            }}
          ></div>
          
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
                나의 진짜 성격은<br />
                <span className="text-primary">무엇일까요?</span>
              </h1>
              <p className="text-xl md:text-2xl text-neutral-600 mb-8 leading-relaxed">
                세계적으로 검증된 MBTI 성격유형 검사로<br />
                자신의 성격을 정확하게 파악해보세요
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                {hasProgress ? (
                  <>
                    <Link href="/test" onClick={() => localStorage.removeItem('mbti_progress')}>
                      <Button size="lg" className="text-lg font-semibold px-8 py-4 h-auto">
                        <RotateCcw className="mr-2 h-5 w-5" />
                        새로 시작하기
                      </Button>
                    </Link>
                    <Link href="/test">
                      <Button 
                        variant="outline" 
                        size="lg" 
                        className="text-lg font-semibold px-8 py-4 h-auto border-2 border-secondary text-secondary hover:bg-secondary hover:text-white"
                      >
                        <Play className="mr-2 h-5 w-5" />
                        이어서 하기 ({progressData?.currentQuestion + 1}번 문항부터)
                      </Button>
                    </Link>
                  </>
                ) : (
                  <Link href="/test">
                    <Button size="lg" className="text-lg font-semibold px-8 py-4 h-auto">
                      <Play className="mr-2 h-5 w-5" />
                      검사 시작하기
                    </Button>
                  </Link>
                )}
                <Link href="/types">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="text-lg font-semibold px-8 py-4 h-auto border-2 border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    <Eye className="mr-2 h-5 w-5" />
                    16가지 유형 보기
                  </Button>
                </Link>
              </div>
              
              {/* Features Grid */}
              <div className="grid md:grid-cols-3 gap-8 mt-16">
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Clock className="text-primary text-xl" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">빠른 검사</h3>
                  <p className="text-neutral-600">약 10-15분 소요되는 간편한 검사로 정확한 결과를 얻으세요</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Shield className="text-secondary text-xl" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">검증된 신뢰성</h3>
                  <p className="text-neutral-600">전 세계적으로 인정받은 표준화된 MBTI 검사 방식 적용</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="text-accent text-xl" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">상세한 분석</h3>
                  <p className="text-neutral-600">개인별 맞춤 분석과 성격 특성에 대한 깊이 있는 설명</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-12 mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Brain className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">MBTI 성격유형 검사</h3>
                <p className="text-neutral-400 text-sm">전문 심리 테스트</p>
              </div>
            </div>
            <p className="text-neutral-400">
              과학적으로 검증된 MBTI 검사를 통해 자신의 성격을 정확하게 파악하고<br />
              더 나은 인간관계와 진로 선택에 도움을 받으세요.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
