import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, TrendingUp, ArrowDownCircle } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const LoanCalculator = ({ onPreFill }) => {
  const [amount, setAmount] = useState(10000);
  const [duration, setDuration] = useState(24);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  const FIXED_RATE = 2; // 2% taux fixe

  useEffect(() => {
    calculateLoan();
  }, [amount, duration]);

  const calculateLoan = () => {
    const monthlyRate = FIXED_RATE / 100 / 12;
    const numPayments = duration;
    
    const monthly = (amount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                    (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    const total = monthly * numPayments;
    const interest = total - amount;
    
    setMonthlyPayment(isNaN(monthly) ? 0 : monthly);
    setTotalInterest(isNaN(interest) ? 0 : interest);
  };

  const handleApplyNow = () => {
    onPreFill({
      amount: amount,
      duration: duration
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Card className="bg-white/10 backdrop-blur-md border-purple-800/50 p-8 rounded-2xl shadow-2xl h-full flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-yellow-400 rounded-xl">
              <Calculator className="w-6 h-6 text-purple-950" />
            </div>
            <h2 className="text-2xl font-bold text-white">Calculateur de prêt</h2>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-purple-200 font-medium">Montant du prêt</label>
                <span className="text-yellow-400 font-bold text-xl">{amount.toLocaleString('fr-FR')} €</span>
              </div>
              <Slider
                value={[amount]}
                onValueChange={(value) => setAmount(value[0])}
                min={1000}
                max={100000}
                step={1000}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-purple-300 mt-1">
                <span>1 000 €</span>
                <span>100 000 €</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-purple-200 font-medium">Durée (mois)</label>
                <span className="text-yellow-400 font-bold text-xl">{duration} mois</span>
              </div>
              <Slider
                value={[duration]}
                onValueChange={(value) => setDuration(value[0])}
                min={6}
                max={120}
                step={6}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-purple-300 mt-1">
                <span>6 mois</span>
                <span>120 mois</span>
              </div>
            </div>

            <div className="bg-purple-900/50 rounded-xl p-4 border border-purple-700/50 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-yellow-400" />
                <span className="text-purple-200 font-medium">Taux fixe</span>
              </div>
              <div className="text-3xl font-bold text-white">{FIXED_RATE}%</div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-purple-700/50">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className="space-y-4 mb-6"
            >
              <h3 className="text-lg font-semibold text-white mb-2">Résumé de votre simulation</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="block text-purple-300">Montant emprunté</span>
                  <span className="font-bold text-white">{amount.toLocaleString('fr-FR')} €</span>
                </div>
                <div>
                  <span className="block text-purple-300">Durée</span>
                  <span className="font-bold text-white">{duration} mois</span>
                </div>
                <div>
                  <span className="block text-purple-300">Mensualité</span>
                  <span className="font-bold text-yellow-400 text-lg">{monthlyPayment.toFixed(2)} €</span>
                </div>
                <div>
                  <span className="block text-purple-300">Total à rembourser</span>
                  <span className="font-bold text-white">{(amount + totalInterest).toFixed(2)} €</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <Button 
            onClick={handleApplyNow}
            className="w-full bg-white/10 hover:bg-white/20 text-white border border-yellow-400/50 hover:border-yellow-400 transition-all duration-300 group"
          >
            <ArrowDownCircle className="w-5 h-5 mr-2 group-hover:text-yellow-400 transition-colors" />
            Utiliser ces données pour ma demande
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default LoanCalculator;