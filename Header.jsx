import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  const handleNavClick = (item) => {
    toast({
      title: "Navigation",
      description: "🚧 Cette fonctionnalité n'est pas encore implémentée—mais ne vous inquiétez pas ! Vous pouvez la demander dans votre prochaine invite ! 🚀",
    });
  };

  const navItems = [
    { name: 'Épargne', hasDropdown: true },
    { name: 'Hypothèques', hasDropdown: true },
    { name: 'Prêts entreprise', hasDropdown: true },
    { name: 'À propos', hasDropdown: true },
    { name: 'Aide', hasDropdown: true },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-purple-950/80 backdrop-blur-md border-b border-purple-800/50 sticky top-0 z-50"
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src="https://horizons-cdn.hostinger.com/1b9311f2-6082-4999-88dc-67f29f5bc871/2bf632babd42c39882287006a81f5f4b.png" 
              alt="Atome Banque logo" 
              className="h-10 w-10"
            />
            <span className="text-2xl font-bold text-white">Atom</span>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.name)}
                className="flex items-center gap-1 text-white hover:text-yellow-400 transition-colors duration-200 group"
              >
                <span>{item.name}</span>
                {item.hasDropdown && (
                  <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-200" />
                )}
              </button>
            ))}
          </div>

          <div className="hidden lg:block">
            <Button 
              className="bg-yellow-400 text-purple-950 hover:bg-yellow-500 font-semibold px-6"
              onClick={() => handleNavClick('Get the app')}
            >
              Obtenir l'app
            </Button>
          </div>

          <button
            className="lg:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden mt-4 pb-4 border-t border-purple-800/50 pt-4"
          >
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  handleNavClick(item.name);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-between w-full text-white hover:text-yellow-400 py-3 transition-colors duration-200"
              >
                <span>{item.name}</span>
                {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
              </button>
            ))}
            <Button 
              className="bg-yellow-400 text-purple-950 hover:bg-yellow-500 font-semibold w-full mt-4"
              onClick={() => {
                handleNavClick('Get the app');
                setMobileMenuOpen(false);
              }}
            >
              Obtenir l'app
            </Button>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
};

export default Header;