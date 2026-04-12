import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MarketEstimation } from "@/src/services/gemini";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Target, TrendingUp, DollarSign, Globe, Briefcase } from "lucide-react";

interface Props {
  data: MarketEstimation;
}

export default function MarketEstimator({ data }: Props) {
  const chartData = [
    { name: "TAM", value: data.tam.value, color: "#0f172a" }, // Slate 900
    { name: "SAM", value: data.sam.value, color: "#3b82f6" }, // Blue 500
    { name: "SOM", value: data.som.value, color: "#60a5fa" }, // Blue 400
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(value);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Top Section: Visual & Key Metric */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <Card className="lg:col-span-7 border-none shadow-sm bg-white ring-1 ring-slate-200/60">
          <CardHeader>
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Market Opportunity Map
            </CardTitle>
            <CardDescription>Visualisasi potensi pasar dari skala global hingga target operasional.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[320px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={110}
                    paddingAngle={8}
                    dataKey="value"
                    stroke="none"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => formatCurrency(value)}
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Total Value</span>
                <span className="text-2xl font-black text-slate-900">{data.tam.label}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-5 space-y-6">
          <Card className="border-none shadow-sm bg-blue-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold opacity-80 uppercase tracking-widest">Target Revenue (SOM)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black mb-1">{data.som.label}</div>
              <p className="text-xs text-blue-100 leading-relaxed">
                Estimasi pendapatan yang dapat diraih dalam 1-2 tahun pertama operasional.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-white ring-1 ring-slate-200/60">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-widest">Confidence Index</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge className={
                  data.confidenceIndex === "High" ? "bg-emerald-500" :
                  data.confidenceIndex === "Medium" ? "bg-amber-500" : "bg-red-500"
                }>
                  {data.confidenceIndex} Reliability
                </Badge>
                <Target className="w-5 h-5 text-slate-200" />
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Primary Sources</p>
                <div className="flex flex-wrap gap-2">
                  {data.sources.slice(0, 2).map((s, i) => (
                    <Badge key={i} variant="outline" className="text-[10px] bg-slate-50">{s.name}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { type: "TAM", title: "Total Addressable Market", data: data.tam, icon: Globe, color: "text-slate-900 bg-slate-50" },
          { type: "SAM", title: "Serviceable Available Market", data: data.sam, icon: Briefcase, color: "text-blue-600 bg-blue-50" },
          { type: "SOM", title: "Serviceable Obtainable Market", data: data.som, icon: DollarSign, color: "text-blue-400 bg-blue-50/50" },
        ].map((item, i) => (
          <Card key={i} className="border-none shadow-sm bg-white ring-1 ring-slate-200/60 group hover:ring-blue-200 transition-all">
            <CardHeader className="pb-3">
              <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                <item.icon className="w-5 h-5" />
              </div>
              <CardTitle className="text-sm font-bold text-slate-900">{item.title}</CardTitle>
              <div className="text-xl font-black text-blue-600">{item.data.label}</div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-slate-500 leading-relaxed">
                {item.data.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Market Dynamics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-none shadow-sm bg-white ring-1 ring-slate-200/60">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Market Growth (CAGR)
            </CardTitle>
            <CardDescription>Laju pertumbuhan tahunan gabungan industri.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="text-5xl font-black text-blue-600">{data.growthRate}</div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-slate-900">Pertumbuhan Stabil</p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Pasar menunjukkan tren positif dengan adopsi teknologi yang semakin cepat di segmen target.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white ring-1 ring-slate-200/60">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Globe className="w-5 h-5 text-slate-900" />
              Key Market Trends
            </CardTitle>
            <CardDescription>Tren utama yang menggerakkan pasar saat ini.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {data.marketTrends.map((trend, i) => (
                <div key={i} className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-700 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  {trend}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Drivers & Barriers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-none shadow-sm bg-white ring-1 ring-slate-200/60">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-900">
              <Target className="w-5 h-5 text-blue-600" />
              Key Drivers
            </CardTitle>
            <CardDescription>Faktor utama yang mendorong permintaan pasar.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {data.keyDrivers.map((driver, i) => (
                <li key={i} className="text-sm text-slate-600 flex items-start gap-3 p-3 rounded-xl bg-blue-50/30 border border-blue-100/30">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  {driver}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white ring-1 ring-slate-200/60">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-900">
              <Briefcase className="w-5 h-5 text-red-600" />
              Market Barriers
            </CardTitle>
            <CardDescription>Hambatan masuk dan tantangan operasional.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {data.marketBarriers.map((barrier, i) => (
                <li key={i} className="text-sm text-slate-600 flex items-start gap-3 p-3 rounded-xl bg-red-50/30 border border-red-100/30">
                  <div className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    !
                  </div>
                  {barrier}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
