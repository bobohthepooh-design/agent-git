"use client";

import { motion } from "framer-motion";
import { Zap, Activity, Gauge, Cpu, Server, Wifi, Rocket, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import { BackButton } from "@/components/BackButton";

export default function LightningFast() {
  const [cpuUsage, setCpuUsage] = useState(45);
  const [responseTime, setResponseTime] = useState(120);
  const [throughput, setThroughput] = useState(8500);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(prev => Math.max(20, Math.min(80, prev + (Math.random() - 0.5) * 10)));
      setResponseTime(prev => Math.max(80, Math.min(200, prev + (Math.random() - 0.5) * 20)));
      setThroughput(prev => Math.max(7000, Math.min(10000, prev + (Math.random() - 0.5) * 500)));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const performanceMetrics = [
    { 
      label: "CPU Usage", 
      value: `${cpuUsage}%`, 
      icon: Cpu, 
      color: cpuUsage > 70 ? "text-red-400" : cpuUsage > 50 ? "text-yellow-400" : "text-green-400",
      trend: cpuUsage > 50 ? "up" : "down"
    },
    { 
      label: "Response Time", 
      value: `${responseTime}ms`, 
      icon: Gauge, 
      color: responseTime < 100 ? "text-green-400" : responseTime < 150 ? "text-yellow-400" : "text-red-400",
      trend: responseTime < 120 ? "down" : "up"
    },
    { 
      label: "Throughput", 
      value: `${(throughput/1000).toFixed(1)}k/s`, 
      icon: Activity, 
      color: "text-blue-400",
      trend: "up"
    },
    { 
      label: "Server Load", 
      value: "32%", 
      icon: Server, 
      color: "text-green-400",
      trend: "down"
    }
  ];

  const optimizationFeatures = [
    {
      title: "Real-time Processing",
      description: "Process data and get results instantly with our optimized AI models",
      icon: Zap,
      speed: "< 50ms",
      status: "active"
    },
    {
      title: "Edge Computing",
      description: "Run AI models directly on user devices for faster responses",
      icon: Wifi,
      speed: "< 10ms",
      status: "active"
    },
    {
      title: "GPU Acceleration",
      description: "Leverage high-performance GPUs for parallel processing",
      icon: Cpu,
      speed: "10x faster",
      status: "active"
    },
    {
      title: "Model Optimization",
      description: "Lightweight models that maintain accuracy while improving speed",
      icon: Rocket,
      speed: "5x smaller",
      status: "beta"
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
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/20 to-orange-900/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="inline-block mb-6"
            >
              <Zap className="w-16 h-16 text-yellow-400" />
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Lightning Fast
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience AI processing at unprecedented speeds with our optimized infrastructure
            </p>
          </motion.div>
        </div>
      </section>

      {/* Live Performance Dashboard */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Live Performance Dashboard</h2>
            <p className="text-gray-400">Real-time metrics from our AI infrastructure</p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {performanceMetrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <metric.icon className={`w-6 h-6 ${metric.color}`} />
                  <motion.div
                    animate={{ rotate: metric.trend === "up" ? 180 : 0 }}
                    className="text-gray-400"
                  >
                    <TrendingUp className="w-4 h-4" />
                  </motion.div>
                </div>
                <div className="text-2xl font-bold mb-2">{metric.value}</div>
                <div className="text-gray-400 text-sm">{metric.label}</div>
                <div className="mt-4 w-full bg-gray-800 rounded-full h-2">
                  <motion.div
                    animate={{ 
                      width: metric.label === "CPU Usage" ? `${cpuUsage}%` :
                             metric.label === "Response Time" ? `${100 - (responseTime/2)}%` :
                             metric.label === "Throughput" ? `${(throughput/10000) * 100}%` :
                             "32%"
                    }}
                    className={`h-2 rounded-full ${
                      metric.color === "text-green-400" ? "bg-green-400" :
                      metric.color === "text-yellow-400" ? "bg-yellow-400" :
                      metric.color === "text-red-400" ? "bg-red-400" :
                      "bg-blue-400"
                    }`}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Performance Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-gray-800 rounded-2xl p-8"
          >
            <h3 className="text-xl font-bold mb-6">Response Time Trends</h3>
            <div className="h-64 flex items-end justify-between gap-2">
              {[120, 95, 110, 85, 90, 105, 95, 80, 88, 92, 85, 78].map((height, index) => (
                <motion.div
                  key={index}
                  initial={{ height: 0 }}
                  animate={{ height: `${(height/120) * 100}%` }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  className="flex-1 bg-gradient-to-t from-yellow-400 to-orange-400 rounded-t-lg"
                />
              ))}
            </div>
            <div className="flex justify-between mt-4 text-sm text-gray-400">
              <span>12h ago</span>
              <span>6h ago</span>
              <span>Now</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Optimization Features */}
      <section className="py-20 bg-gradient-to-b from-transparent to-orange-900/10">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Speed Optimization Features</h2>
            <p className="text-gray-400">Technologies that make our AI lightning fast</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {optimizationFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${
                    feature.status === "active" ? "bg-green-900/30" : "bg-blue-900/30"
                  }`}>
                    <feature.icon className={`w-6 h-6 ${
                      feature.status === "active" ? "text-green-400" : "text-blue-400"
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-400 mb-4">{feature.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-yellow-400">{feature.speed}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        feature.status === "active" 
                          ? "bg-green-900/30 text-green-400" 
                          : "bg-blue-900/30 text-blue-400"
                      }`}>
                        {feature.status === "active" ? "ACTIVE" : "BETA"}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure Overview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">High-Performance Infrastructure</h2>
            <p className="text-gray-400">Powered by cutting-edge technology</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Global CDN",
                description: "Distributed edge servers for minimal latency",
                locations: "50+ locations",
                uptime: "99.99%"
              },
              {
                title: "GPU Clusters",
                description: "Thousands of GPU cores for parallel processing",
                locations: "15 data centers",
                uptime: "99.95%"
              },
              {
                title: "Auto-scaling",
                description: "Instantly scale to meet demand spikes",
                locations: "Global coverage",
                uptime: "99.9%"
              }
            ].map((infra, index) => (
              <motion.div
                key={infra.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border border-gray-700 rounded-2xl p-8 text-center"
              >
                <Server className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">{infra.title}</h3>
                <p className="text-gray-400 mb-6">{infra.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Coverage:</span>
                    <span>{infra.locations}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Uptime:</span>
                    <span className="text-green-400">{infra.uptime}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Speed Comparison */}
      <section className="py-20 bg-gradient-to-b from-transparent to-yellow-900/10">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Speed Comparison</h2>
            <p className="text-gray-400">See how we compare to traditional solutions</p>
          </motion.div>

          <div className="space-y-4">
            {[
              { name: "Our AI Platform", time: "50ms", speed: "100%" },
              { name: "Traditional AI", time: "2.5s", speed: "20x slower" },
              { name: "Cloud AI Services", time: "800ms", speed: "16x slower" },
              { name: "On-premise Solutions", time: "5s", speed: "100x slower" }
            ].map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{item.name}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-yellow-400 font-bold">{item.time}</span>
                    <div className="w-32 bg-gray-800 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: item.speed === "100%" ? "100%" : "20%" }}
                        transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                        className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full"
                      />
                    </div>
                    <span className="text-sm text-gray-400">{item.speed}</span>
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
