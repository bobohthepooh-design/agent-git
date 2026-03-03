"use client";

import { motion } from "framer-motion";
import { Brain, BookOpen, Target, Zap, Award, TrendingUp } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { BackButton } from "@/components/BackButton";

export default function SmartLearning() {
  const [selectedPath, setSelectedPath] = useState("");
  const [quizScore, setQuizScore] = useState(0);

  const learningPaths = [
    { 
      id: "ml-basics", 
      title: "Machine Learning Fundamentals", 
      difficulty: "Beginner",
      duration: "4 weeks",
      modules: 12
    },
    { 
      id: "deep-learning", 
      title: "Deep Learning & Neural Networks", 
      difficulty: "Intermediate",
      duration: "6 weeks", 
      modules: 18
    },
    { 
      id: "nlp", 
      title: "Natural Language Processing", 
      difficulty: "Advanced",
      duration: "8 weeks",
      modules: 24
    }
  ];

  const quizQuestions = [
    { question: "What is overfitting in ML?", options: ["Good performance", "Too complex model", "Perfect model", "Simple model"] },
    { question: "What does CNN stand for?", options: ["Computer Network", "Convolutional Neural Network", "Central Network", "Cloud Network"] }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-50">
        <BackButton />
      </div>
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="inline-block mb-6"
            >
              <Brain className="w-16 h-16 text-blue-400" />
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Smart Learning
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              AI-powered personalized learning paths that adapt to your progress and learning style
            </p>
          </motion.div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Personalized Learning Paths</h2>
            <p className="text-gray-400">Choose your journey and let AI guide your progress</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {learningPaths.map((path, index) => (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className={`p-6 border rounded-2xl cursor-pointer transition-all ${
                  selectedPath === path.id 
                    ? "border-blue-500 bg-blue-900/20" 
                    : "border-gray-800 bg-gray-900/50"
                }`}
                onClick={() => setSelectedPath(path.id)}
              >
                <BookOpen className="w-8 h-8 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">{path.title}</h3>
                <div className="flex gap-4 text-sm text-gray-400 mb-4">
                  <span>{path.difficulty}</span>
                  <span>•</span>
                  <span>{path.duration}</span>
                  <span>•</span>
                  <span>{path.modules} modules</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: path.id === "ml-basics" ? "65%" : path.id === "deep-learning" ? "30%" : "0%" }}
                    className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full"
                  />
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  {path.id === "ml-basics" ? "65% Complete" : path.id === "deep-learning" ? "30% Complete" : "Not Started"}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Tutor Section */}
      <section className="py-20 bg-gradient-to-b from-transparent to-purple-900/10">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">AI Tutor Assistant</h2>
            <p className="text-gray-400">Get instant help and explanations from your AI tutor</p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <Brain className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-300">
                    Hello! I'm your AI tutor. I can help explain complex concepts, answer questions, 
                    and provide personalized guidance. What would you like to learn about today?
                  </p>
                </div>
              </div>
              
              <div className="flex gap-2 flex-wrap">
                {["Explain neural networks", "Help with Python", "ML algorithms", "Math basics"].map((prompt) => (
                  <motion.button
                    key={prompt}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-gray-800 rounded-full text-sm hover:bg-gray-700 transition-colors"
                  >
                    {prompt}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Adaptive Quiz */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Adaptive Assessment</h2>
            <p className="text-gray-400">Quizzes that adapt to your skill level</p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-gray-800 rounded-2xl p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Quick Assessment</h3>
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-400" />
                  <span className="text-blue-400">Score: {quizScore}</span>
                </div>
              </div>

              {quizQuestions.map((q, index) => (
                <div key={index} className="mb-6">
                  <p className="mb-3">{index + 1}. {q.question}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {q.options.map((option) => (
                      <motion.button
                        key={option}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setQuizScore(quizScore + (option.includes("Neural") || option.includes("complex") ? 1 : 0))}
                        className="p-3 bg-gray-800 rounded-lg text-left hover:bg-gray-700 transition-colors"
                      >
                        {option}
                      </motion.button>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Progress Tracking */}
      <section className="py-20 bg-gradient-to-b from-transparent to-blue-900/10">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Your Progress</h2>
            <p className="text-gray-400">Track your learning journey</p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Award, label: "Achievements", value: "12", color: "text-yellow-400" },
              { icon: TrendingUp, label: "Learning Streak", value: "7 days", color: "text-green-400" },
              { icon: Target, label: "Quiz Average", value: "85%", color: "text-blue-400" },
              { icon: Zap, label: "XP Points", value: "2,450", color: "text-purple-400" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 text-center"
              >
                <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl font-bold mb-6">Start Your Learning Journey</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of learners advancing their AI skills with personalized guidance
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition-colors"
                >
                  Get Started Free
                </motion.button>
              </Link>
              <Link href="/creative-ai">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border border-gray-600 text-white font-semibold rounded-full hover:bg-gray-800 transition-colors"
                >
                  Explore Features
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
