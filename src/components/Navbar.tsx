"use client";

import { motion } from "framer-motion";
import { Brain, Sparkles, Zap, ArrowRight, FileText, User, Menu, X, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./Button";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    // Mock login - in real app, this would redirect to login page
    const mockUser = { name: "John Doe", email: "john@example.com" };
    setUser(mockUser);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(mockUser));
    router.push("/login");
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }} // Slower rotation
              className="relative"
            >
              <Brain className="w-8 h-8 text-white" />
            </motion.div>
            <span className="text-xl font-bold text-white">AI Revolution</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="/smart-learning" className="text-gray-300 hover:text-white transition-colors">
              Smart Learning
            </a>
            <a href="/lightning-fast" className="text-gray-300 hover:text-white transition-colors">
              Lightning Fast
            </a>
            <a href="/creative-ai" className="text-gray-300 hover:text-white transition-colors">
              Creative AI
            </a>
            <div className="h-6 w-px bg-gray-600"></div>
            <a href="/documents" className="text-gray-300 hover:text-white transition-colors">
              Documents
            </a>
            <a href="/approvals" className="text-gray-300 hover:text-white transition-colors">
              Approvals
            </a>
            <a href="/audit" className="text-gray-300 hover:text-white transition-colors">
              Audit
            </a>
            <a href="/admin" className="text-gray-300 hover:text-white transition-colors">
              Admin
            </a>
          </div>

          {/* Auth buttons */}
          {isLoggedIn && user ? (
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-full"
              >
                <User className="w-4 h-4 text-white" />
                <span className="text-white text-sm">{user.name}</span>
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </motion.button>
            </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogin}
                className="px-6 py-2 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors"
              >
                Sign In
              </motion.button>
            )}

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-black/95 backdrop-blur-sm border-t border-gray-800"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="/smart-learning"
                className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Smart Learning
              </a>
              <a
                href="/lightning-fast"
                className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Lightning Fast
              </a>
              <a
                href="/creative-ai"
                className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Creative AI
              </a>
              <div className="border-t border-gray-700 my-2"></div>
              <a
                href="/documents"
                className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Documents
              </a>
              <a
                href="/approvals"
                className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Approvals
              </a>
              <a
                href="/audit"
                className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Audit
              </a>
              <a
                href="/admin"
                className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Admin
              </a>
              
              {isLoggedIn && user ? (
                <div className="border-t border-gray-800 pt-4 mt-4">
                  <div className="flex items-center gap-2 px-3 py-2">
                    <User className="w-4 h-4 text-white" />
                    <span className="text-white text-sm">{user.name}</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors mt-4"
                  >
                    Logout
                  </motion.button>
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    handleLogin();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors mt-4"
                >
                  Sign In
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
