"use client";

import { motion } from "framer-motion";
import { Brain, User, LogOut, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./Button";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check login status on mount
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const userData = localStorage.getItem("user");
    
    setIsLoggedIn(loggedIn);
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    router.push("/login");
  };

  const handleLogin = () => {
    router.push("/login");
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
            <a href="/document-control" className="text-gray-300 hover:text-white transition-colors">
              Document Control
            </a>
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">
              Features
            </a>
            <a href="#about" className="text-gray-300 hover:text-white transition-colors">
              About
            </a>
            <a href="#contact" className="text-gray-300 hover:text-white transition-colors">
              Contact
            </a>

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
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
              <a
                href="/document-control"
                className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Document Control
              </a>
              <a
                href="#features"
                className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#about"
                className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </a>
              <a
                href="#contact"
                className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
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
                    className="w-full text-left px-3 py-2 text-white hover:bg-gray-800 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
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
