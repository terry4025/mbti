import type { MbtiAnswer } from "@shared/schema";

export interface MbtiScores {
  raw: Record<string, number>;
  percentages: Record<string, number>;
  confidence: number;
  breakdown: Record<string, { score: number; weight: number; total: number }>;
}

export interface MbtiQuestion {
  id: number;
  text: string;
  category: string;
  weight: number;
  options: Array<{
    value: string;
    text: string;
    description: string;
    dimension: string;
  }>;
}

export function calculateMbtiType(answers: MbtiAnswer[], questions: MbtiQuestion[]): { type: string; scores: MbtiScores } {
  // Initialize weighted scores for each dimension
  const weightedScores = {
    E: 0, I: 0,
    S: 0, N: 0,
    T: 0, F: 0,
    J: 0, P: 0
  };

  const totalWeights = {
    E: 0, I: 0,
    S: 0, N: 0,
    T: 0, F: 0,
    J: 0, P: 0
  };

  const dimensionCounts = {
    E: 0, I: 0,
    S: 0, N: 0,
    T: 0, F: 0,
    J: 0, P: 0
  };

  // Create question lookup map
  const questionMap = new Map<number, MbtiQuestion>();
  questions.forEach(q => questionMap.set(q.id, q));

  // Calculate weighted scores
  answers.forEach(answer => {
    const question = questionMap.get(answer.questionId);
    if (!question) return;

    const dimension = answer.selectedValue.charAt(0) as keyof typeof weightedScores;
    if (weightedScores.hasOwnProperty(dimension)) {
      const weight = question.weight || 1;
      weightedScores[dimension] += weight;
      totalWeights[dimension] += weight;
      dimensionCounts[dimension]++;
    }
  });

  // Calculate normalized scores (0-1 scale)
  const normalizedScores = {
    E: totalWeights.E > 0 ? weightedScores.E / totalWeights.E : 0,
    I: totalWeights.I > 0 ? weightedScores.I / totalWeights.I : 0,
    S: totalWeights.S > 0 ? weightedScores.S / totalWeights.S : 0,
    N: totalWeights.N > 0 ? weightedScores.N / totalWeights.N : 0,
    T: totalWeights.T > 0 ? weightedScores.T / totalWeights.T : 0,
    F: totalWeights.F > 0 ? weightedScores.F / totalWeights.F : 0,
    J: totalWeights.J > 0 ? weightedScores.J / totalWeights.J : 0,
    P: totalWeights.P > 0 ? weightedScores.P / totalWeights.P : 0
  };

  // Calculate actual percentages based on dimension pairs
  const percentages = {
    E: Math.round((weightedScores.E / (weightedScores.E + weightedScores.I)) * 100),
    S: Math.round((weightedScores.S / (weightedScores.S + weightedScores.N)) * 100),
    T: Math.round((weightedScores.T / (weightedScores.T + weightedScores.F)) * 100),
    J: Math.round((weightedScores.J / (weightedScores.J + weightedScores.P)) * 100),
  };

  // Determine personality type based on the same weighted scores used for percentages
  const type = [
    (weightedScores.E > weightedScores.I ? 'E' : 'I'),
    (weightedScores.S > weightedScores.N ? 'S' : 'N'),
    (weightedScores.T > weightedScores.F ? 'T' : 'F'),
    (weightedScores.J > weightedScores.P ? 'J' : 'P')
  ].join('');

  // Calculate overall confidence score
  const confidenceScores = [
    Math.abs(normalizedScores.E - normalizedScores.I),
    Math.abs(normalizedScores.S - normalizedScores.N),
    Math.abs(normalizedScores.T - normalizedScores.F),
    Math.abs(normalizedScores.J - normalizedScores.P)
  ];
  const confidence = Math.round(confidenceScores.reduce((sum, score) => sum + score, 0) / 4 * 100);

  // Create detailed breakdown
  const breakdown = {
    E: { score: weightedScores.E, weight: totalWeights.E, total: dimensionCounts.E },
    I: { score: weightedScores.I, weight: totalWeights.I, total: dimensionCounts.I },
    S: { score: weightedScores.S, weight: totalWeights.S, total: dimensionCounts.S },
    N: { score: weightedScores.N, weight: totalWeights.N, total: dimensionCounts.N },
    T: { score: weightedScores.T, weight: totalWeights.T, total: dimensionCounts.T },
    F: { score: weightedScores.F, weight: totalWeights.F, total: dimensionCounts.F },
    J: { score: weightedScores.J, weight: totalWeights.J, total: dimensionCounts.J },
    P: { score: weightedScores.P, weight: totalWeights.P, total: dimensionCounts.P }
  };

  return {
    type,
    scores: {
      raw: weightedScores,
      percentages,
      confidence,
      breakdown
    }
  };
}
