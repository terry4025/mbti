import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { mbtiSubmissionSchema } from "@shared/schema";
import { v4 as uuidv4 } from "uuid";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get MBTI questions
  app.get("/api/mbti/questions", async (req, res) => {
    try {
      const questions = await storage.getMbtiQuestions();
      res.json(questions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch questions" });
    }
  });

  // Submit MBTI test results
  app.post("/api/mbti/submit", async (req, res) => {
    try {
      const validatedData = mbtiSubmissionSchema.parse(req.body);
      
      // Get questions for weighted calculation
      const questions = await storage.getMbtiQuestions();
      
      // Initialize weighted scores for each dimension
      const weightedScores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
      const totalWeights = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
      const dimensionCounts = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

      // Create question lookup map
      const questionMap = new Map();
      questions.forEach(q => questionMap.set(q.id, q));

      // Calculate weighted scores
      validatedData.answers.forEach(answer => {
        const question = questionMap.get(answer.questionId);
        if (!question) return;

        const dimension = answer.selectedValue.charAt(0);
        if (weightedScores.hasOwnProperty(dimension)) {
          const weight = question.weight || 1;
          weightedScores[dimension as keyof typeof weightedScores] += weight;
          totalWeights[dimension as keyof typeof totalWeights] += weight;
          dimensionCounts[dimension as keyof typeof dimensionCounts]++;
        }
      });

      // Calculate normalized scores
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
      const personalityType = 
        (weightedScores.E > weightedScores.I ? 'E' : 'I') +
        (weightedScores.S > weightedScores.N ? 'S' : 'N') +
        (weightedScores.T > weightedScores.F ? 'T' : 'F') +
        (weightedScores.J > weightedScores.P ? 'J' : 'P');

      // Calculate confidence score
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

      const result = await storage.saveMbtiResult({
        sessionId: validatedData.sessionId,
        answers: validatedData.answers,
        personalityType,
        scores: { raw: weightedScores, percentages, confidence, breakdown },
        completedAt: new Date().toISOString(),
      });

      res.json({ 
        personalityType, 
        scores: result.scores,
        sessionId: validatedData.sessionId 
      });
    } catch (error) {
      console.error('Error submitting MBTI test:', error);
      res.status(400).json({ message: "Invalid submission data" });
    }
  });

  // Get MBTI result by session ID
  app.get("/api/mbti/result/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const result = await storage.getMbtiResult(sessionId);
      
      if (!result) {
        return res.status(404).json({ message: "Result not found" });
      }

      res.json(result);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch result" });
    }
  });

  // Create shareable link for MBTI result
  app.post("/api/mbti/share/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const shareId = await storage.createShareableResult(sessionId);
      
      res.json({ shareId });
    } catch (error) {
      console.error("Error creating shareable result:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Get shared MBTI result
  app.get("/api/mbti/shared/:shareId", async (req, res) => {
    try {
      const { shareId } = req.params;
      const result = await storage.getSharedResult(shareId);
      
      if (!result) {
        return res.status(404).json({ error: "Shared result not found" });
      }
      
      res.json(result);
    } catch (error) {
      console.error("Error fetching shared result:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
