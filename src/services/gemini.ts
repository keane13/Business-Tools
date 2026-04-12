import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface IdeaValidation {
  researchSummary: string;
  problemFrequency: "RENDAH" | "SEDANG" | "TINGGI";
  feasibilityScore: number;
  affectedSegments: {
    name: string;
    percentage: number;
    characteristics: string;
  }[];
  swot: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  monetizationModels: string[];
  riskAnalysis: string;
  nextSteps: string[];
  confidenceIndex: "Low" | "Medium" | "High";
  sources: { name: string; url: string }[];
}

export interface MarketEstimation {
  tam: { value: number; label: string; description: string };
  sam: { value: number; label: string; description: string };
  som: { value: number; label: string; description: string };
  growthRate: string;
  marketTrends: string[];
  keyDrivers: string[];
  marketBarriers: string[];
  confidenceIndex: "Low" | "Medium" | "High";
  sources: { name: string; url: string }[];
}

export interface Competitor {
  name: string;
  url: string;
  grading: number;
  details: string;
  strengths: string[];
  weaknesses: string[];
}

export interface CompetitorAnalysis {
  competitors: Competitor[];
  brandPositioning: string;
  competitiveAdvantage: string;
  differentiationStrategy: string;
  pricingStrategy: string;
  marketGaps: string[];
  confidenceIndex: "Low" | "Medium" | "High";
}

export const validateIdea = async (idea: string): Promise<IdeaValidation> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Validate this business idea: "${idea}". Provide a detailed analysis in Indonesian for the summary, but keep the structure as requested. Include SWOT analysis, monetization models, risk analysis, and recommended next steps.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          researchSummary: { type: Type.STRING },
          problemFrequency: { type: Type.STRING, enum: ["RENDAH", "SEDANG", "TINGGI"] },
          feasibilityScore: { type: Type.NUMBER },
          affectedSegments: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                percentage: { type: Type.NUMBER },
                characteristics: { type: Type.STRING },
              },
              required: ["name", "percentage", "characteristics"],
            },
          },
          swot: {
            type: Type.OBJECT,
            properties: {
              strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
              weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
              opportunities: { type: Type.ARRAY, items: { type: Type.STRING } },
              threats: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ["strengths", "weaknesses", "opportunities", "threats"],
          },
          monetizationModels: { type: Type.ARRAY, items: { type: Type.STRING } },
          riskAnalysis: { type: Type.STRING },
          nextSteps: { type: Type.ARRAY, items: { type: Type.STRING } },
          confidenceIndex: { type: Type.STRING, enum: ["Low", "Medium", "High"] },
          sources: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                url: { type: Type.STRING },
              },
              required: ["name", "url"],
            },
          },
        },
        required: ["researchSummary", "problemFrequency", "feasibilityScore", "affectedSegments", "swot", "monetizationModels", "riskAnalysis", "nextSteps", "confidenceIndex", "sources"],
      },
    },
  });

  return JSON.parse(response.text);
};

export const estimateMarket = async (idea: string): Promise<MarketEstimation> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Estimate the market size (TAM, SAM, SOM) for this business idea: "${idea}". Provide values in IDR (Rupiah) or relevant currency. Include market growth rate (CAGR), key market trends, key drivers, and market barriers.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          tam: {
            type: Type.OBJECT,
            properties: {
              value: { type: Type.NUMBER },
              label: { type: Type.STRING },
              description: { type: Type.STRING },
            },
            required: ["value", "label", "description"],
          },
          sam: {
            type: Type.OBJECT,
            properties: {
              value: { type: Type.NUMBER },
              label: { type: Type.STRING },
              description: { type: Type.STRING },
            },
            required: ["value", "label", "description"],
          },
          som: {
            type: Type.OBJECT,
            properties: {
              value: { type: Type.NUMBER },
              label: { type: Type.STRING },
              description: { type: Type.STRING },
            },
            required: ["value", "label", "description"],
          },
          growthRate: { type: Type.STRING },
          marketTrends: { type: Type.ARRAY, items: { type: Type.STRING } },
          keyDrivers: { type: Type.ARRAY, items: { type: Type.STRING } },
          marketBarriers: { type: Type.ARRAY, items: { type: Type.STRING } },
          confidenceIndex: { type: Type.STRING, enum: ["Low", "Medium", "High"] },
          sources: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                url: { type: Type.STRING },
              },
              required: ["name", "url"],
            },
          },
        },
        required: ["tam", "sam", "som", "growthRate", "marketTrends", "keyDrivers", "marketBarriers", "confidenceIndex", "sources"],
      },
    },
  });

  return JSON.parse(response.text);
};

export const analyzeCompetitors = async (idea: string): Promise<CompetitorAnalysis> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze main competitors for this business idea: "${idea}". Include their strengths, weaknesses, our competitive advantage, differentiation strategy, pricing strategy, and identified market gaps.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          competitors: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                url: { type: Type.STRING },
                grading: { type: Type.NUMBER },
                details: { type: Type.STRING },
                strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
                weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
              required: ["name", "url", "grading", "details", "strengths", "weaknesses"],
            },
          },
          brandPositioning: { type: Type.STRING },
          competitiveAdvantage: { type: Type.STRING },
          differentiationStrategy: { type: Type.STRING },
          pricingStrategy: { type: Type.STRING },
          marketGaps: { type: Type.ARRAY, items: { type: Type.STRING } },
          confidenceIndex: { type: Type.STRING, enum: ["Low", "Medium", "High"] },
        },
        required: ["competitors", "brandPositioning", "competitiveAdvantage", "differentiationStrategy", "pricingStrategy", "marketGaps", "confidenceIndex"],
      },
    },
  });

  return JSON.parse(response.text);
};
