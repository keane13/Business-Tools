import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IdeaValidation } from "@/src/services/gemini";
import { Info, Users, Target, Activity, CheckCircle2, AlertCircle, HelpCircle, Rocket } from "lucide-react";
import { motion } from "motion/react";

interface Props {
  data: IdeaValidation;
}

export default function IdeaValidator({ data }: Props) {
  const getFrequencyColor = (freq: string) => {
    switch (freq) {
      case "TINGGI": return "text-red-600 bg-red-50 border-red-100";
      case "SEDANG": return "text-amber-600 bg-amber-50 border-amber-100";
      case "RENDAH": return "text-emerald-600 bg-emerald-50 border-emerald-100";
      default: return "text-slate-600 bg-slate-50 border-slate-100";
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Top Row: Summary & Key Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <Card className="lg:col-span-8 border-none shadow-sm bg-white ring-1 ring-slate-200/60">
          <CardHeader>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="text-[10px] uppercase tracking-wider font-bold text-blue-600 border-blue-200 bg-blue-50/50">Executive Summary</Badge>
            </div>
            <CardTitle className="text-2xl font-bold text-slate-900">Analisis Validasi Ide</CardTitle>
            <CardDescription className="text-slate-500">Ringkasan temuan berdasarkan data pasar dan tren industri terkini.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-slate-700 leading-relaxed text-lg font-medium italic border-l-4 border-blue-500 pl-6 py-2 bg-slate-50/50 rounded-r-xl">
              {data.researchSummary}
            </p>
          </CardContent>
        </Card>

        <div className="lg:col-span-4 space-y-6">
          <Card className="border-none shadow-sm bg-white ring-1 ring-slate-200/60 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-widest">Feasibility Score</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-4">
              <div className="text-5xl font-black text-slate-900 mb-1">{data.feasibilityScore}<span className="text-lg text-slate-300">/100</span></div>
              <div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${data.feasibilityScore}%` }}
                  className="h-full bg-blue-600"
                />
              </div>
              <p className="text-[10px] text-slate-400 mt-3 font-medium">Potensi keberhasilan implementasi</p>
            </CardContent>
          </Card>

          <Card className={`border-none shadow-sm ring-1 ring-slate-200/60 ${getFrequencyColor(data.problemFrequency)}`}>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold opacity-60 uppercase tracking-widest">Market Urgency</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between py-2">
              <span className="text-2xl font-black">{data.problemFrequency}</span>
              <Activity className="w-8 h-8 opacity-20" />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Middle Row: Segments */}
      <Card className="border-none shadow-sm bg-white ring-1 ring-slate-200/60">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-bold text-slate-900">
            <Users className="w-5 h-5 text-blue-600" />
            Target Segmentasi Pasar
          </CardTitle>
          <CardDescription>Kelompok pengguna yang paling terdampak oleh masalah ini.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.affectedSegments.map((segment, i) => (
              <div key={i} className="group p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-md hover:border-blue-100 transition-all duration-300">
                <div className="flex justify-between items-start mb-3">
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{segment.name}</h4>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-tighter">Primary Target</p>
                  </div>
                  <div className="text-2xl font-black text-slate-300 group-hover:text-blue-500/20 transition-colors">
                    {segment.percentage}%
                  </div>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{segment.characteristics}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* SWOT Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-none shadow-sm bg-white ring-1 ring-slate-200/60">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              Strengths & Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Strengths</h4>
              <ul className="space-y-2">
                {data.swot.strengths.map((s, i) => (
                  <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Opportunities</h4>
              <ul className="space-y-2">
                {data.swot.opportunities.map((o, i) => (
                  <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white ring-1 ring-slate-200/60">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              Weaknesses & Threats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Weaknesses</h4>
              <ul className="space-y-2">
                {data.swot.weaknesses.map((w, i) => (
                  <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Threats</h4>
              <ul className="space-y-2">
                {data.swot.threats.map((t, i) => (
                  <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Next Steps */}
      <Card className="border-none shadow-sm bg-blue-50 ring-1 ring-blue-100">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-blue-900 flex items-center gap-2">
            <Rocket className="w-6 h-6 text-blue-600" />
            Recommended Next Steps
          </CardTitle>
          <CardDescription className="text-blue-700/70">Langkah strategis untuk mengeksekusi ide ini.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.nextSteps.map((step, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-blue-100 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">
                  {i + 1}
                </div>
                <p className="text-sm text-slate-700 font-medium">{step}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monetization & Risk */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-none shadow-sm bg-white ring-1 ring-slate-200/60">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-900">
              <Activity className="w-5 h-5 text-emerald-600" />
              Monetization Models
            </CardTitle>
            <CardDescription>Bagaimana bisnis ini akan menghasilkan pendapatan.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {data.monetizationModels.map((model, i) => (
                <Badge key={i} className="bg-emerald-50 text-emerald-700 border-emerald-100 px-3 py-1.5 rounded-lg text-xs font-bold">
                  {model}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white ring-1 ring-slate-200/60">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-900">
              <AlertCircle className="w-5 h-5 text-red-600" />
              Risk Analysis
            </CardTitle>
            <CardDescription>Hambatan dan risiko utama yang perlu diantisipasi.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600 leading-relaxed bg-red-50/50 p-4 rounded-xl border border-red-100/50">
              {data.riskAnalysis}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row: Confidence & Sources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-none shadow-sm bg-slate-900 text-white overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-bold">
              <Target className="w-5 h-5 text-blue-400" />
              Confidence Index
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              <div className="text-4xl font-black text-blue-400">{data.confidenceIndex}</div>
              <div className="h-10 w-px bg-white/10" />
              <p className="text-xs text-slate-400 leading-relaxed">
                Tingkat akurasi data berdasarkan ketersediaan informasi pasar saat ini.
              </p>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`h-1.5 flex-1 rounded-full ${
                  (data.confidenceIndex === "High") || 
                  (data.confidenceIndex === "Medium" && i <= 2) || 
                  (data.confidenceIndex === "Low" && i === 1) 
                  ? "bg-blue-500" : "bg-white/10"
                }`} />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white ring-1 ring-slate-200/60">
          <CardHeader>
            <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-widest">Data References</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.sources.map((source, i) => (
                <a
                  key={i}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-100 transition-all group"
                >
                  <span className="text-xs font-semibold text-slate-700 group-hover:text-blue-700">{source.name}</span>
                  <CheckCircle2 className="w-4 h-4 text-slate-300 group-hover:text-blue-500" />
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
