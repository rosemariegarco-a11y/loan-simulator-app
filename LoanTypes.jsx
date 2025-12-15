import React from 'react';
import { motion } from 'framer-motion';
import { User, ShoppingCart, Car, Home } from 'lucide-react';
import { Card } from '@/components/ui/card';

const LoanTypes = ({ onSelectLoanType }) => {
  const loanTypes = [
    {
      id: 'personal',
      title: 'Prêt Personnel',
      icon: User,
      description: 'Pour vos projets personnels',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'consumer',
      title: 'Crédit à la consommation',
      icon: ShoppingCart,
      description: 'Financement de vos achats',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'auto',
      title: 'Crédit auto',
      icon: Car,
      description: 'Achat de votre véhicule',
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 'mortgage',
      title: 'Crédit immobilier',
      icon: Home,
      description: 'Financement de votre bien',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <Card className="bg-white/10 backdrop-blur-md border-purple-800/50 p-8 rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-6">Types de prêts disponibles</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {loanTypes.map((loan, index) => (
            <motion.button
              key={loan.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectLoanType(loan.title)}
              className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-white/20 to-white/10 border border-white/20 p-6 text-left transition-all duration-300 hover:border-yellow-400/50 hover:shadow-xl"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${loan.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <div className="p-3 bg-yellow-400 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <loan.icon className="w-6 h-6 text-purple-950" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-yellow-400/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-yellow-400 text-xl">→</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors duration-300">
                  {loan.title}
                </h3>
                <p className="text-purple-200 text-sm">
                  {loan.description}
                </p>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="mt-6 p-4 bg-yellow-400/10 border border-yellow-400/30 rounded-xl">
          <p className="text-purple-100 text-sm text-center">
            <span className="font-semibold text-yellow-400">Taux fixe de 2%</span> sur tous nos prêts
          </p>
        </div>
      </Card>
    </motion.div>
  );
};

export default LoanTypes;