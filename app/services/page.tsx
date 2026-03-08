import Link from 'next/link';

export default function ServicesPage() {
  const treatmentCategories = [
    {
      title: "Respiratory & Allergies",
      icon: "🫁",
      conditions: ["Asthma", "Allergic Rhinitis", "Chronic Bronchitis", "Sinusitis", "Frequent Colds & Coughs", "Tonsillitis"],
      description: "Homeopathy offers deep-acting remedies that not only relieve acute respiratory distress but also aim to cure the underlying allergic tendency and strengthen immunity."
    },
    {
      title: "Skin & Hair Conditions",
      icon: "✨",
      conditions: ["Eczema & Dermatitis", "Psoriasis", "Acne & Pimples", "Warts & Corns", "Hair Fall & Alopecia", "Urticaria (Hives)"],
      description: "Instead of using topical ointments that suppress skin issues, we treat skin and hair problems from the inside out, addressing the root internal imbalance."
    },
    {
      title: "Digestive & Gastrointestinal",
      icon: "🌿",
      conditions: ["Irritable Bowel Syndrome (IBS)", "Acid Reflux / GERD", "Chronic Constipation", "Piles (Hemorrhoids)", "Fatty Liver", "Gastric Ulcers"],
      description: "Restore your gut health naturally. Our remedies help regulate digestion, reduce inflammation, and improve nutrient absorption without chemical laxatives or antacids."
    },
    {
      title: "Women's Health",
      icon: "🌸",
      conditions: ["PCOS / PCOD", "Menstrual Irregularities", "Dysmenorrhea (Painful Periods)", "Menopausal Syndrome", "Fibroids", "Thyroid Disorders"],
      description: "Gentle and highly effective care for female hormonal imbalances at every stage of life, providing relief without the need for synthetic hormone replacement therapy."
    },
    {
      title: "Pediatric Care (Child Health)",
      icon: "🧸",
      conditions: ["Low Immunity", "Teething Troubles", "Bed Wetting", "ADHD / Concentration Issues", "Growth Retardation", "Recurrent Infections"],
      description: "Children respond exceptionally well to homeopathy. The sweet pills are easy to administer, entirely safe, and help build a robust immune system for growing children."
    },
    {
      title: "Nervous System & Mind",
      icon: "🧠",
      conditions: ["Anxiety & Panic Attacks", "Depression", "Insomnia / Sleep Disorders", "Migraines & Headaches", "Chronic Fatigue", "Stress Management"],
      description: "Homeopathy treats the mind and body as one. We provide holistic support to calm the nervous system, improve sleep quality, and restore emotional balance."
    }
  ];

  return (
    <div className="bg-white pb-20">
      
      {/* Page Header */}
      <div className="bg-teal-700 text-white py-20 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Treatments & Expertise</h1>
          <p className="text-xl text-teal-100 max-w-3xl mx-auto font-medium">
            Comprehensive, natural, and side-effect-free solutions for acute and chronic conditions at Vraj Homeopathic Clinic.
          </p>
        </div>
      </div>

      {/* Treatments Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {treatmentCategories.map((category, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-xl hover:border-teal-300 transition-all duration-300 group">
              <div className="text-5xl mb-6 bg-teal-50 w-20 h-20 flex items-center justify-center rounded-full group-hover:scale-110 transition-transform duration-300">
                {category.icon}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{category.title}</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {category.description}
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-bold text-teal-800 uppercase tracking-wider mb-3">Commonly Treated:</h3>
                <ul className="space-y-2">
                  {category.conditions.map((condition, idx) => (
                    <li key={idx} className="text-gray-700 flex items-start text-sm">
                      <span className="text-teal-500 mr-2 mt-0.5">▹</span>
                      {condition}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

        </div>

        {/* Call to Action Banner */}
        <div className="mt-20 bg-teal-50 rounded-3xl p-10 md:p-16 text-center border border-teal-100 shadow-inner flex flex-col items-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Don't see your specific condition listed?</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl">
            Homeopathy treats the individual, not just the disease name. We can help with many more ailments not listed here. Reach out to us to discuss your specific health concerns.
          </p>
          <Link href="/contact" className="bg-teal-600 text-white hover:bg-teal-700 px-8 py-4 rounded-full font-bold transition-colors shadow-lg text-lg flex items-center gap-2">
            Discuss Your Health Today
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

      </div>
    </div>
  );
}