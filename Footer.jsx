import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="bg-purple-950/80 backdrop-blur-md border-t border-purple-800/50 mt-16"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="https://horizons-cdn.hostinger.com/1b9311f2-6082-4999-88dc-67f29f5bc871/2bf632babd42c39882287006a81f5f4b.png" 
                alt="Atome Banque logo" 
                className="h-8 w-8"
              />
              <span className="text-xl font-bold text-white">Atom</span>
            </div>
            <p className="text-purple-300 text-sm">
              Votre partenaire financier de confiance pour tous vos projets de prêt.
            </p>
          </div>

          <div>
            <span className="text-white font-semibold mb-3 block">Produits</span>
            <ul className="space-y-2 text-purple-300 text-sm">
              <li>Prêt Personnel</li>
              <li>Crédit Consommation</li>
              <li>Crédit Auto</li>
              <li>Crédit Immobilier</li>
            </ul>
          </div>

          <div>
            <span className="text-white font-semibold mb-3 block">Support</span>
            <ul className="space-y-2 text-purple-300 text-sm">
              <li>FAQ</li>
              <li>Contact</li>
              <li>Aide en ligne</li>
              <li>Rendez-vous</li>
            </ul>
          </div>

          <div>
            <span className="text-white font-semibold mb-3 block">Légal</span>
            <ul className="space-y-2 text-purple-300 text-sm">
              <li>Mentions légales</li>
              <li>Confidentialité</li>
              <li>CGU</li>
              <li>Cookies</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-purple-800/50 mt-8 pt-6 text-center text-purple-300 text-sm">
          <p>&copy; {new Date().getFullYear()} Atome Banque. Tous droits réservés.</p>
          <p className="mt-2 text-xs">
            Taux fixes sous réserve d'acceptation du dossier. Exemple : pour 10 000€ sur 24 mois à 2%, TAEG fixe de 2%, 
            mensualités de 423,55€, coût total du crédit 164,52€.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;