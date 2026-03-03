"use client";

import { motion } from "framer-motion";
import { Sparkles, PenTool, Image, Music, Video, Code, Palette, FileText, Download } from "lucide-react";
import { useState } from "react";
import { BackButton } from "@/components/BackButton";

export default function CreativeAI() {
  const [activeTab, setActiveTab] = useState("text");
  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const generateContent = async (type: string) => {
    setIsGenerating(true);
    setTimeout(() => {
      const samples = {
        text: "Artificial intelligence is transforming the way we create and consume content. From automated writing to intelligent design suggestions, AI tools are empowering creators to push the boundaries of their imagination.",
        image: "A futuristic cityscape at sunset with flying cars and neon lights, digital art style, highly detailed, 4K resolution",
        music: "🎵 Electronic ambient track with synth pads and gentle percussion, perfect for background music in tech presentations",
        video: "🎬 Short animated explainer video about AI technology, 30 seconds duration, modern corporate style",
        code: "// AI-powered data analysis function\nfunction analyzeData(data) {\n  const insights = data.map(item => ({\n    prediction: predict(item),\n    confidence: calculateConfidence(item)\n  }));\n  return insights;\n}"
      };
      setGeneratedContent(samples[type as keyof typeof samples] || "");
      setIsGenerating(false);
    }, 2000);
  };

  const creativeTools = [
    {
      id: "text",
      title: "Text Generation",
      icon: FileText,
      description: "AI-powered writing assistance",
      features: ["Blog posts", "Marketing copy", "Creative writing", "Code documentation"]
    },
    {
      id: "image",
      title: "Image Creation",
      icon: Image,
      description: "Generate stunning visuals",
      features: ["Digital art", "Logos & icons", "Photo editing", "Style transfer"]
    },
    {
      id: "music",
      title: "Music Composition",
      icon: Music,
      description: "Create original music",
      features: ["Background scores", "Sound effects", "Music arrangements", "Audio enhancement"]
    },
    {
      id: "video",
      title: "Video Production",
      icon: Video,
      description: "AI-assisted video creation",
      features: ["Video summaries", "Auto-editing", "Motion graphics", "Voice synthesis"]
    },
    {
      id: "code",
      title: "Code Generation",
      icon: Code,
      description: "Intelligent programming",
      features: ["Code completion", "Bug detection", "Documentation", "Test generation"]
    },
    {
      id: "design",
      title: "Design Tools",
      icon: Palette,
      description: "Creative design assistance",
      features: ["UI layouts", "Color schemes", "Typography", "Brand assets"]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-50">
        <BackButton />
      </div>
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-pink-900/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="inline-block mb-6"
            >
              <Sparkles className="w-16 h-16 text-purple-400" />
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Creative AI
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Generate amazing content instantly with our suite of AI-powered creative tools
            </p>
          </motion.div>
        </div>
      </section>

      {/* Creative Tools Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Creative Tools Suite</h2>
            <p className="text-gray-400">Choose your creative medium and let AI inspire you</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {creativeTools.map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                onClick={() => setActiveTab(tool.id)}
                className={`p-6 border rounded-2xl cursor-pointer transition-all ${
                  activeTab === tool.id 
                    ? "border-purple-500 bg-purple-900/20" 
                    : "border-gray-800 bg-gray-900/50"
                }`}
              >
                <tool.icon className={`w-8 h-8 mb-4 ${
                  activeTab === tool.id ? "text-purple-400" : "text-gray-400"
                }`} />
                <h3 className="text-xl font-bold mb-2">{tool.title}</h3>
                <p className="text-gray-400 mb-4">{tool.description}</p>
                <div className="flex flex-wrap gap-2">
                  {tool.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-2 py-1 bg-gray-800 rounded-full text-xs text-gray-300"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Generator */}
      <section className="py-20 bg-gradient-to-b from-transparent to-purple-900/10">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Try It Now</h2>
            <p className="text-gray-400">Experience AI content generation in real-time</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8"
          >
            {/* Tab Navigation */}
            <div className="flex gap-2 mb-6 overflow-x-auto">
              {creativeTools.slice(0, 5).map((tool) => (
                <motion.button
                  key={tool.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(tool.id)}
                  className={`px-4 py-2 rounded-full transition-colors whitespace-nowrap ${
                    activeTab === tool.id
                      ? "bg-purple-500 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <tool.icon className="w-4 h-4 inline mr-2" />
                  {tool.title}
                </motion.button>
              ))}
            </div>

            {/* Generator Interface */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Prompt or Description</label>
                <textarea
                  className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg resize-none h-24 focus:border-purple-500 focus:outline-none"
                  placeholder={`Describe what you want to create...`}
                  defaultValue={activeTab === "text" ? "Write about artificial intelligence" :
                               activeTab === "image" ? "A futuristic city at sunset" :
                               activeTab === "music" ? "Ambient electronic music" :
                               activeTab === "video" ? "Tech explainer video" :
                               "React component for data visualization"}
                />
              </div>

              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => generateContent(activeTab)}
                  disabled={isGenerating}
                  className="flex-1 px-6 py-3 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                      />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 inline mr-2" />
                      Generate Content
                    </>
                  )}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Download className="w-4 h-4 inline mr-2" />
                  Export
                </motion.button>
              </div>

              {/* Generated Content Display */}
              {generatedContent && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-800 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold">Generated Result</h4>
                    <span className="text-xs text-gray-400">AI Generated</span>
                  </div>
                  <div className="text-gray-300 whitespace-pre-wrap">
                    {generatedContent}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Real-World Applications</h2>
            <p className="text-gray-400">See how creators are using our AI tools</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Content Marketing",
                description: "Generate blog posts and social media content",
                icon: PenTool,
                users: "2.5K+"
              },
              {
                title: "Digital Art",
                description: "Create stunning visuals and illustrations",
                icon: Image,
                users: "5.1K+"
              },
              {
                title: "Video Production",
                description: "Produce engaging video content quickly",
                icon: Video,
                users: "1.8K+"
              },
              {
                title: "Software Development",
                description: "Accelerate coding with AI assistance",
                icon: Code,
                users: "3.2K+"
              }
            ].map(useCase => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 text-center"
              >
                <useCase.icon className="w-8 h-8 text-purple-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2">{useCase.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{useCase.description}</p>
                <span className="text-purple-400 text-sm font-semibold">{useCase.users} users</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Gallery */}
      <section className="py-20 bg-gradient-to-b from-transparent to-pink-900/10">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Template Gallery</h2>
            <p className="text-gray-400">Start with professionally designed templates</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Business Proposal", type: "Document", uses: "1.2K" },
              { name: "Social Media Post", type: "Image", uses: "3.5K" },
              { name: "Presentation Slide", type: "Design", uses: "2.8K" },
              { name: "Email Newsletter", type: "Text", uses: "1.9K" },
              { name: "Logo Design", type: "Image", uses: "4.1K" },
              { name: "Video Intro", type: "Video", uses: "892" }
            ].map((template, index) => (
              <motion.div
                key={template.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden cursor-pointer"
              >
                <div className="h-32 bg-gradient-to-br from-purple-800/20 to-pink-800/20 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-purple-400" />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold mb-1">{template.name}</h4>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>{template.type}</span>
                    <span>{template.uses} uses</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
