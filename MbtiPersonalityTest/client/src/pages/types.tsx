import { Brain, Users, Lightbulb, Target, Heart, BookOpen, Briefcase, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { personalityData } from "@/lib/mbti-data";

export default function Types() {
  const personalityTypes = Object.entries(personalityData);

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'E': 'bg-red-100 text-red-800',
      'I': 'bg-blue-100 text-blue-800',
      'S': 'bg-green-100 text-green-800',
      'N': 'bg-purple-100 text-purple-800',
      'T': 'bg-orange-100 text-orange-800',
      'F': 'bg-pink-100 text-pink-800',
      'J': 'bg-indigo-100 text-indigo-800',
      'P': 'bg-yellow-100 text-yellow-800'
    };
    return colors[type[0]] || 'bg-gray-100 text-gray-800';
  };

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
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-neutral-600 hover:text-primary transition-colors">홈</Link>
              <Link href="/test" className="text-neutral-600 hover:text-primary transition-colors">검사하기</Link>
              <Link href="/types" className="text-primary font-semibold">유형별 특징</Link>
              <Link href="/faq" className="text-neutral-600 hover:text-primary transition-colors">FAQ</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">16가지 성격유형</h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            각 성격유형의 독특한 특징과 강점을 알아보세요. 자신의 유형을 찾아 더 깊이 이해해보세요.
          </p>
          <div className="mt-8">
            <Link href="/test">
              <Button size="lg" className="text-lg font-semibold px-8 py-4 h-auto">
                <Target className="mr-2 h-5 w-5" />
                내 성격유형 찾기
              </Button>
            </Link>
          </div>
        </div>

        {/* MBTI Dimensions Explanation */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-neutral-900 mb-8 text-center">MBTI 4가지 차원</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="text-red-600 text-xl" />
                </div>
                <h3 className="font-semibold text-lg mb-2">외향성 vs 내향성</h3>
                <p className="text-sm text-neutral-600 mb-3">E (Extraversion) vs I (Introversion)</p>
                <p className="text-neutral-600">에너지를 얻는 방향과 관심의 초점</p>
              </CardContent>
            </Card>
            
            <Card className="shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="text-green-600 text-xl" />
                </div>
                <h3 className="font-semibold text-lg mb-2">감각 vs 직관</h3>
                <p className="text-sm text-neutral-600 mb-3">S (Sensing) vs N (iNtuition)</p>
                <p className="text-neutral-600">정보를 수집하고 인식하는 방식</p>
              </CardContent>
            </Card>
            
            <Card className="shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="text-orange-600 text-xl" />
                </div>
                <h3 className="font-semibold text-lg mb-2">사고 vs 감정</h3>
                <p className="text-sm text-neutral-600 mb-3">T (Thinking) vs F (Feeling)</p>
                <p className="text-neutral-600">결정을 내리는 기준과 방식</p>
              </CardContent>
            </Card>
            
            <Card className="shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Target className="text-indigo-600 text-xl" />
                </div>
                <h3 className="font-semibold text-lg mb-2">판단 vs 인식</h3>
                <p className="text-sm text-neutral-600 mb-3">J (Judging) vs P (Perceiving)</p>
                <p className="text-neutral-600">외부 세계에 대한 태도와 생활양식</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Personality Types Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 mb-8 text-center">16가지 성격유형</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {personalityTypes.map(([type, info]) => (
              <Card key={type} className="shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer group">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="flex justify-center space-x-1 mb-3">
                      {type.split('').map((letter, index) => (
                        <span 
                          key={index}
                          className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(letter)}`}
                        >
                          {letter}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-bold text-lg text-neutral-900 group-hover:text-primary transition-colors">
                      {type}
                    </h3>
                    <p className="text-sm font-medium text-neutral-700 mb-2">{info.title}</p>
                    <p className="text-xs text-neutral-600 italic">"{info.subtitle}"</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-xs font-semibold text-neutral-800 mb-1 flex items-center">
                        <Star className="h-3 w-3 mr-1 text-secondary" />
                        주요 강점
                      </h4>
                      <ul className="text-xs text-neutral-600 space-y-1">
                        {info.strengths.slice(0, 2).map((strength, index) => (
                          <li key={index}>• {strength}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-xs font-semibold text-neutral-800 mb-1 flex items-center">
                        <Briefcase className="h-3 w-3 mr-1 text-primary" />
                        적합한 직업
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {info.careers.slice(0, 3).map((career, index) => (
                          <span 
                            key={index}
                            className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                          >
                            {career}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">나의 성격유형을 찾아보세요!</h2>
          <p className="text-xl mb-6 opacity-90">
            정확한 MBTI 검사로 자신만의 독특한 성격을 발견해보세요
          </p>
          <Link href="/test">
            <Button size="lg" variant="secondary" className="text-lg font-semibold px-8 py-4 h-auto">
              <Heart className="mr-2 h-5 w-5" />
              지금 검사 시작하기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}