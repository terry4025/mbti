import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { CheckCircle, Download, RotateCcw, Star, Briefcase, Heart, Brain } from "lucide-react";
import { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { motion } from "framer-motion";
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
        <motion.div 
          className="text-center mb-12 pdf-exclude"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div 
            className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-full mb-6"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              duration: 0.8,
              delay: 0.2,
              type: "spring",
              stiffness: 200,
              damping: 15
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                duration: 0.4,
                delay: 0.6,
                type: "spring",
                stiffness: 300
              }}
            >
              <CheckCircle className="text-secondary text-2xl" />
            </motion.div>
          </motion.div>
          <motion.h1 
            className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            검사가 완료되었습니다!
          </motion.h1>
          <motion.p 
            className="text-lg text-neutral-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            당신의 성격유형 분석 결과를 확인해보세요
          </motion.p>
        </motion.div>

        {/* PDF Content Area */}
        <div id="result-content">
          {/* Personality Type Card with animation */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <PersonalityCard 
              personalityType={result.personalityType}
              scores={scores}
              personalityInfo={personalityInfo}
            />
          </motion.div>

          {/* Detailed Analysis Sections */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Strengths */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
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
                      {personalityInfo.strengths.map((strength: string, index: number) => (
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
                      {personalityInfo.growthAreas.map((area: string, index: number) => (
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
            </motion.div>

            {/* Career & Relationships */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            >
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
                      {personalityInfo.careers.map((career: string, index: number) => (
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
                      {personalityInfo.relationships.map((rel: string, index: number) => (
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
            </motion.div>
          </div>

          {/* Compatibility Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
          >
          <Card className="bg-white shadow-lg border-0 rounded-2xl overflow-hidden">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-neutral-900 mb-6">다른 성격유형과의 궁합</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {personalityInfo.compatibility.map((compat: any, index: number) => (
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
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div 
          className="text-center space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center action-buttons mt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="lg" 
              className="w-full sm:w-auto text-lg font-semibold px-8 py-4 h-auto"
              onClick={handleDownload}
              disabled={isDownloading}
            >
              <Download className="mr-2 h-5 w-5" />
              {isDownloading ? 'PDF 생성 중...' : '결과 다운로드'}
            </Button>
          </motion.div>
          <Link href="/test">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="outline"
                size="lg" 
                className="w-full sm:w-auto text-lg font-semibold px-8 py-4 h-auto border-2 border-secondary text-secondary hover:bg-secondary hover:text-white"
              >
                <RotateCcw className="mr-2 h-5 w-5" />
                다시 검사하기
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}