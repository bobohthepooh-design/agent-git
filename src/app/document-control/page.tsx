"use client";

import { motion } from "framer-motion";
import { FileText, Shield, Users, Clock, CheckCircle, BarChart, Lock, Database, Cloud, ArrowRight } from "lucide-react";
import { BackButton } from "@/components/BackButton";

export default function DocumentControl() {
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
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8 flex justify-center"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <FileText className="w-16 h-16 text-white opacity-20" />
                </motion.div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative"
                >
                  <Shield className="w-16 h-16 text-white" />
                </motion.div>
              </div>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Document Control System
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Enterprise-grade document management with security, compliance, and audit trails
            </p>
          </motion.div>
        </div>
      </section>

      {/* Architecture Overview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">System Architecture</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Four-layer architecture designed for security, scalability, and compliance
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Cloud,
                title: "Web Client",
                description: "Next.js frontend with responsive design and real-time updates",
                features: ["Document upload/download", "Version comparison", "Approval workflows"]
              },
              {
                icon: Shield,
                title: "API Layer",
                description: "Secure API with authentication, validation, and rate limiting",
                features: ["OIDC/SSO auth", "RBAC permissions", "Input validation", "Rate limiting"]
              },
              {
                icon: Database,
                title: "Service Layer",
                description: "Business logic for document lifecycle and compliance",
                features: ["Version control", "Approval engine", "Retention policies", "Audit logging"]
              },
              {
                icon: Lock,
                title: "Repository Layer",
                description: "Transactional database with encrypted object storage",
                features: ["PostgreSQL DB", "Encrypted files", "SHA256 verification", "Immutable logs"]
              }
            ].map((layer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 border border-gray-800 rounded-2xl bg-gray-900/50 backdrop-blur-sm"
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
                  className="mb-4"
                >
                  <layer.icon className="w-8 h-8 text-blue-400" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">{layer.title}</h3>
                <p className="text-gray-400 mb-4">{layer.description}</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  {layer.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-green-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bank-DMS Project Structure */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Bank-DMS Project Structure</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Complete enterprise-grade document management system architecture
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 border border-gray-800 rounded-2xl bg-gray-900/50 backdrop-blur-sm"
            >
              <h3 className="text-2xl font-semibold mb-4 text-blue-400">📁 Directory Structure</h3>
              <div className="bg-black/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <pre className="text-gray-300">
{`bank-dms/
├── src/
│   ├── app/
│   │   ├── (dashboard)/
│   │   │   ├── documents/
│   │   │   ├── approvals/
│   │   │   ├── audit/
│   │   │   └── admin/
│   │   └── api/
│   │       ├── documents/
│   │       ├── versions/
│   │       ├── approvals/
│   │       ├── audit/
│   │       └── users/
│   ├── features/
│   │   ├── documents/
│   │   ├── approvals/
│   │   ├── audit/
│   │   ├── users/
│   │   └── roles/
│   └── lib/
│       ├── db.ts
│       ├── storage.ts
│       ├── auth.ts
│       └── rbac.ts`}</pre>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 border border-gray-800 rounded-2xl bg-gray-900/50 backdrop-blur-sm"
            >
              <h3 className="text-2xl font-semibold mb-4 text-green-400">🚀 Key Features</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Document lifecycle management</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Multi-level approval workflows</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Immutable audit trails</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Role-based access control (RBAC)</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>File encryption & integrity</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Compliance & retention policies</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Real-time notifications</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Advanced search & filtering</span>
                </li>
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 p-8 border border-purple-500/30 rounded-2xl bg-purple-500/10 backdrop-blur-sm"
          >
            <h3 className="text-2xl font-semibold mb-4 text-purple-400">🏗️ Architecture Layers</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { title: "App Router", desc: "Next.js 16 with route groups", color: "text-blue-400" },
                { title: "API Layer", desc: "RESTful with auth & RBAC", color: "text-green-400" },
                { title: "Feature Services", desc: "Business logic & repositories", color: "text-yellow-400" },
                { title: "Infrastructure", desc: "Database, storage, security", color: "text-purple-400" }
              ].map((layer, i) => (
                <div key={i} className="text-center">
                  <div className={`text-lg font-semibold ${layer.color}`}>{layer.title}</div>
                  <div className="text-sm text-gray-400 mt-1">{layer.desc}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl font-bold mb-4">Ready for Implementation</h2>
            <p className="text-xl text-gray-300 mb-8">
              Complete architecture and documentation available for enterprise deployment
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-blue-500 text-white font-semibold rounded-full flex items-center gap-2 hover:bg-blue-600 transition-colors"
              >
                View Documentation
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border border-blue-500 text-blue-400 font-semibold rounded-full hover:bg-blue-500 hover:text-white transition-colors"
              >
                Download Architecture
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
