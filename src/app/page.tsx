"use client";

import { motion } from "framer-motion";
import { Brain, Sparkles, Zap, ArrowRight, FileText, Upload, Search, CheckCircle, Shield, BarChart } from "lucide-react";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const particles = isClient ? [...Array(20)] : []; // Reduced from 50 to 20

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <Navbar />
      
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-50"
            animate={{
              x: [0, Math.random() * 1000 - 500],
              y: [0, Math.random() * 1000 - 500],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 15 + 15, // Slower animations
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear", // Smoother animation
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
      
      {/* Main content with padding for navbar */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-6xl mx-auto"
        >
          {/* Logo/Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 flex justify-center"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }} // Slower rotation
                className="absolute inset-0 flex items-center justify-center"
              >
                <Brain className="w-16 h-16 text-white opacity-20" />
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }} 
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} 
                className="relative"
              >
                <Sparkles className="w-16 h-16 text-white" />
              </motion.div>
            </div>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
          >
            AI Revolution
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Experience the future of artificial intelligence with cutting-edge technology and innovative solutions
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-black font-semibold rounded-full flex items-center gap-2 hover:bg-gray-200 transition-colors"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border border-white text-white font-semibold rounded-full hover:bg-white hover:text-black transition-colors"
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20 max-w-6xl w-full"
        >
          {[
            { icon: Brain, title: "Smart Learning", description: "Advanced machine learning algorithms", link: "/smart-learning" },
            { icon: Zap, title: "Lightning Fast", description: "Optimized for maximum performance", link: "/lightning-fast" },
            { icon: Sparkles, title: "Creative AI", description: "Generate amazing content instantly", link: "/creative-ai" },
            { icon: FileText, title: "Documents", description: "Enterprise document management system", link: "/documents" },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              onClick={() => window.location.href = feature.link}
              className="p-6 border border-gray-800 rounded-2xl bg-gray-900/50 backdrop-blur-sm cursor-pointer"
            >
              <motion.div
                animate={{ y: [0, -5, 0] }} // Reduced movement
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.3, ease: "easeInOut" }}
                className="mb-4"
              >
                <feature.icon className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Document Control Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-20 max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Document Management System</h2>
            <p className="text-gray-400">Enterprise-grade document control integrated with AI</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Upload, title: "Upload", desc: "Secure file upload", link: "/documents/upload" },
              { icon: CheckCircle, title: "Approvals", desc: "Multi-level workflows", link: "/approvals" },
              { icon: BarChart, title: "Audit", desc: "Complete audit trails", link: "/audit" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => window.location.href = item.link}
                className="p-6 border border-gray-800 rounded-lg bg-gray-900/50 backdrop-blur-sm cursor-pointer text-center"
              >
                <item.icon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
