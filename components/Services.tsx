"use client";

import { motion, Variants } from 'framer-motion';

export default function Services() {
  const treatments = [
    { title: "Respiratory Issues", description: "Natural relief for asthma, bronchitis, allergies, and chronic coughs without harsh side effects.", icon: "🫁" },
    { title: "Skin Conditions", description: "Effective treatments for eczema, psoriasis, acne, and other persistent dermatological problems.", icon: "✨" },
    { title: "Digestive Disorders", description: "Holistic care for IBS, acidity, constipation, and gastric issues to restore gut health.", icon: "🌿" },
    { title: "Stress & Anxiety", description: "Gentle remedies to calm the nervous system, improve sleep, and manage daily stress.", icon: "🧠" },
    { title: "Women's Health", description: "Support for PCOS, menstrual irregularities, menopause symptoms, and hormonal imbalances.", icon: "🌸" },
    { title: "Child Immunity", description: "Safe, sweet pills that kids love, designed to boost natural immunity against frequent colds.", icon: "🛡️" },
  ];

  // --- Animation Variants ---
  const headerVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="py-20 sm:py-32 bg-slate-50 relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-teal-100/50 rounded-full blur-[100px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={headerVariants}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">
            {/* ✨ THE PREMIUM SHEEN EFFECT ✨ */}
            <motion.span
              className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-teal-900 via-teal-500 to-teal-900 bg-[length:200%_auto]"
              animate={{ backgroundPosition: ["0% center", "200% center"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            >
              Conditions We Treat
            </motion.span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Safe, holistic, and deeply acting remedies tailored to your unique physical and emotional constitution.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {treatments.map((item, index) => (
            <motion.div 
              key={index} 
              variants={cardVariants}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="group bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-teal-500/10 hover:border-teal-100 cursor-default relative overflow-hidden"
            >
              {/* Subtle hover gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal-50/0 to-teal-50/0 group-hover:from-teal-50/50 group-hover:to-transparent transition-colors duration-500 ease-out" />
              
              <div className="relative z-10">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-inner"
                >
                  {item.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}