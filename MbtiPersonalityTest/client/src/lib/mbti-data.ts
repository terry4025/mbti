export interface PersonalityInfo {
  title: string;
  subtitle: string;
  description: string;
  strengths: string[];
  growthAreas: string[];
  careers: string[];
  relationships: string[];
  compatibility: Array<{
    type: string;
    rating: number;
    description: string;
  }>;
}

export const personalityData: Record<string, PersonalityInfo> = {
  ENFP: {
    title: "활동가 (Campaigner)",
    subtitle: "열정적이고 창의적인 사회적 자유로운 영혼",
    description: "ENFP는 진정으로 자유로운 정신을 가진 사람들입니다. 삶에 대한 열정과 에너지로 가득하며, 다른 사람들에게 영감을 주는 능력을 가지고 있습니다.",
    strengths: [
      "뛰어난 의사소통 능력과 사람들과의 관계 형성",
      "창의적이고 혁신적인 아이디어 생성",
      "열정적이고 활기찬 에너지",
      "다양한 가능성을 보는 직관력"
    ],
    growthAreas: [
      "세부사항에 대한 주의력 향상",
      "일정 관리와 계획성 개발",
      "혼자만의 시간을 통한 재충전",
      "객관적 분석력 기르기"
    ],
    careers: ["마케팅 전문가", "상담사", "언론인", "기획자", "교육자", "예술가"],
    relationships: [
      "다양한 사람들과 쉽게 친해짐",
      "깊이 있는 대화를 선호",
      "타인의 감정에 민감하게 반응",
      "갈등 상황을 피하려고 함",
      "격려와 지지를 통해 동기부여"
    ],
    compatibility: [
      { type: "INTJ", rating: 4, description: "건축가형 - 상호 보완적 관계" },
      { type: "INFJ", rating: 5, description: "옹호자형 - 이상적인 파트너" },
      { type: "ENFJ", rating: 4, description: "선도자형 - 비슷한 에너지" },
      { type: "ISFP", rating: 3, description: "모험가형 - 가치관 공유" }
    ]
  },
  INFP: {
    title: "중재자 (Mediator)",
    subtitle: "시적이고 친절한 이타주의자",
    description: "INFP는 이상주의자이며 충성심이 강합니다. 자신의 가치관과 신념을 중요하게 여기며, 세상을 더 나은 곳으로 만들고자 합니다.",
    strengths: [
      "깊은 공감 능력과 이해심",
      "창의적이고 상상력이 풍부함",
      "강한 가치관과 신념",
      "개인의 독특함을 존중"
    ],
    growthAreas: [
      "현실적인 목표 설정",
      "갈등 상황에 대한 적극적 대응",
      "자기 주장 능력 향상",
      "비판에 대한 내성 기르기"
    ],
    careers: ["작가", "상담사", "심리학자", "사회복지사", "예술가", "번역가"],
    relationships: [
      "소수의 깊은 관계를 선호",
      "진정성 있는 대화를 중시",
      "타인의 성장을 돕고자 함",
      "조화로운 분위기를 추구",
      "개인적 공간과 시간이 필요"
    ],
    compatibility: [
      { type: "ENFJ", rating: 5, description: "선도자형 - 완벽한 조화" },
      { type: "INFJ", rating: 4, description: "옹호자형 - 깊은 이해" },
      { type: "ENFP", rating: 4, description: "활동가형 - 창의적 시너지" },
      { type: "ISFJ", rating: 3, description: "수호자형 - 안정적 관계" }
    ]
  },
  ENTJ: {
    title: "통솔자 (Commander)",
    subtitle: "대담하고 상상력이 풍부한 강력한 의지의 지도자",
    description: "ENTJ는 타고난 지도자입니다. 카리스마와 자신감을 가지고 있으며, 목표를 달성하기 위해 다른 사람들을 이끄는 능력이 뛰어납니다.",
    strengths: [
      "뛰어난 리더십과 조직 관리 능력",
      "전략적 사고와 장기적 계획",
      "결단력과 실행력",
      "효율성과 생산성 추구"
    ],
    growthAreas: [
      "타인의 감정에 대한 배려",
      "세부사항에 대한 인내심",
      "비판에 대한 수용적 태도",
      "완벽주의 성향 조절"
    ],
    careers: ["CEO", "관리자", "변호사", "컨설턴트", "투자자", "정치가"],
    relationships: [
      "목표 지향적인 관계를 선호",
      "직접적이고 솔직한 의사소통",
      "동등한 수준의 파트너를 추구",
      "성장과 발전을 중시",
      "독립성과 자율성을 존중"
    ],
    compatibility: [
      { type: "INTP", rating: 5, description: "논리술사형 - 지적 동반자" },
      { type: "ENFP", rating: 4, description: "활동가형 - 역동적 관계" },
      { type: "INTJ", rating: 4, description: "건축가형 - 전략적 파트너십" },
      { type: "ENTP", rating: 3, description: "변론가형 - 창의적 경쟁" }
    ]
  },
  INTJ: {
    title: "건축가 (Architect)",
    subtitle: "상상력이 풍부하고 전략적인 사고를 하는 계획가",
    description: "INTJ는 독립적이고 결단력이 있으며, 높은 기준을 가지고 있습니다. 자신의 능력과 지식에 대한 자신감이 강합니다.",
    strengths: [
      "체계적이고 전략적인 사고",
      "독립적이고 자주적인 업무 수행",
      "장기적 비전과 통찰력",
      "높은 집중력과 완성도"
    ],
    growthAreas: [
      "팀워크와 협업 능력 향상",
      "감정 표현과 공감 능력",
      "유연성과 적응력 개발",
      "비판적 피드백 수용"
    ],
    careers: ["연구원", "엔지니어", "건축가", "전략기획자", "투자분석가", "작가"],
    relationships: [
      "소수의 깊고 의미 있는 관계",
      "지적 자극이 있는 대화 선호",
      "개인적 공간과 독립성 중시",
      "장기적이고 안정적인 관계 추구",
      "신뢰를 바탕으로 한 관계 형성"
    ],
    compatibility: [
      { type: "ENFP", rating: 5, description: "활동가형 - 완벽한 균형" },
      { type: "ENTP", rating: 4, description: "변론가형 - 지적 자극" },
      { type: "INFJ", rating: 4, description: "옹호자형 - 깊은 이해" },
      { type: "ENTJ", rating: 3, description: "통솔자형 - 전략적 동맹" }
    ]
  },
  ENFJ: {
    title: "선도자 (Protagonist)",
    subtitle: "카리스마가 있고 영감을 주는 지도자",
    description: "ENFJ는 타인을 돕고 영감을 주는 것에서 만족을 찾습니다. 타고난 지도자이며, 다른 사람들의 잠재력을 끌어내는 능력이 있습니다.",
    strengths: [
      "뛰어난 대인관계 능력",
      "타인을 동기부여하는 리더십",
      "공감 능력과 배려심",
      "팀워크와 협력 추진"
    ],
    growthAreas: [
      "자신의 필요와 욕구 인식",
      "과도한 책임감 조절",
      "비판적 피드백 수용",
      "개인적 경계 설정"
    ],
    careers: ["교육자", "상담사", "인사관리자", "코치", "정치가", "사회복지사"],
    relationships: [
      "타인의 성장과 발전에 관심",
      "조화롭고 따뜻한 분위기 조성",
      "깊이 있고 의미 있는 관계 추구",
      "갈등 해결과 중재 역할",
      "감정적 지지와 격려 제공"
    ],
    compatibility: [
      { type: "INFP", rating: 5, description: "중재자형 - 이상적 조화" },
      { type: "ISFP", rating: 4, description: "모험가형 - 상호 성장" },
      { type: "ENFP", rating: 4, description: "활동가형 - 에너지 공유" },
      { type: "INTP", rating: 3, description: "논리술사형 - 보완적 관계" }
    ]
  },
  INFJ: {
    title: "옹호자 (Advocate)",
    subtitle: "선의의 옹호자이며 창의적이고 통찰력이 있는 영감을 주는 이상주의자",
    description: "INFJ는 깊은 통찰력과 강한 직관력을 가진 희귀한 성격 유형입니다. 세상을 더 나은 곳으로 만들고자 하는 열망이 강합니다.",
    strengths: [
      "깊은 통찰력과 직관적 이해",
      "창의적이고 독창적인 사고",
      "강한 가치관과 신념",
      "타인에 대한 깊은 공감과 이해"
    ],
    growthAreas: [
      "완벽주의 성향 조절",
      "자기 관리와 스트레스 해소",
      "현실적 목표 설정",
      "타인과의 경계 설정"
    ],
    careers: ["작가", "상담사", "심리학자", "예술가", "종교인", "연구원"],
    relationships: [
      "소수의 깊고 진실한 관계",
      "영적이고 철학적 대화 선호",
      "타인의 성장을 돕고자 함",
      "감정적 깊이와 진정성 추구",
      "개인적 공간과 시간이 필요"
    ],
    compatibility: [
      { type: "ENFP", rating: 5, description: "활동가형 - 완벽한 이해" },
      { type: "ENTP", rating: 4, description: "변론가형 - 지적 자극" },
      { type: "INTJ", rating: 4, description: "건축가형 - 깊은 연결" },
      { type: "INFP", rating: 3, description: "중재자형 - 가치관 공유" }
    ]
  },
  ENTP: {
    title: "변론가 (Debater)",
    subtitle: "똑똑하고 호기심이 많은 사색가",
    description: "ENTP는 지적 도전을 즐기며, 새로운 아이디어와 가능성을 탐구하는 것을 좋아합니다. 창의적이고 혁신적인 사고를 가지고 있습니다.",
    strengths: [
      "빠른 사고와 기지",
      "창의적이고 혁신적인 아이디어",
      "뛰어난 토론과 설득 능력",
      "다양한 관점과 가능성 탐구"
    ],
    growthAreas: [
      "일관성과 지속성 향상",
      "세부사항에 대한 주의력",
      "감정적 배려와 공감",
      "루틴과 구조에 대한 적응"
    ],
    careers: ["기업가", "변호사", "마케터", "컨설턴트", "발명가", "언론인"],
    relationships: [
      "지적 자극이 있는 관계 선호",
      "활발한 토론과 논쟁 즐김",
      "자유롭고 유연한 관계",
      "새로운 경험과 모험 추구",
      "독립성과 개성 존중"
    ],
    compatibility: [
      { type: "INTJ", rating: 5, description: "건축가형 - 지적 파트너십" },
      { type: "INFJ", rating: 4, description: "옹호자형 - 창의적 영감" },
      { type: "ENFJ", rating: 4, description: "선도자형 - 역동적 관계" },
      { type: "INTP", rating: 3, description: "논리술사형 - 사고의 공명" }
    ]
  },
  INTP: {
    title: "논리술사 (Logician)",
    subtitle: "혁신적인 발명가로 지식에 대한 갈증이 끝이 없는 사람",
    description: "INTP는 이론적이고 추상적인 사고를 즐깁니다. 복잡한 문제를 논리적으로 분석하고 해결하는 능력이 뛰어납니다.",
    strengths: [
      "논리적이고 분석적인 사고",
      "독창적이고 혁신적인 아이디어",
      "객관적이고 공정한 판단",
      "깊이 있는 지식과 전문성"
    ],
    growthAreas: [
      "감정 표현과 공감 능력",
      "실행력과 완성도 향상",
      "대인관계 기술 개발",
      "일상적 업무에 대한 인내"
    ],
    careers: ["연구원", "프로그래머", "수학자", "철학자", "과학자", "분석가"],
    relationships: [
      "지적 호환성을 중시",
      "독립성과 개인 공간 필요",
      "깊이 있는 일대일 대화 선호",
      "감정보다 논리를 우선시",
      "소수의 의미 있는 관계"
    ],
    compatibility: [
      { type: "ENTJ", rating: 5, description: "통솔자형 - 지적 동반자" },
      { type: "ENFJ", rating: 4, description: "선도자형 - 상호 보완" },
      { type: "INFJ", rating: 4, description: "옹호자형 - 깊은 이해" },
      { type: "ENTP", rating: 3, description: "변론가형 - 아이디어 공유" }
    ]
  },
  ESFP: {
    title: "연예인 (Entertainer)",
    subtitle: "자발적이고 활기찬 연예인",
    description: "ESFP는 삶을 즐기며 다른 사람들과 그 즐거움을 나누는 것을 좋아합니다. 자발적이고 활기차며 주변을 밝게 만드는 능력이 있습니다.",
    strengths: [
      "뛰어난 사회성과 친화력",
      "긍정적이고 낙관적인 에너지",
      "유연하고 적응력이 뛰어남",
      "실용적이고 현실적인 접근"
    ],
    growthAreas: [
      "장기적 계획과 목표 설정",
      "비판에 대한 내성 기르기",
      "집중력과 지속성 향상",
      "갈등 상황에 대한 대처"
    ],
    careers: ["연예인", "판매원", "이벤트 기획자", "교육자", "상담사", "요리사"],
    relationships: [
      "따뜻하고 친근한 관계",
      "즉흥적이고 재미있는 활동",
      "감정적 지지와 격려 제공",
      "갈등을 피하고 조화 추구",
      "현재 순간을 즐기는 관계"
    ],
    compatibility: [
      { type: "ISFJ", rating: 4, description: "수호자형 - 안정적 관계" },
      { type: "ESFJ", rating: 4, description: "집정관형 - 따뜻한 조화" },
      { type: "ENFP", rating: 3, description: "활동가형 - 에너지 공유" },
      { type: "ISTP", rating: 3, description: "만능재주꾼형 - 실용적 매력" }
    ]
  },
  ISFP: {
    title: "모험가 (Adventurer)",
    subtitle: "유연하고 매력적인 예술가",
    description: "ISFP는 조용하고 친근하며, 민감하고 친절합니다. 자신만의 가치관을 중시하며, 자유롭고 개방적인 마음을 가지고 있습니다.",
    strengths: [
      "강한 가치관과 신념",
      "예술적 감각과 창의성",
      "타인에 대한 깊은 이해와 공감",
      "유연하고 개방적인 마음"
    ],
    growthAreas: [
      "자기 주장과 의견 표현",
      "장기적 계획과 목표 설정",
      "비판에 대한 대처 능력",
      "갈등 상황에서의 적극성"
    ],
    careers: ["예술가", "디자이너", "음악가", "상담사", "사회복지사", "수의사"],
    relationships: [
      "진정성 있고 깊은 관계",
      "개인적 가치와 신념 존중",
      "조용하고 평화로운 환경",
      "감정적 지지와 이해",
      "개인적 공간과 자유 필요"
    ],
    compatibility: [
      { type: "ENFJ", rating: 5, description: "선도자형 - 성장과 영감" },
      { type: "ESFJ", rating: 4, description: "집정관형 - 따뜻한 지지" },
      { type: "INFP", rating: 4, description: "중재자형 - 가치관 공유" },
      { type: "ISFJ", rating: 3, description: "수호자형 - 안정적 이해" }
    ]
  },
  ESTP: {
    title: "사업가 (Entrepreneur)",
    subtitle: "똑똑하고 활기차며 인식이 뛰어난 사업가",
    description: "ESTP는 즉흥적이고 활동적이며, 새로운 경험을 추구합니다. 현실적이고 실용적인 접근을 선호하며, 문제 해결 능력이 뛰어납니다.",
    strengths: [
      "뛰어난 문제 해결 능력",
      "현실적이고 실용적인 접근",
      "높은 적응력과 유연성",
      "활기찬 에너지와 리더십"
    ],
    growthAreas: [
      "장기적 계획과 전략 수립",
      "감정적 배려와 공감",
      "인내심과 지속성 향상",
      "세부사항에 대한 주의력"
    ],
    careers: ["영업", "기업가", "경찰", "응급의료진", "스포츠선수", "컨설턴트"],
    relationships: [
      "활동적이고 모험적인 관계",
      "즉흥적이고 재미있는 경험",
      "직접적이고 솔직한 소통",
      "현실적이고 실용적인 지원",
      "자유롭고 제약 없는 관계"
    ],
    compatibility: [
      { type: "ISFJ", rating: 4, description: "수호자형 - 안정과 모험의 균형" },
      { type: "ESFJ", rating: 3, description: "집정관형 - 사회적 활동" },
      { type: "ISTP", rating: 3, description: "만능재주꾼형 - 실용적 파트너십" },
      { type: "ESTJ", rating: 3, description: "경영자형 - 목표 지향적 협력" }
    ]
  },
  ISTP: {
    title: "만능재주꾼 (Virtuoso)",
    subtitle: "대담하고 실용적인 실험정신이 풍부한 장인",
    description: "ISTP는 조용하고 과묵하지만, 위기 상황에서 놀라운 능력을 발휘합니다. 실용적이고 현실적인 접근을 선호하며, 손재주가 뛰어납니다.",
    strengths: [
      "뛰어난 문제 해결과 위기 대응",
      "실용적이고 현실적인 사고",
      "독립적이고 자주적인 업무",
      "기계적 감각과 손재주"
    ],
    growthAreas: [
      "감정 표현과 의사소통",
      "장기적 계획과 목표 설정",
      "팀워크와 협업 능력",
      "타인과의 감정적 연결"
    ],
    careers: ["엔지니어", "정비사", "조종사", "외과의", "건축가", "프로그래머"],
    relationships: [
      "독립성과 개인 공간 중시",
      "행동으로 보여주는 애정",
      "실용적이고 구체적인 지원",
      "감정보다 논리적 접근",
      "자유롭고 제약 없는 관계"
    ],
    compatibility: [
      { type: "ESFJ", rating: 4, description: "집정관형 - 보완적 관계" },
      { type: "ESTJ", rating: 3, description: "경영자형 - 실용적 협력" },
      { type: "ISFJ", rating: 3, description: "수호자형 - 안정적 지지" },
      { type: "ESTP", rating: 3, description: "사업가형 - 활동적 동반자" }
    ]
  },
  ESFJ: {
    title: "집정관 (Consul)",
    subtitle: "매우 인기가 많고 사교적인 하모니를 이루는 사람",
    description: "ESFJ는 따뜻하고 친근하며, 다른 사람들을 돕는 것에서 만족을 찾습니다. 협력적이고 책임감이 강하며, 조화로운 환경을 만드는 데 뛰어납니다.",
    strengths: [
      "뛰어난 대인관계와 협력 능력",
      "강한 책임감과 신뢰성",
      "타인에 대한 배려와 지지",
      "조직화와 체계적 업무 처리"
    ],
    growthAreas: [
      "자신의 필요와 욕구 인식",
      "비판에 대한 내성 기르기",
      "변화에 대한 적응력",
      "개인적 경계 설정"
    ],
    careers: ["간호사", "교사", "상담사", "사회복지사", "이벤트기획자", "인사관리자"],
    relationships: [
      "따뜻하고 지지적인 관계",
      "타인의 필요에 민감하게 반응",
      "전통적이고 안정적인 가치",
      "조화롭고 평화로운 환경",
      "감정적 연결과 소속감 중시"
    ],
    compatibility: [
      { type: "ISFP", rating: 5, description: "모험가형 - 따뜻한 이해" },
      { type: "ISTP", rating: 4, description: "만능재주꾼형 - 상호 보완" },
      { type: "ESFP", rating: 4, description: "연예인형 - 사교적 조화" },
      { type: "ISFJ", rating: 3, description: "수호자형 - 가치관 공유" }
    ]
  },
  ISFJ: {
    title: "수호자 (Protector)",
    subtitle: "매우 헌신적이고 따뜻한 수호자",
    description: "ISFJ는 친절하고 책임감이 강하며, 다른 사람들의 필요를 자신의 일처럼 여깁니다. 전통을 중시하고 안정적인 환경을 선호합니다.",
    strengths: [
      "뛰어난 관찰력과 기억력",
      "타인에 대한 깊은 배려와 지지",
      "신뢰할 수 있는 책임감",
      "실용적이고 체계적인 접근"
    ],
    growthAreas: [
      "자기 주장과 의견 표현",
      "변화에 대한 개방성",
      "개인적 필요 인식과 표현",
      "갈등 상황에서의 적극성"
    ],
    careers: ["간호사", "교사", "상담사", "도서관사서", "회계사", "행정직"],
    relationships: [
      "안정적이고 신뢰할 수 있는 관계",
      "타인의 필요에 세심한 관심",
      "전통적 가치와 의무감",
      "조용하고 평화로운 환경",
      "장기적이고 깊은 헌신"
    ],
    compatibility: [
      { type: "ESFP", rating: 5, description: "연예인형 - 활기와 안정의 조화" },
      { type: "ESTP", rating: 4, description: "사업가형 - 모험과 안정" },
      { type: "ISFP", rating: 4, description: "모험가형 - 조용한 이해" },
      { type: "ESFJ", rating: 3, description: "집정관형 - 전통적 가치" }
    ]
  },
  ESTJ: {
    title: "경영자 (Executive)",
    subtitle: "뛰어난 관리자로 전통과 질서를 중시하는 사람",
    description: "ESTJ는 조직적이고 실용적이며, 목표 달성을 위해 체계적으로 접근합니다. 리더십이 뛰어나고 책임감이 강합니다.",
    strengths: [
      "뛰어난 조직력과 관리 능력",
      "목표 지향적이고 실행력이 강함",
      "체계적이고 효율적인 업무 처리",
      "강한 책임감과 신뢰성"
    ],
    growthAreas: [
      "유연성과 적응력 향상",
      "타인의 감정에 대한 배려",
      "새로운 아이디어에 대한 개방성",
      "완벽주의 성향 조절"
    ],
    careers: ["경영자", "관리자", "군인", "판사", "은행원", "회계사"],
    relationships: [
      "안정적이고 예측 가능한 관계",
      "명확한 역할과 책임 분담",
      "전통적 가치와 질서 중시",
      "목표 지향적인 파트너십",
      "신뢰와 충성을 바탕으로 한 관계"
    ],
    compatibility: [
      { type: "ISFP", rating: 4, description: "모험가형 - 구조와 자유의 균형" },
      { type: "INTP", rating: 3, description: "논리술사형 - 실행과 아이디어" },
      { type: "ISTP", rating: 3, description: "만능재주꾼형 - 실용적 협력" },
      { type: "ESFJ", rating: 3, description: "집정관형 - 전통적 협력" }
    ]
  },
  ISTJ: {
    title: "물류관리자 (Logistician)",
    subtitle: "실용적이고 사실에 근거한 신뢰할 수 있는 사람",
    description: "ISTJ는 책임감이 강하고 신뢰할 수 있으며, 전통과 충성심을 중시합니다. 체계적이고 꼼꼼한 접근을 선호합니다.",
    strengths: [
      "뛰어난 책임감과 신뢰성",
      "체계적이고 조직적인 업무 처리",
      "세부사항에 대한 주의력",
      "전통적 가치와 안정성 추구"
    ],
    growthAreas: [
      "변화에 대한 적응력",
      "창의적 사고와 혁신",
      "감정 표현과 공감 능력",
      "새로운 아이디어에 대한 개방성"
    ],
    careers: ["회계사", "변호사", "의사", "엔지니어", "군인", "공무원"],
    relationships: [
      "안정적이고 전통적인 관계",
      "명확한 기대와 역할",
      "장기적이고 헌신적인 관계",
      "실용적이고 현실적인 지원",
      "신뢰와 일관성을 중시"
    ],
    compatibility: [
      { type: "ESFP", rating: 4, description: "연예인형 - 안정과 활기" },
      { type: "ESTP", rating: 3, description: "사업가형 - 신중함과 활동성" },
      { type: "ISFJ", rating: 3, description: "수호자형 - 전통적 가치 공유" },
      { type: "ESTJ", rating: 3, description: "경영자형 - 체계적 협력" }
    ]
  }
};

export function getPersonalityInfo(type: string): PersonalityInfo {
  return personalityData[type] || personalityData.ENFP; // Default fallback
}
