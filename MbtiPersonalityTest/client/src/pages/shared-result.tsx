import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Star, Briefcase, Heart, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PersonalityCard } from "@/components/personality-card";
import { getPersonalityInfo } from "@/lib/mbti-data";
import type { MbtiResult } from "@shared/schema";

export default function SharedResult() {
  const params = useParams();
  const shareId = params.shareId;

  const { data: result, isLoading, error } = useQuery<MbtiResult>({
    queryKey: [`/api/mbti/shared/${shareId}`],
    enabled: !!shareId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <Brain className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-lg text-neutral-600">결과를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6 text-center">
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">공유된 결과를 찾을 수 없습니다</h2>
            <p className="text-neutral-600 mb-4">링크가 만료되었거나 잘못된 주소입니다.</p>
            <Link href="/">
              <Button>홈으로 가기</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const personalityInfo = getPersonalityInfo(result.personalityType);
  const scores = result.scores as any;

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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="result-content">
        {/* Results Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">MBTI 검사 결과</h1>
          <p className="text-lg text-neutral-600">공유된 성격유형 분석 결과입니다</p>
        </div>

        {/* Main Result Card */}
        <PersonalityCard 
          personalityType={result.personalityType}
          scores={scores}
          personalityInfo={personalityInfo}
        />

        {/* Detailed Information */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {/* Strengths & Growth Areas */}
          <Card className="bg-white shadow-lg border-0 rounded-2xl overflow-hidden">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <Star className="text-yellow-500 w-6 h-6 mr-3" />
                <h3 className="text-xl font-semibold text-neutral-900">강점 & 성장영역</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-green-700 mb-3">주요 강점</h4>
                  <ul className="space-y-2">
                    {personalityInfo.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span className="text-neutral-700">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-orange-700 mb-3">성장 영역</h4>
                  <ul className="space-y-2">
                    {personalityInfo.growthAreas.map((area, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-orange-600 mr-2">•</span>
                        <span className="text-neutral-700">{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Career & Relationships */}
          <Card className="bg-white shadow-lg border-0 rounded-2xl overflow-hidden">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <Briefcase className="text-blue-600 w-6 h-6 mr-3" />
                <h3 className="text-xl font-semibold text-neutral-900">직업 & 인간관계</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-blue-700 mb-3 flex items-center">
                    <Briefcase className="w-4 h-4 mr-2" />
                    적합한 직업
                  </h4>
                  <ul className="space-y-2">
                    {personalityInfo.careers.map((career, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span className="text-neutral-700">{career}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-pink-700 mb-3 flex items-center">
                    <Heart className="w-4 h-4 mr-2" />
                    인간관계 특성
                  </h4>
                  <ul className="space-y-2">
                    {personalityInfo.relationships.map((rel, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-pink-600 mr-2">•</span>
                        <span className="text-neutral-700">{rel}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Compatibility Section */}
        <Card className="bg-white shadow-lg border-0 rounded-2xl overflow-hidden mt-8">
          <CardContent className="p-8">
            <h3 className="text-xl font-semibold text-neutral-900 mb-6">다른 성격유형과의 궁합</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {personalityInfo.compatibility.map((compat, index) => (
                <div key={index} className="border border-neutral-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-neutral-900">{compat.type}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < compat.rating ? 'text-yellow-400 fill-current' : 'text-neutral-300'}`} 
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-neutral-600">{compat.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-bold text-neutral-900 mb-4">나도 MBTI 검사를 해보세요!</h3>
          <p className="text-lg text-neutral-600 mb-8">무료로 전문적인 성격유형 분석을 받아보실 수 있습니다.</p>
          <Link href="/test">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-4 text-lg font-semibold">
              무료 검사 시작하기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}