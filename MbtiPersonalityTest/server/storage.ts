import { MbtiQuestion, MbtiResult, InsertMbtiResult } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<any | undefined>;
  getUserByUsername(username: string): Promise<any | undefined>;
  createUser(user: any): Promise<any>;
  getMbtiQuestions(): Promise<MbtiQuestion[]>;
  saveMbtiResult(result: InsertMbtiResult): Promise<MbtiResult>;
  getMbtiResult(sessionId: string): Promise<MbtiResult | undefined>;
  createShareableResult(sessionId: string): Promise<string>;
  getSharedResult(shareId: string): Promise<MbtiResult | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, any>;
  private mbtiQuestions: MbtiQuestion[] = [];
  private mbtiResults: Map<string, MbtiResult>;
  private sharedResults: Map<string, string>; // shareId -> sessionId mapping
  currentId: number;
  currentResultId: number;

  constructor() {
    this.users = new Map();
    this.mbtiResults = new Map();
    this.sharedResults = new Map();
    this.currentId = 1;
    this.currentResultId = 1;
    this.initializeMbtiQuestions();
  }

  private initializeMbtiQuestions() {
    this.mbtiQuestions = [
      // E/I 차원 - 6문항
      {
        id: 1,
        text: "새로운 사람들과 어울리는 자리에서 나는...",
        category: "E/I",
        weight: 1.2, // 핵심 지표
        options: [
          { value: "E1", text: "적극적으로 다가가서 대화를 시작한다", description: "새로운 만남을 즐기고 자연스럽게 어울린다", dimension: "E" },
          { value: "E2", text: "여러 사람과 동시에 대화하며 에너지를 얻는다", description: "활발한 상호작용을 통해 활력을 느낀다", dimension: "E" },
          { value: "I1", text: "다른 사람이 먼저 말을 걸어올 때까지 기다린다", description: "조용히 관찰하며 편안한 순간을 기다린다", dimension: "I" },
          { value: "I2", text: "아는 사람과 깊은 대화를 나누며 시간을 보낸다", description: "의미 있는 일대일 대화를 선호한다", dimension: "I" }
        ]
      },
      {
        id: 2,
        text: "스트레스를 받을 때 나는...",
        category: "E/I",
        weight: 1.1,
        options: [
          { value: "E3", text: "친구들과 대화하며 스트레스를 해소한다", description: "타인과의 소통을 통해 에너지를 얻는다", dimension: "E" },
          { value: "E4", text: "활동적인 일을 하며 기분전환한다", description: "외부 활동을 통해 스트레스를 해소한다", dimension: "E" },
          { value: "I3", text: "혼자만의 시간을 가지며 생각을 정리한다", description: "내적 성찰을 통해 문제를 해결한다", dimension: "I" },
          { value: "I4", text: "조용한 곳에서 휴식을 취한다", description: "평온한 환경에서 재충전한다", dimension: "I" }
        ]
      },
      {
        id: 3,
        text: "팀 프로젝트에서 나는...",
        category: "E/I",
        weight: 1.0,
        options: [
          { value: "E5", text: "적극적으로 의견을 제시하고 토론한다", description: "활발한 의사소통을 통해 아이디어를 발전시킨다", dimension: "E" },
          { value: "E6", text: "팀원들과의 협력 과정을 즐긴다", description: "집단 작업의 역동성과 시너지를 추구한다", dimension: "E" },
          { value: "I5", text: "충분히 생각한 후 신중하게 발언한다", description: "깊이 있는 사고를 통해 질 높은 의견을 제시한다", dimension: "I" },
          { value: "I6", text: "개별 과제를 맡아 집중적으로 작업한다", description: "독립적이고 깊이 있는 작업을 통해 기여한다", dimension: "I" }
        ]
      },
      {
        id: 4,
        text: "주말 시간을 보낼 때 나는...",
        category: "E/I",
        weight: 0.9,
        options: [
          { value: "E7", text: "친구들과 만나거나 외부 활동을 계획한다", description: "사람들과의 만남을 통해 활력을 얻는다", dimension: "E" },
          { value: "E8", text: "새로운 장소나 이벤트를 탐색한다", description: "다양한 경험과 자극을 추구한다", dimension: "E" },
          { value: "I7", text: "집에서 혼자만의 시간을 즐긴다", description: "개인적인 공간에서 재충전한다", dimension: "I" },
          { value: "I8", text: "좋아하는 취미나 독서에 집중한다", description: "깊이 있는 개인 활동을 통해 만족감을 얻는다", dimension: "I" }
        ]
      },
      {
        id: 5,
        text: "회의나 모임에서 나는...",
        category: "E/I",
        weight: 1.1,
        options: [
          { value: "E9", text: "즉석에서 아이디어를 공유하며 발전시킨다", description: "실시간 상호작용을 통해 창의성을 발휘한다", dimension: "E" },
          { value: "E10", text: "분위기를 활발하게 만들려고 노력한다", description: "그룹의 에너지를 높이는 역할을 선호한다", dimension: "E" },
          { value: "I9", text: "미리 준비한 내용을 차분히 발표한다", description: "사전 준비를 통해 완성도 높은 기여를 한다", dimension: "I" },
          { value: "I10", text: "다른 사람의 의견을 신중히 듣고 분석한다", description: "깊이 있는 경청과 사고를 통해 이해한다", dimension: "I" }
        ]
      },
      {
        id: 6,
        text: "전화통화 vs 메시지, 나는...",
        category: "E/I",
        weight: 0.8,
        options: [
          { value: "E11", text: "전화로 직접 대화하는 것을 선호한다", description: "즉각적인 상호작용과 음성 소통을 좋아한다", dimension: "E" },
          { value: "E12", text: "화상통화나 음성채팅을 즐긴다", description: "실시간 소통의 생동감을 중시한다", dimension: "E" },
          { value: "I11", text: "문자나 메신저로 소통하는 것이 편하다", description: "신중하게 생각하며 소통할 수 있어 선호한다", dimension: "I" },
          { value: "I12", text: "이메일이나 서면 소통을 선호한다", description: "정확하고 체계적인 의사전달을 중시한다", dimension: "I" }
        ]
      },

      // S/N 차원 - 6문항
      {
        id: 7,
        text: "문제를 해결할 때 나는...",
        category: "S/N",
        weight: 1.2,
        options: [
          { value: "S1", text: "구체적인 사실과 데이터를 먼저 수집한다", description: "검증된 정보를 바탕으로 체계적으로 접근한다", dimension: "S" },
          { value: "S2", text: "과거의 성공 사례와 경험을 참고한다", description: "검증된 방법과 절차를 중요하게 생각한다", dimension: "S" },
          { value: "N1", text: "직감적으로 떠오르는 아이디어를 따른다", description: "창의적이고 혁신적인 해결책을 모색한다", dimension: "N" },
          { value: "N2", text: "전체적인 맥락과 가능성에 주목한다", description: "새로운 관점과 미래 지향적 사고를 선호한다", dimension: "N" }
        ]
      },
      {
        id: 8,
        text: "새로운 정보를 접할 때 나는...",
        category: "S/N",
        weight: 1.0,
        options: [
          { value: "S3", text: "세부사항과 구체적인 내용에 집중한다", description: "정확하고 실용적인 정보를 선호한다", dimension: "S" },
          { value: "S4", text: "현실적 적용 가능성을 먼저 생각한다", description: "실제 생활에 도움이 되는 정보를 중시한다", dimension: "S" },
          { value: "N3", text: "전체적인 맥락과 의미를 파악한다", description: "큰 그림과 연관성에 관심을 갖는다", dimension: "N" },
          { value: "N4", text: "새로운 아이디어와 가능성을 탐색한다", description: "혁신적이고 창의적인 관점을 추구한다", dimension: "N" }
        ]
      },
      {
        id: 9,
        text: "학습할 때 나는...",
        category: "S/N",
        weight: 1.1,
        options: [
          { value: "S5", text: "단계별로 체계적으로 학습한다", description: "순서와 구조를 중시하는 학습 방식을 선호한다", dimension: "S" },
          { value: "S6", text: "반복 학습과 연습을 통해 숙달한다", description: "꾸준한 연습을 통한 확실한 습득을 추구한다", dimension: "S" },
          { value: "N5", text: "관심 있는 부분부터 자유롭게 탐구한다", description: "호기심과 직감에 따른 탐색적 학습을 즐긴다", dimension: "N" },
          { value: "N6", text: "이론과 개념의 연관성을 파악한다", description: "전체적인 이해와 통찰을 중시한다", dimension: "N" }
        ]
      },
      {
        id: 10,
        text: "일할 때 나는...",
        category: "S/N",
        weight: 0.9,
        options: [
          { value: "S7", text: "정확한 절차와 매뉴얼을 따른다", description: "검증된 방법을 통한 안정적인 결과를 추구한다", dimension: "S" },
          { value: "S8", text: "실무적이고 현실적인 해결책을 선호한다", description: "즉시 적용 가능한 실용적 접근을 중시한다", dimension: "S" },
          { value: "N7", text: "창의적이고 혁신적인 방법을 시도한다", description: "새로운 접근법과 실험을 통한 혁신을 추구한다", dimension: "N" },
          { value: "N8", text: "미래의 가능성과 잠재력에 투자한다", description: "장기적 비전과 변화에 대한 투자를 중시한다", dimension: "N" }
        ]
      },
      {
        id: 11,
        text: "책이나 영화를 선택할 때 나는...",
        category: "S/N",
        weight: 0.8,
        options: [
          { value: "S9", text: "현실적이고 실용적인 내용을 선호한다", description: "일상에 도움이 되는 구체적인 정보를 추구한다", dimension: "S" },
          { value: "S10", text: "검증된 작가나 평점 높은 작품을 선택한다", description: "신뢰할 수 있는 기준과 평가를 중시한다", dimension: "S" },
          { value: "N9", text: "상상력이 풍부하고 창의적인 내용을 좋아한다", description: "새로운 세계와 아이디어의 탐험을 즐긴다", dimension: "N" },
          { value: "N10", text: "철학적이거나 추상적인 주제에 관심이 많다", description: "깊이 있는 사고와 의미 탐구를 선호한다", dimension: "N" }
        ]
      },
      {
        id: 12,
        text: "여행을 계획할 때 나는...",
        category: "S/N",
        weight: 0.9,
        options: [
          { value: "S11", text: "명소와 맛집 정보를 철저히 조사한다", description: "검증된 정보를 바탕으로 확실한 경험을 추구한다", dimension: "S" },
          { value: "S12", text: "실용적이고 편리한 일정을 중시한다", description: "효율적이고 안전한 여행을 계획한다", dimension: "S" },
          { value: "N11", text: "숨겨진 장소나 특별한 경험을 찾는다", description: "독특하고 의미 있는 새로운 발견을 추구한다", dimension: "N" },
          { value: "N12", text: "문화와 역사의 깊은 의미를 탐구한다", description: "표면적 관광보다 본질적 이해를 추구한다", dimension: "N" }
        ]
      },

      // T/F 차원 - 6문항
      {
        id: 13,
        text: "의사결정을 할 때 나는...",
        category: "T/F",
        weight: 1.2,
        options: [
          { value: "T1", text: "논리적 분석과 객관적 기준을 우선한다", description: "감정보다는 합리성을 중시한다", dimension: "T" },
          { value: "T2", text: "장단점을 냉정하게 비교 분석한다", description: "효율성과 결과를 중시한다", dimension: "T" },
          { value: "F1", text: "관련된 사람들의 감정을 고려한다", description: "인간관계와 조화를 중요하게 생각한다", dimension: "F" },
          { value: "F2", text: "나의 가치관과 신념에 따라 결정한다", description: "개인적 의미와 가치를 우선시한다", dimension: "F" }
        ]
      },
      {
        id: 14,
        text: "갈등 상황에서 나는...",
        category: "T/F",
        weight: 1.1,
        options: [
          { value: "T3", text: "문제의 원인을 객관적으로 분석한다", description: "사실과 논리에 기반해 해결책을 찾는다", dimension: "T" },
          { value: "T4", text: "효율적인 해결방안을 제시한다", description: "신속하고 합리적인 결론을 중시한다", dimension: "T" },
          { value: "F3", text: "모든 사람의 입장을 이해하려고 노력한다", description: "감정과 관계를 고려한 해결을 추구한다", dimension: "F" },
          { value: "F4", text: "조화로운 분위기를 만들려고 노력한다", description: "공감과 배려를 통한 관계 회복을 중시한다", dimension: "F" }
        ]
      },
      {
        id: 15,
        text: "비판을 받을 때 나는...",
        category: "T/F",
        weight: 1.0,
        options: [
          { value: "T5", text: "객관적으로 타당한지 분석한다", description: "감정보다는 내용의 합리성을 우선 검토한다", dimension: "T" },
          { value: "T6", text: "개선할 점을 찾아 발전시킨다", description: "건설적인 피드백으로 받아들여 성장에 활용한다", dimension: "T" },
          { value: "F5", text: "상대방의 의도와 감정을 먼저 생각한다", description: "관계와 맥락을 고려하여 상황을 이해한다", dimension: "F" },
          { value: "F6", text: "감정적으로 상처받지만 이해하려 노력한다", description: "개인적 감정을 인정하면서도 관계 회복을 추구한다", dimension: "F" }
        ]
      },
      {
        id: 16,
        text: "친구의 고민 상담을 할 때 나는...",
        category: "T/F",
        weight: 1.1,
        options: [
          { value: "T7", text: "문제 해결을 위한 구체적 조언을 제공한다", description: "실용적이고 효과적인 해결책을 제시한다", dimension: "T" },
          { value: "T8", text: "객관적 관점에서 상황을 분석해준다", description: "냉정한 판단으로 명확한 시각을 제공한다", dimension: "T" },
          { value: "F7", text: "따뜻하게 공감하며 마음을 달래준다", description: "감정적 지지와 위로를 통해 힘을 준다", dimension: "F" },
          { value: "F8", text: "친구의 감정을 충분히 들어준다", description: "진심어린 경청과 이해를 통해 소통한다", dimension: "F" }
        ]
      },
      {
        id: 17,
        text: "성과 평가를 받을 때 나는...",
        category: "T/F",
        weight: 0.9,
        options: [
          { value: "T9", text: "객관적 지표와 수치에 집중한다", description: "구체적이고 측정 가능한 결과를 중시한다", dimension: "T" },
          { value: "T10", text: "논리적 근거가 있는 피드백을 선호한다", description: "합리적이고 체계적인 평가를 신뢰한다", dimension: "T" },
          { value: "F9", text: "인정과 격려의 말에 더 큰 의미를 둔다", description: "개인적 가치와 노력에 대한 인정을 중시한다", dimension: "F" },
          { value: "F10", text: "평가자와의 관계와 맥락을 고려한다", description: "평가의 인간적 측면과 의도를 중요하게 생각한다", dimension: "F" }
        ]
      },
      {
        id: 18,
        text: "영화나 책을 볼 때 나는...",
        category: "T/F",
        weight: 0.8,
        options: [
          { value: "T11", text: "스토리의 논리성과 개연성을 중시한다", description: "일관성 있고 합리적인 전개를 선호한다", dimension: "T" },
          { value: "T12", text: "객관적 비평과 분석적 관점을 좋아한다", description: "체계적이고 이성적인 평가를 추구한다", dimension: "T" },
          { value: "F11", text: "등장인물의 감정과 관계에 몰입한다", description: "인간적 드라마와 감정의 흐름에 집중한다", dimension: "F" },
          { value: "F12", text: "개인적 감동과 공감을 중요하게 생각한다", description: "내면의 울림과 감정적 연결을 추구한다", dimension: "F" }
        ]
      },

      // J/P 차원 - 6문항
      {
        id: 19,
        text: "일정 관리에 대한 나의 성향은...",
        category: "J/P",
        weight: 1.2,
        options: [
          { value: "J1", text: "미리 계획을 세우고 체계적으로 진행한다", description: "예측 가능하고 안정적인 환경을 선호한다", dimension: "J" },
          { value: "J2", text: "마감일을 엄격하게 지키려고 노력한다", description: "책임감과 완성도를 중요하게 생각한다", dimension: "J" },
          { value: "P1", text: "상황에 따라 유연하게 조절한다", description: "자발성과 즉흥성을 중시한다", dimension: "P" },
          { value: "P2", text: "여러 가지 선택지를 열어두고 싶어한다", description: "새로운 기회와 변화에 개방적이다", dimension: "P" }
        ]
      },
      {
        id: 20,
        text: "여행을 계획할 때 나는...",
        category: "J/P",
        weight: 1.0,
        options: [
          { value: "J3", text: "상세한 일정표를 미리 작성한다", description: "체계적이고 계획적인 여행을 선호한다", dimension: "J" },
          { value: "J4", text: "숙소와 교통편을 미리 예약한다", description: "안전하고 예측 가능한 여행을 추구한다", dimension: "J" },
          { value: "P3", text: "대략적인 방향만 정하고 즉흥적으로 결정한다", description: "자유롭고 유연한 여행을 즐긴다", dimension: "P" },
          { value: "P4", text: "현지에서 만나는 기회들을 즐긴다", description: "예상치 못한 경험과 모험을 선호한다", dimension: "P" }
        ]
      },
      {
        id: 21,
        text: "미래에 대한 나의 태도는...",
        category: "J/P",
        weight: 1.1,
        options: [
          { value: "J5", text: "구체적인 목표를 세우고 단계적으로 준비한다", description: "명확한 계획과 체계적인 준비를 통해 미래를 설계한다", dimension: "J" },
          { value: "J6", text: "안정적이고 예측 가능한 미래를 원한다", description: "확실성과 보장을 통한 안전한 미래를 추구한다", dimension: "J" },
          { value: "P5", text: "열린 마음으로 다양한 가능성을 받아들인다", description: "변화와 기회에 유연하게 대응할 준비를 한다", dimension: "P" },
          { value: "P6", text: "모험과 새로운 경험이 있는 미래를 기대한다", description: "역동적이고 다채로운 경험을 통한 성장을 원한다", dimension: "P" }
        ]
      },
      {
        id: 22,
        text: "업무나 과제를 진행할 때 나는...",
        category: "J/P",
        weight: 1.0,
        options: [
          { value: "J7", text: "처음부터 끝까지 순서대로 진행한다", description: "체계적이고 단계적인 접근을 선호한다", dimension: "J" },
          { value: "J8", text: "마감 전에 미리 완성하려고 한다", description: "여유를 두고 완성도를 높이는 것을 선호한다", dimension: "J" },
          { value: "P7", text: "여러 과제를 동시에 진행한다", description: "다양한 작업의 병행을 통해 효율성을 추구한다", dimension: "P" },
          { value: "P8", text: "마감이 다가와야 집중력이 높아진다", description: "압박감과 긴장감을 통해 최고의 성과를 발휘한다", dimension: "P" }
        ]
      },
      {
        id: 23,
        text: "새로운 환경에 적응할 때 나는...",
        category: "J/P",
        weight: 0.9,
        options: [
          { value: "J9", text: "규칙과 절차를 파악해서 따른다", description: "기존 체계를 이해하고 안정적으로 적응한다", dimension: "J" },
          { value: "J10", text: "계획을 세워 단계적으로 적응한다", description: "체계적인 준비를 통해 확실하게 정착한다", dimension: "J" },
          { value: "P9", text: "상황에 맞게 유연하게 대응한다", description: "변화하는 상황에 빠르게 적응하며 대처한다", dimension: "P" },
          { value: "P10", text: "새로운 방식을 시도해보며 탐색한다", description: "창의적이고 실험적인 접근을 통해 적응한다", dimension: "P" }
        ]
      },
      {
        id: 24,
        text: "방 정리나 정돈에 대한 나의 스타일은...",
        category: "J/P",
        weight: 0.8,
        options: [
          { value: "J11", text: "모든 것을 정해진 자리에 체계적으로 배치한다", description: "질서와 규칙을 통한 효율적인 공간 활용을 추구한다", dimension: "J" },
          { value: "J12", text: "깔끔하고 정돈된 환경을 유지한다", description: "정리된 공간에서 안정감과 집중력을 얻는다", dimension: "J" },
          { value: "P11", text: "필요할 때마다 임시로 정리한다", description: "상황에 따라 유연하게 공간을 활용한다", dimension: "P" },
          { value: "P12", text: "창의적 혼돈 속에서도 필요한 것을 찾는다", description: "자유로운 환경에서 창의성과 편안함을 느낀다", dimension: "P" }
        ]
      }
    ];
  }

  async getUser(id: number): Promise<any | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<any | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: any): Promise<any> {
    const id = this.currentId++;
    const user: any = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getMbtiQuestions(): Promise<MbtiQuestion[]> {
    return this.mbtiQuestions;
  }

  async saveMbtiResult(result: InsertMbtiResult): Promise<MbtiResult> {
    const id = this.currentResultId++;
    const mbtiResult: MbtiResult = { ...result, id };
    this.mbtiResults.set(result.sessionId, mbtiResult);
    return mbtiResult;
  }

  async getMbtiResult(sessionId: string): Promise<MbtiResult | undefined> {
    return this.mbtiResults.get(sessionId);
  }

  async createShareableResult(sessionId: string): Promise<string> {
    const result = this.mbtiResults.get(sessionId);
    if (!result) {
      throw new Error('Result not found');
    }
    
    const shareId = `share_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    this.sharedResults.set(shareId, sessionId);
    
    return shareId;
  }

  async getSharedResult(shareId: string): Promise<MbtiResult | undefined> {
    const sessionId = this.sharedResults.get(shareId);
    if (!sessionId) {
      return undefined;
    }
    return this.mbtiResults.get(sessionId);
  }
}

export const storage = new MemStorage();