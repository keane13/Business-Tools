import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { GoogleGenAI } from "@google/genai";
import { MessageSquare, Send, Bot, User, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function VirtualCoach() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Halo! Saya Virtual Coach AI Anda. Ada strategi bisnis apa yang ingin Anda diskusikan hari ini?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const chat = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: "You are a professional business coach and strategy consultant. Your goal is to help entrepreneurs validate ideas, refine strategies, and make better business decisions. Be concise, insightful, and practical. Respond in Indonesian.",
        }
      });

      // Simple history management for this demo
      const response = await chat.sendMessage({
        message: userMessage
      });

      setMessages(prev => [...prev, { role: "assistant", content: response.text }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: "assistant", content: "Maaf, terjadi kesalahan saat memproses permintaan Anda. Silakan coba lagi." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-none shadow-xl bg-white/80 backdrop-blur-md h-[600px] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-500">
      <CardHeader className="border-bottom bg-blue-600 text-white py-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Bot className="w-5 h-5" />
          Virtual Coach AI
          <Badge className="bg-white/20 text-white border-none text-[10px]">PRO</Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 p-0 flex flex-col overflow-hidden">
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-4">
            <AnimatePresence initial={false}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[80%] flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.role === "user" ? "bg-blue-100 text-blue-600" : "bg-purple-100 text-purple-600"
                    }`}>
                      {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user" 
                        ? "bg-blue-600 text-white rounded-tr-none" 
                        : "bg-white border border-gray-100 text-gray-800 rounded-tl-none shadow-sm"
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center animate-pulse">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="p-3 rounded-2xl bg-white border border-gray-100 text-gray-400 text-sm flex items-center gap-2">
                    <Sparkles className="w-3 h-3 animate-spin" />
                    Berpikir...
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 bg-gray-50 border-t">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tanyakan sesuatu tentang strategi bisnis Anda..."
              className="bg-white border-none shadow-sm focus-visible:ring-blue-500"
              disabled={isLoading}
            />
            <Button type="submit" size="icon" className="bg-blue-600 hover:bg-blue-700 shrink-0" disabled={isLoading}>
              <Send className="w-4 h-4" />
            </Button>
          </form>
          <p className="text-[10px] text-center text-gray-400 mt-2">
            AI dapat memberikan informasi yang tidak akurat. Verifikasi saran penting.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
