import { Brain, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Link } from "wouter";
import { useState } from "react";

export default function FAQ() {
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({});

  const toggleItem = (index: number) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const faqData = [
    {
      question: "MBTI란 무엇인가요?",
      answer: "MBTI(Myers-Briggs Type Indicator)는 개인의 심리적 선호도를 측정하는 자기보고식 성격검사입니다. 캐서린 쿡 브릭스와 이사벨 브릭스 마이어스가 칼 융의 심리학적 유형론을 바탕으로 개발했습니다. 4가지 차원(외향성/내향성, 감각/직관, 사고/감정, 판단/인식)을 통해 16가지 성격유형으로 분류합니다."
    },
    {
      question: "검사는 얼마나 정확한가요?",
      answer: "MBTI는 전 세계적으로 검증된 심리학적 도구입니다. 하지만 성격은 고정된 것이 아니며, 상황이나 개인의 성장에 따라 변할 수 있습니다. 이 검사는 현재 당신의 선호도를 반영하는 참고자료로 활용하시기 바랍니다."
    },
    {
      question: "검사 시간은 얼마나 걸리나요?",
      answer: "일반적으로 10-15분 정도 소요됩니다. 각 질문에 대해 신중하게 생각하면서 답변하는 것이 좋습니다. 너무 오래 고민하지 마시고, 첫 번째 직감을 따라 답변해주세요."
    },
    {
      question: "어떤 답변을 선택해야 하나요?",
      answer: "정답은 없습니다. 가장 자연스럽고 편안하게 느끼는 행동이나 생각을 선택해주세요. '해야 하는' 행동이 아닌, '하고 싶은' 행동을 기준으로 답변하시면 됩니다."
    },
    {
      question: "결과가 마음에 들지 않으면 어떻게 하나요?",
      answer: "MBTI 결과는 당신을 제한하는 것이 아닙니다. 각 유형은 고유한 강점과 가치를 가지고 있으며, '좋은' 유형이나 '나쁜' 유형은 없습니다. 결과에 동의하지 않는다면, 다른 관점에서 자신을 돌아보는 기회로 활용해보세요."
    },
    {
      question: "성격유형이 바뀔 수 있나요?",
      answer: "기본적인 선호도는 상당히 안정적이지만, 인생 경험이나 의식적인 노력을 통해 변화할 수 있습니다. 특히 젊은 나이에는 더 유동적일 수 있습니다. 주기적으로 검사를 받아보시는 것도 좋습니다."
    },
    {
      question: "MBTI를 직업 선택에 활용할 수 있나요?",
      answer: "MBTI는 직업 적성을 파악하는 데 도움이 될 수 있지만, 유일한 기준이 되어서는 안 됩니다. 개인의 능력, 관심사, 가치관, 환경적 요인 등을 종합적으로 고려해야 합니다."
    },
    {
      question: "다른 사람과 결과를 비교해도 되나요?",
      answer: "성격유형은 비교의 대상이 아닙니다. 각 유형은 서로 다른 강점과 관점을 가지고 있으며, 이러한 다양성이 팀워크와 사회 발전에 중요합니다. 차이를 인정하고 존중하는 것이 중요합니다."
    },
    {
      question: "검사 결과를 어떻게 활용해야 하나요?",
      answer: "결과를 통해 자신의 선호도와 강점을 이해하고, 개인적 성장과 인간관계 개선에 활용하세요. 또한 스트레스 관리나 의사소통 방식을 개선하는 데도 도움이 됩니다."
    },
    {
      question: "아이도 MBTI 검사를 받을 수 있나요?",
      answer: "일반적으로 16세 이상부터 검사를 권장합니다. 어린 나이에는 성격이 아직 형성 중이므로, 결과를 절대적인 기준으로 받아들이지 않는 것이 좋습니다."
    }
  ];

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
              <Link href="/types" className="text-neutral-600 hover:text-primary transition-colors">유형별 특징</Link>
              <Link href="/faq" className="text-primary font-semibold">FAQ</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">자주 묻는 질문</h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            MBTI 성격유형 검사에 대해 궁금한 점들을 확인해보세요.
          </p>
        </div>

        {/* FAQ Content */}
        <div className="space-y-4 mb-12">
          {faqData.map((item, index) => (
            <Card key={index} className="shadow-lg">
              <Collapsible open={openItems[index]} onOpenChange={() => toggleItem(index)}>
                <CollapsibleTrigger asChild>
                  <div className="p-6 cursor-pointer hover:bg-neutral-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-neutral-900 text-left">
                        {item.question}
                      </h3>
                      <ChevronDown 
                        className={`h-5 w-5 text-neutral-500 transition-transform ${
                          openItems[index] ? 'transform rotate-180' : ''
                        }`} 
                      />
                    </div>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="px-6 pb-6 pt-0">
                    <div className="h-px bg-neutral-200 mb-4"></div>
                    <p className="text-neutral-600 leading-relaxed">{item.answer}</p>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">준비되셨나요?</h2>
          <p className="text-xl mb-6 opacity-90">
            지금 바로 MBTI 검사를 시작해서 자신의 성격유형을 알아보세요
          </p>
          <Link href="/test">
            <Button size="lg" variant="secondary" className="text-lg font-semibold px-8 py-4 h-auto">
              검사 시작하기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}