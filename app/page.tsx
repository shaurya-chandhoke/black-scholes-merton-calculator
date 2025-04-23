'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedBackground from './components/AnimatedBackground';

export default function Home() {
  const [showCalculator, setShowCalculator] = useState(false);
  const [formData, setFormData] = useState({
    stockPrice: '',
    strikePrice: '',
    timeToExpiry: '',
    riskFreeRate: '',
    volatility: '',
    dividendYield: '',
  });

  const [result, setResult] = useState<{
    callPrice: number | null;
    putPrice: number | null;
  }>({
    callPrice: null,
    putPrice: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error calculating options prices:', error);
    }
  };

  return (
    <main className="min-h-screen p-8 relative pt-24">
      <AnimatedBackground />
      <div className="max-w-2xl mx-auto relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
        <AnimatePresence mode="wait">
          {!showCalculator ? (
            <motion.div
              key="hero"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center w-full"
            >
              <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-4xl md:text-5xl font-bold mb-6 text-gray-800"
              >
                Click Here To Price Your Options
              </motion.h1>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                onClick={() => setShowCalculator(true)}
                className="bg-blue-600 text-white py-3 px-8 rounded-md text-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
              >
                Begin Pricing
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="calculator"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-3xl font-bold text-center mb-8 text-gray-800"
              >
                Contract Components
              </motion.h1>
              
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                onSubmit={handleSubmit}
                className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg w-full"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Stock Price (S)
                    </label>
                    <input
                      type="number"
                      name="stockPrice"
                      value={formData.stockPrice}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Strike Price (K)
                    </label>
                    <input
                      type="number"
                      name="strikePrice"
                      value={formData.strikePrice}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Time to Expiry (T) in years
                    </label>
                    <input
                      type="number"
                      name="timeToExpiry"
                      value={formData.timeToExpiry}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Risk-Free Rate (r) in %
                    </label>
                    <input
                      type="number"
                      name="riskFreeRate"
                      value={formData.riskFreeRate}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Volatility (σ) in %
                    </label>
                    <input
                      type="number"
                      name="volatility"
                      value={formData.volatility}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Dividend Yield (q) in %
                    </label>
                    <input
                      type="number"
                      name="dividendYield"
                      value={formData.dividendYield}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  Calculate
                </button>
              </motion.form>

              {result.callPrice !== null && result.putPrice !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg w-full"
                >
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">Results</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Call Option Price</p>
                      <p className="text-2xl font-bold text-blue-600">
                        ${result.callPrice.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Put Option Price</p>
                      <p className="text-2xl font-bold text-blue-600">
                        ${result.putPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
} 