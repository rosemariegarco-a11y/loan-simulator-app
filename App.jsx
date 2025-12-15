import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import LoanCalculator from '@/components/LoanCalculator';
import LoanTypes from '@/components/LoanTypes';
import LoanForm from '@/components/LoanForm';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';

function App() {
  const [selectedLoanType, setSelectedLoanType] = useState('');
  const [simulatorData, setSimulatorData] = useState(null);
  const loanFormRef = useRef(null);

  const handlePreFillForm = (data) => {
    setSimulatorData(data);
    // Smooth scroll to the form
    if (loanFormRef.current) {
      loanFormRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Helmet>
        <title>Atome Banque - Prêts en ligne rapides et faciles</title>
        <meta name="description" content="Obtenez votre prêt en ligne avec Atome Banque. Prêt personnel, crédit à la consommation, crédit auto et crédit immobilier à taux fixe de 2%." />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-purple-950">
        <Header />
        
        <main className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Votre prêt en ligne<br />
              <span className="text-yellow-400">simple et rapide</span>
            </h1>
            <p className="text-xl text-purple-200 max-w-2xl mx-auto">
              Calculez, comparez et soumettez votre demande de prêt en quelques minutes avec un taux fixe attractif de 2%
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <LoanCalculator onPreFill={handlePreFillForm} />
            <LoanTypes onSelectLoanType={setSelectedLoanType} />
          </div>

          <div ref={loanFormRef}>
            <LoanForm 
              selectedLoanType={selectedLoanType} 
              simulatorData={simulatorData}
            />
          </div>
        </main>

        <Footer />
        <Toaster />
      </div>
    </>
  );
}

export default App;