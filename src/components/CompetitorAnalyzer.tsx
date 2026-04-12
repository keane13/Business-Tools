import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CompetitorAnalysis } from "@/src/services/gemini";
import { Users, ExternalLink, ShieldCheck, BarChart3, ChevronRight, Star } from "lucide-react";

interface Props {
  data: CompetitorAnalysis;
}

export default function CompetitorAnalyzer({ data }: Props) {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Competitor List */}
        <Card className="lg:col-span-8 border-none shadow-sm bg-white ring-1 ring-slate-200/60">
          <CardHeader>
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              Landscape Kompetisi
            </CardTitle>
            <CardDescription>Daftar pemain utama di industri yang sama atau relevan.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.competitors.map((competitor, i) => (
                <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-slate-50 border border-slate-100 group hover:bg-white hover:shadow-lg hover:border-blue-100 transition-all duration-300">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-lg font-black text-slate-300 group-hover:text-blue-500 group-hover:border-blue-200 transition-all">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 flex items-center gap-2">
                        {competitor.name}
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, starI) => (
                            <Star key={starI} className={`w-3 h-3 ${starI < Math.round(competitor.grading / 2) ? "fill-amber-400 text-amber-400" : "text-slate-200"}`} />
                          ))}
                        </div>
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-1 max-w-[300px]">{competitor.details}</p>
                      
                      <div className="mt-3 flex gap-4">
                        <div className="space-y-1">
                          <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-wider">Strengths</p>
                          <div className="flex flex-wrap gap-1">
                            {competitor.strengths.slice(0, 2).map((s, si) => (
                              <Badge key={si} variant="secondary" className="text-[8px] py-0 h-3 bg-emerald-50 text-emerald-700 border-emerald-100">{s}</Badge>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[9px] font-bold text-red-600 uppercase tracking-wider">Weaknesses</p>
                          <div className="flex flex-wrap gap-1">
                            {competitor.weaknesses.slice(0, 2).map((w, wi) => (
                              <Badge key={wi} variant="secondary" className="text-[8px] py-0 h-3 bg-red-50 text-red-700 border-red-100">{w}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <a 
                        href={competitor.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[10px] font-bold text-blue-500 hover:underline flex items-center gap-1 mt-3 uppercase tracking-wider"
                      >
                        <ExternalLink className="w-2.5 h-2.5" />
                        Visit Website
                      </a>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-xl border-slate-200 text-slate-500 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all">
                    Analysis
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Positioning & Confidence */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="border-none shadow-sm bg-slate-900 text-white overflow-hidden">
            <div className="h-1 bg-blue-500" />
            <CardHeader>
              <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-widest">Brand Positioning</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-6">
                <p className="text-sm text-blue-100 leading-relaxed font-medium italic">
                  "{data.brandPositioning}"
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  <span>Scientific</span>
                  <span>Lifestyle</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full relative">
                  <div className="absolute top-1/2 left-[40%] -translate-y-1/2 w-4 h-4 rounded-full bg-blue-500 border-2 border-slate-900 shadow-xl" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-blue-50 ring-1 ring-blue-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold text-blue-600 uppercase tracking-widest">Competitive Advantage</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-blue-900 font-medium leading-relaxed">
                {data.competitiveAdvantage}
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-white ring-1 ring-slate-200/60">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-widest">Differentiation Strategy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 leading-relaxed">
                {data.differentiationStrategy}
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-white ring-1 ring-slate-200/60">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-widest">Pricing Strategy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 leading-relaxed font-bold text-blue-600">
                {data.pricingStrategy}
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-white ring-1 ring-slate-200/60">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-widest">Market Gaps</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {data.marketGaps.map((gap, i) => (
                  <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    {gap}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
