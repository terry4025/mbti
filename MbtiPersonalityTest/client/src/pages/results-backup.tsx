import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { CheckCircle, Download, Share, RotateCcw, Star, Briefcase, Heart, Brain } from "lucide-react";
import { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PersonalityCard } from "@/components/personality-card";
import { getPersonalityInfo } from "@/lib/mbti-data";
import type { MbtiResult } from "@shared/schema";

export default function Results() {
  const params = useParams();
  const sessionId = params.sessionId;
  const [isDownloading, setIsDownloading] = useState(false);

  // All hooks must be declared before any conditional returns
  const { data: result, isLoading, error } = useQuery<MbtiResult>({
    queryKey: [`/api/mbti/result/${sessionId}`],
    enabled: !!sessionId,
  });

  // Create share link mutation
  const shareResultMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", `/api/mbti/share/${sessionId}`, {});
      return response.json();
    }
  });

  useEffect(() => {
    // Clear any saved progress when viewing results
    localStorage.removeItem('mbti_progress');
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('progressCleared'));
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <Brain className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-lg text-neutral-600">결과를 분석하는 중...</p>
        </div>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6 text-center">
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">결과를 찾을 수 없습니다</h2>
            <p className="text-neutral-600 mb-4">검사를 다시 진행해주세요.</p>
            <Link href="/test">
              <Button>검사 다시하기</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const personalityInfo = getPersonalityInfo(result.personalityType);
  const scores = result.scores as any;

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      // Hide the action buttons during PDF generation
      const actionButtons = document.querySelector('.action-buttons') as HTMLElement;
      if (actionButtons) {
        actionButtons.style.display = 'none';
      }

      // Wait a moment for DOM to update
      await new Promise(resolve => setTimeout(resolve, 100));

      const element = document.getElementById('result-content');
      if (!element) {
        throw new Error('Result content not found');
      }

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#f8fafc',
        width: element.scrollWidth,
        height: element.scrollHeight
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`MBTI_결과_${result.personalityType}_${new Date().getFullYear()}${(new Date().getMonth() + 1).toString().padStart(2, '0')}${new Date().getDate().toString().padStart(2, '0')}.pdf`);

      // Show the action buttons again
      if (actionButtons) {
        actionButtons.style.display = '';
      }
    } catch (error) {
      console.error('PDF 다운로드 오류:', error);
      alert('PDF 다운로드 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    try {
      // Create shareable link
      const shareData = await shareResultMutation.mutateAsync();
      const shareUrl = `${window.location.origin}/shared/${shareData.shareId}`;
      
      const shareText = `내 MBTI 성격 유형은 ${result.personalityType} (${personalityInfo.title})입니다! 

${personalityInfo.subtitle}

내 결과 보기: ${shareUrl}

나도 MBTI 검사 해보기: ${window.location.origin}`;

      if (navigator.share) {
        try {
          await navigator.share({
            title: `MBTI 검사 결과 - ${result.personalityType}`,
            text: shareText,
            url: shareUrl
          });
          alert('공유 링크가 클립보드에 복사되었습니다!');
        } catch (error) {
          if (error.name !== 'AbortError') {
            console.log('공유가 취소되었습니다.');
          }
        }
      } else {
        // 클립보드에 복사
        try {
          await navigator.clipboard.writeText(shareText);
          alert('공유 링크가 클립보드에 복사되었습니다!');
        } catch (error) {
          // 클립보드 API를 지원하지 않는 경우 텍스트 선택
          const textArea = document.createElement('textarea');
          textArea.value = shareText;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          textArea.style.top = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          try {
            document.execCommand('copy');
            alert('공유 링크가 클립보드에 복사되었습니다!');
          } catch (error) {
            alert('공유 기능을 사용할 수 없습니다. 수동으로 링크를 복사해주세요: ' + shareUrl);
          }
          document.body.removeChild(textArea);
        }
      }
    } catch (error) {
      console.error('공유 링크 생성 오류:', error);
      alert('공유 링크 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
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
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Header - excluded from PDF */}
        <div className="text-center mb-12 pdf-exclude">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-full mb-6">
            <CheckCircle className="text-secondary text-2xl" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">검사가 완료되었습니다!</h1>
          <p className="text-lg text-neutral-600">당신의 성격유형 분석 결과를 확인해보세요</p>
        </div>

        {/* PDF Content Area */}
        <div id="result-content">
          {/* Personality Type Card */}
          <PersonalityCard 
            personalityType={result.personalityType}
            scores={scores}
            personalityInfo={personalityInfo}
          />

        {/* Detailed Analysis Sections */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Strengths */}
          <Card className="shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mr-4">
                  <Star className="text-secondary text-xl" />
                </div>
                <h3 className="text-2xl font-semibold text-neutral-900">주요 강점</h3>
              </div>
              <ul className="space-y-3">
                {personalityInfo.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="text-secondary mr-3 mt-1 h-5 w-5 flex-shrink-0" />
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Growth Areas */}
          <Card className="shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mr-4">
                  <Brain className="text-accent text-xl" />
                </div>
                <h3 className="text-2xl font-semibold text-neutral-900">성장 포인트</h3>
              </div>
              <ul className="space-y-3">
                {personalityInfo.growthAreas.map((area, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-accent rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Career & Relationships */}
        <Card className="shadow-lg mb-8">
          <CardContent className="p-8">
            <h3 className="text-2xl font-semibold text-neutral-900 mb-6">적합한 직업과 인간관계</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center">
                  <Briefcase className="text-primary mr-2" />
                  추천 직업군
                </h4>
                <div className="space-y-2">
                  {personalityInfo.careers.map((career, index) => (
                    <span 
                      key={index}
                      className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm mr-2 mb-2"
                    >
                      {career}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center">
                  <Heart className="text-secondary mr-2" />
                  인간관계 특성
                </h4>
                <ul className="space-y-2 text-neutral-600">
                  {personalityInfo.relationships.map((trait, index) => (
                    <li key={index}>• {trait}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Other Personality Types Compatibility */}
        <Card className="shadow-lg mb-8">
          <CardContent className="p-8">
            <h3 className="text-2xl font-semibold text-neutral-900 mb-6">다른 성격유형과의 궁합</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {personalityInfo.compatibility.map((compat, index) => (
                <div key={index} className="border-2 border-neutral-200 rounded-xl p-4 hover:border-primary/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-lg">{compat.type}</span>
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

        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center action-buttons">
          <Button 
            size="lg" 
            className="w-full sm:w-auto text-lg font-semibold px-8 py-4 h-auto"
            onClick={handleDownload}
            disabled={isDownloading}
          >
            <Download className="mr-2 h-5 w-5" />
            {isDownloading ? 'PDF 생성 중...' : '결과 다운로드'}
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full sm:w-auto text-lg font-semibold px-8 py-4 h-auto border-2 border-primary text-primary hover:bg-primary hover:text-white"
            onClick={handleShare}
            disabled={shareResultMutation.isPending}
          >
            <Share className="mr-2 h-5 w-5" />
            {shareResultMutation.isPending ? '링크 생성 중...' : '결과 공유하기'}
          </Button>
          <Link href="/test">
            <Button 
              variant="outline"
              size="lg" 
              className="w-full sm:w-auto text-lg font-semibold px-8 py-4 h-auto border-2 border-secondary text-secondary hover:bg-secondary hover:text-white"
            >
              <RotateCcw className="mr-2 h-5 w-5" />
              다시 검사하기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
