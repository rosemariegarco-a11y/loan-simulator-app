import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';

const LoanForm = ({ selectedLoanType, simulatorData }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    amount: '',
    loanType: '',
    duration: ''
  });

  // Update form when selectedLoanType prop changes
  useEffect(() => {
    if (selectedLoanType) {
      setFormData(prev => ({ ...prev, loanType: selectedLoanType }));
    }
  }, [selectedLoanType]);

  // Update form when simulatorData prop changes
  useEffect(() => {
    if (simulatorData) {
      setFormData(prev => ({
        ...prev,
        amount: simulatorData.amount.toString(),
        duration: simulatorData.duration.toString()
      }));
      
      toast({
        title: "Données appliquées",
        description: "Le formulaire a été pré-rempli avec les données du simulateur.",
      });
    }
  }, [simulatorData, toast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.amount || !formData.loanType || !formData.duration) {
      toast({
        title: "Champs manquants",
        description: "Veuillez remplir tous les champs du formulaire.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Calculate loan details
    const amountVal = parseFloat(formData.amount);
    const durationVal = parseInt(formData.duration);
    const fixedRate = 2; // 2%
    const monthlyRate = fixedRate / 100 / 12;
    const monthlyPayment = (amountVal * monthlyRate * Math.pow(1 + monthlyRate, durationVal)) / 
                           (Math.pow(1 + monthlyRate, durationVal) - 1);
    const totalAmount = monthlyPayment * durationVal;

    try {
      // 1. Insert into Supabase Database
      const { error: dbError } = await supabase
        .from('loan_submissions')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            amount: amountVal,
            loan_type: formData.loanType,
            duration: durationVal,
            monthly_payment: parseFloat(monthlyPayment.toFixed(2)),
            total_amount: parseFloat(totalAmount.toFixed(2))
          }
        ]);

      if (dbError) {
        console.error("Database error:", dbError);
        throw new Error("Erreur lors de la sauvegarde en base de données");
      }

      // 2. Call Supabase Edge Function to send email
      const { data: fnData, error: fnError } = await supabase.functions.invoke('send-loan-email', {
        body: {
          name: formData.name,
          email: formData.email,
          loanType: formData.loanType,
          amount: amountVal,
          duration: durationVal,
          monthlyPayment: monthlyPayment.toFixed(2),
          totalAmount: totalAmount.toFixed(2)
        }
      });

      if (fnError) {
        console.error('Edge function error:', fnError);
        // Note: We don't throw here to allow the user to see success if DB save worked, 
        // but we might warn them or just log it. 
        // For this app, we'll treat the process as "successful" for the user 
        // but log the email failure.
      }

      toast({
        title: "Demande envoyée avec succès !",
        description: `Votre dossier a été transmis à l'équipe Atome Banque.`,
        variant: "default",
        className: "bg-green-600 text-white border-none"
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        amount: '',
        loanType: '',
        duration: ''
      });

    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de l'enregistrement de votre demande.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="max-w-4xl mx-auto"
    >
      <Card className="bg-white/10 backdrop-blur-md border-purple-800/50 p-8 rounded-2xl shadow-2xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-yellow-400 rounded-xl">
            <Send className="w-6 h-6 text-purple-950" />
          </div>
          <h2 className="text-2xl font-bold text-white">Soumettez votre demande</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-purple-200 font-medium">
                Nom complet *
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Jean Dupont"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="bg-white/10 border-purple-700/50 text-white placeholder:text-purple-300 focus:border-yellow-400"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-purple-200 font-medium">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="jean.dupont@email.com"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="bg-white/10 border-purple-700/50 text-white placeholder:text-purple-300 focus:border-yellow-400"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-purple-200 font-medium">
                Montant souhaité (€) *
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder="10000"
                min="1000"
                max="100000"
                value={formData.amount}
                onChange={(e) => handleChange('amount', e.target.value)}
                className="bg-white/10 border-purple-700/50 text-white placeholder:text-purple-300 focus:border-yellow-400"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration" className="text-purple-200 font-medium">
                Durée (mois) *
              </Label>
              <Select value={formData.duration} onValueChange={(value) => handleChange('duration', value)}>
                <SelectTrigger className="bg-white/10 border-purple-700/50 text-white focus:border-yellow-400">
                  <SelectValue placeholder="Sélectionnez la durée" />
                </SelectTrigger>
                <SelectContent className="bg-purple-900 border-purple-700 text-white">
                  <SelectItem value="6">6 mois</SelectItem>
                  <SelectItem value="12">12 mois</SelectItem>
                  <SelectItem value="24">24 mois</SelectItem>
                  <SelectItem value="36">36 mois</SelectItem>
                  <SelectItem value="48">48 mois</SelectItem>
                  <SelectItem value="60">60 mois</SelectItem>
                  <SelectItem value="84">84 mois</SelectItem>
                  <SelectItem value="120">120 mois</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="loanType" className="text-purple-200 font-medium">
              Type de prêt *
            </Label>
            <Select value={formData.loanType} onValueChange={(value) => handleChange('loanType', value)}>
              <SelectTrigger className="bg-white/10 border-purple-700/50 text-white focus:border-yellow-400">
                <SelectValue placeholder="Sélectionnez le type de prêt" />
              </SelectTrigger>
              <SelectContent className="bg-purple-900 border-purple-700 text-white">
                <SelectItem value="Prêt Personnel">Prêt Personnel</SelectItem>
                <SelectItem value="Crédit à la consommation">Crédit à la consommation</SelectItem>
                <SelectItem value="Crédit auto">Crédit auto</SelectItem>
                <SelectItem value="Crédit immobilier">Crédit immobilier</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="bg-purple-900/50 border border-purple-700/50 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-purple-200">
                <p className="font-medium mb-1">Engagement Atome Banque :</p>
                <ul className="space-y-1 text-purple-300">
                  <li>• Réponse sous 24h</li>
                  <li>• Taux fixe garanti de 2%</li>
                  <li>• Sans frais de dossier</li>
                  <li>• Remboursement anticipé sans pénalité</li>
                </ul>
              </div>
            </div>
          </div>

          <Button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-yellow-400 text-purple-950 hover:bg-yellow-500 font-bold text-lg py-6 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-yellow-400/50 disabled:opacity-70 disabled:hover:scale-100"
          >
            {isSubmitting ? (
                <span className="flex items-center">
                    Envoi en cours...
                </span>
            ) : (
                <>
                    <Send className="w-5 h-5 mr-2" />
                    Soumettre ma demande
                </>
            )}
          </Button>
        </form>
      </Card>
    </motion.div>
  );
};

export default LoanForm;