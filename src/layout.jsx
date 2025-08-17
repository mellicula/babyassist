
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "./utils.js";
import { Baby, Home } from "lucide-react";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  
  const navItems = [
    { name: "Home", icon: Home, path: createPageUrl("Home") },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50">
      <style>
        {`
          :root {
            --primary-soft: #6366f1;
            --primary-gentle: #8b5cf6;
            --accent-warm: #f59e0b;
            --accent-soft: #10b981;
            --neutral-warm: #f3f4f6;
            --text-primary: #1f2937;
            --text-soft: #6b7280;
            --surface-white: #ffffff;
            --surface-soft: #f9fafb;
          }
          
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          
          .glass-effect {
            backdrop-filter: blur(20px);
            background: rgba(255, 255, 255, 0.85);
            border: 1px solid rgba(255, 255, 255, 0.2);
          }
        `}
      </style>
      
      {/* Header */}
      <header className="glass-effect sticky top-0 z-50 border-b border-white/20">
        <div className="max-w-sm mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-rose-400 to-pink-400 flex items-center justify-center shadow-lg">
                <Baby className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-800">BabyAssistant</h1>
                <p className="text-xs text-gray-500">Your parenting companion</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50">
        <div className="max-w-sm mx-auto">
          <div className="glass-effect rounded-t-3xl border-t border-white/20 px-2 py-2">
            <div className="flex justify-around items-center">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-200 ${
                    isActive(item.path)
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg transform scale-105"
                      : "text-gray-500 hover:text-gray-700 hover:bg-white/50"
                  }`}
                >
                  <item.icon className={`w-5 h-5 mb-1 ${isActive(item.path) ? 'text-white' : ''}`} />
                  <span className={`text-xs font-medium ${isActive(item.path) ? 'text-white' : ''}`}>
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

