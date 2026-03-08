export default function Services() {
  const treatments = [
    { title: "Respiratory Issues", description: "Natural relief for asthma, bronchitis, allergies, and chronic coughs without harsh side effects.", icon: "🫁" },
    { title: "Skin Conditions", description: "Effective treatments for eczema, psoriasis, acne, and other persistent dermatological problems.", icon: "✨" },
    { title: "Digestive Disorders", description: "Holistic care for IBS, acidity, constipation, and gastric issues to restore gut health.", icon: "🌿" },
    { title: "Stress & Anxiety", description: "Gentle remedies to calm the nervous system, improve sleep, and manage daily stress.", icon: "🧠" },
    { title: "Women's Health", description: "Support for PCOS, menstrual irregularities, menopause symptoms, and hormonal imbalances.", icon: "🌸" },
    { title: "Child Immunity", description: "Safe, sweet pills that kids love, designed to boost natural immunity against frequent colds.", icon: "🛡️" },
  ];

  return (
    <section className="py-20 sm:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Conditions We Treat
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Safe, holistic, and deeply acting remedies tailored to your unique physical and emotional constitution.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {treatments.map((item, index) => (
            <div 
              key={index} 
              className="group bg-white rounded-2xl p-8 hover:-translate-y-2 transition-all duration-300 border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-teal-500/10 hover:border-teal-100"
            >
              <div className="w-14 h-14 bg-teal-50 rounded-xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}