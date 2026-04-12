import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  validateIdea, 
  estimateMarket, 
  analyzeCompetitors,
  IdeaValidation,
  MarketEstimation,
  CompetitorAnalysis
} from "@/src/services/gemini";
import IdeaValidator from "./IdeaValidator";
import MarketEstimator from "./MarketEstimator";
import CompetitorAnalyzer from "./CompetitorAnalyzer";
import VirtualCoach from "./VirtualCoach";
import { 
  Search, 
  Lightbulb, 
  LineChart, 
  Users, 
  MessageSquare, 
  Loader2,
  Rocket,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Dashboard() {
  const [idea, setIdea] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{
    validation?: IdeaValidation;
    market?: MarketEstimation;
    competitors?: CompetitorAnalysis;
  }>({});
  const [activeTab, setActiveTab] = useState("validation");

  const handleAnalyze = async () => {
    if (!idea.trim()) return;
    setIsLoading(true);
    try {
      const [validation, market, competitors] = await Promise.all([
        validateIdea(idea),
        estimateMarket(idea),
        analyzeCompetitors(idea)
      ]);
      setResults({ validation, market, competitors });
    } catch (error) {
      console.error("Analysis error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-blue-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 backdrop-blur-md bg-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">Strategi<span className="text-blue-600">AI</span></span>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-100">Beta Access</Badge>
            <div className="w-8 h-8 rounded-full bg-slate-200" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero / Input Section */}
        <section className="mb-12 text-center max-w-3xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight"
          >
            AI business tools di setiap <span className="text-blue-600">tahap bisnis</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 mb-8"
          >
            Gunakan AI untuk menentukan market, ide bisnis, pricing, dan validasi keputusan secara instan.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative flex gap-2 p-2 bg-white rounded-2xl shadow-xl border border-slate-200">
              <div className="flex-1 flex items-center px-4">
                <Search className="w-5 h-5 text-slate-400 mr-3" />
                <Input 
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  placeholder="Masukkan ide bisnis Anda (misal: Aplikasi diet bebas gluten)..." 
                  className="border-none focus-visible:ring-0 text-lg p-0 h-auto placeholder:text-slate-400"
                  onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                />
              </div>
              <Button 
                onClick={handleAnalyze} 
                disabled={isLoading || !idea}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 h-12 rounded-xl font-semibold transition-all hover:shadow-lg active:scale-95"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Menganalisis...
                  </>
                ) : (
                  <>
                    Analisis Sekarang
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        </section>

        {/* Results Section */}
        <AnimatePresence mode="wait">
          {results.validation ? (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full"
            >
              <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-full md:w-64 shrink-0 sticky top-24">
                  <TabsList className="flex flex-col h-auto bg-white p-2 rounded-2xl border border-slate-200 shadow-sm w-full">
                    <TabsTrigger value="validation" className="w-full justify-start rounded-xl px-4 py-3 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 transition-all text-left">
                      <Lightbulb className="w-4 h-4 mr-3" />
                      Idea Validation
                    </TabsTrigger>
                    <TabsTrigger value="market" className="w-full justify-start rounded-xl px-4 py-3 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 transition-all text-left">
                      <LineChart className="w-4 h-4 mr-3" />
                      Market Size
                    </TabsTrigger>
                    <TabsTrigger value="competitors" className="w-full justify-start rounded-xl px-4 py-3 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 transition-all text-left">
                      <Users className="w-4 h-4 mr-3" />
                      Competitors
                    </TabsTrigger>
                    <TabsTrigger value="coach" className="w-full justify-start rounded-xl px-4 py-3 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 transition-all text-left">
                      <MessageSquare className="w-4 h-4 mr-3" />
                      Virtual Coach
                    </TabsTrigger>
                  </TabsList>

                  <Card className="mt-6 border-none shadow-sm bg-blue-600 text-white p-4 rounded-2xl">
                    <p className="text-xs font-bold opacity-80 uppercase tracking-widest mb-2">Current Idea</p>
                    <p className="text-sm font-medium line-clamp-3 leading-relaxed opacity-90">
                      {idea}
                    </p>
                  </Card>
                </div>

                <div className="flex-1 w-full min-w-0">
                  <TabsContent value="validation" className="mt-0 focus-visible:ring-0">
                    <IdeaValidator data={results.validation} />
                  </TabsContent>
                  <TabsContent value="market" className="mt-0 focus-visible:ring-0">
                    <MarketEstimator data={results.market!} />
                  </TabsContent>
                  <TabsContent value="competitors" className="mt-0 focus-visible:ring-0">
                    <CompetitorAnalyzer data={results.competitors!} />
                  </TabsContent>
                  <TabsContent value="coach" className="mt-0 focus-visible:ring-0">
                    <VirtualCoach />
                  </TabsContent>
                </div>
              </Tabs>
            </motion.div>
          ) : (
            <motion.div 
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
            >
              {[
                { title: "AI Tools", desc: "Validasi ide bisnis dan penentuan market secara instan.", icon: Lightbulb, color: "bg-blue-50 text-blue-600" },
                { title: "Virtual Coach", desc: "Konsultasi strategi dan diskusi pengambilan keputusan.", icon: MessageSquare, color: "bg-purple-50 text-purple-600" },
                { title: "Lifetime Access", desc: "Sekali daftar bisa digunakan kapan saja selamanya.", icon: CheckCircle2, color: "bg-emerald-50 text-emerald-600" }
              ].map((feature, i) => (
                <Card key={i} className="border-none shadow-sm bg-white/50 backdrop-blur-sm hover:shadow-md transition-shadow">
                  <CardContent className="pt-8 pb-8 flex flex-col items-center text-center">
                    <div className={`w-12 h-12 ${feature.color} rounded-2xl flex items-center justify-center mb-4`}>
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-200 py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400 text-sm">© 2026 StrategiAI. Powered by Google Gemini.</p>
        </div>
      </footer>
    </div>
  );
}
