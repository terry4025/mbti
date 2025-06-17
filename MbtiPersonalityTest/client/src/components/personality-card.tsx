import { Card, CardContent } from "@/components/ui/card";

interface PersonalityCardProps {
  personalityType: string;
  scores: any;
  personalityInfo: any;
}

export function PersonalityCard({ personalityType, scores, personalityInfo }: PersonalityCardProps) {
  const dimensions = [
    { 
      key: personalityType[0], 
      label: personalityType[0] === 'E' ? '외향성' : '내향성',
      percentage: personalityType[0] === 'E' ? (scores.percentages?.E || 0) : (100 - (scores.percentages?.E || 0)),
      oppositeLabel: personalityType[0] === 'E' ? '내향성' : '외향성',
      oppositePercentage: personalityType[0] === 'E' ? (100 - (scores.percentages?.E || 0)) : (scores.percentages?.E || 0)
    },
    { 
      key: personalityType[1], 
      label: personalityType[1] === 'S' ? '감각' : '직관',
      percentage: personalityType[1] === 'S' ? (scores.percentages?.S || 0) : (100 - (scores.percentages?.S || 0)),
      oppositeLabel: personalityType[1] === 'S' ? '직관' : '감각',
      oppositePercentage: personalityType[1] === 'S' ? (100 - (scores.percentages?.S || 0)) : (scores.percentages?.S || 0)
    },
    { 
      key: personalityType[2], 
      label: personalityType[2] === 'T' ? '사고' : '감정',
      percentage: personalityType[2] === 'T' ? (scores.percentages?.T || 0) : (100 - (scores.percentages?.T || 0)),
      oppositeLabel: personalityType[2] === 'T' ? '감정' : '사고',
      oppositePercentage: personalityType[2] === 'T' ? (100 - (scores.percentages?.T || 0)) : (scores.percentages?.T || 0)
    },
    { 
      key: personalityType[3], 
      label: personalityType[3] === 'J' ? '판단' : '인식',
      percentage: personalityType[3] === 'J' ? (scores.percentages?.J || 0) : (100 - (scores.percentages?.J || 0)),
      oppositeLabel: personalityType[3] === 'J' ? '인식' : '판단',
      oppositePercentage: personalityType[3] === 'J' ? (100 - (scores.percentages?.J || 0)) : (scores.percentages?.J || 0)
    },
  ];

  return (
    <Card className="bg-gradient-to-br from-primary to-primary/80 text-white shadow-2xl mb-8">
      <CardContent className="p-8 md:p-12 bg-[#55aef6] text-[#ffffff] pl-[48px] pr-[48px] pt-[48px] pb-[48px] mt-[0px] mb-[0px]">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 rounded-full mb-6">
            <span className="text-4xl font-bold">{personalityType}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{personalityInfo.title}</h2>
          <p className="text-xl mb-6 opacity-90">"{personalityInfo.subtitle}"</p>
          
          {/* Dimension Scores */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {dimensions.map((dimension, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex justify-between items-center mb-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-1 text-white drop-shadow-lg">{dimension.key}</div>
                    <div className="text-sm text-white/90 font-medium drop-shadow">{dimension.label}</div>
                    <div className="text-xl font-semibold text-white drop-shadow">{dimension.percentage}%</div>
                  </div>
                  <div className="text-white/60 text-xs">vs</div>
                  <div className="text-center opacity-70">
                    <div className="text-lg font-medium mb-1 text-white drop-shadow">
                      {dimension.key === 'E' ? 'I' : dimension.key === 'I' ? 'E' : 
                       dimension.key === 'S' ? 'N' : dimension.key === 'N' ? 'S' :
                       dimension.key === 'T' ? 'F' : dimension.key === 'F' ? 'T' :
                       dimension.key === 'J' ? 'P' : 'J'}
                    </div>
                    <div className="text-xs text-white/80 font-medium drop-shadow">{dimension.oppositeLabel}</div>
                    <div className="text-lg font-medium text-white drop-shadow">{dimension.oppositePercentage}%</div>
                  </div>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-white rounded-full h-2 transition-all duration-300" 
                    style={{ width: `${dimension.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
