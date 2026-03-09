"use client";

import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState<any[]>([]);
  
  // Added the imageUrl with a professional health/wellness demo image
  const [blogData, setBlogData] = useState({ 
    title: '', 
    excerpt: '', 
    content: '', 
    category: 'General', 
    readTime: '5 min',
    imageUrl: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=1000' 
  });
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  async function fetchAppointments() {
    try {
      const res = await fetch('/api/contact');
      const data = await res.json();
      
      console.log("Data from API:", data);

      if (Array.isArray(data)) {
        setAppointments(data);
      } else {
        console.error("Expected an array but got something else!");
        setAppointments([]); 
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setAppointments([]); 
    } finally {
      setLoading(false);
    }
  }

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/blogs', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogData),
      });
      if (res.ok) {
        alert("Blog Posted Successfully!");
        // Clears the form after posting, leaving imageUrl blank for the next one
        setBlogData({ title: '', excerpt: '', content: '', category: 'General', readTime: '5 min', imageUrl: '' });
      } else {
        alert("Failed to post blog. Check console.");
      }
    } catch (error) {
      console.error("Blog Submission Error:", error);
      alert("An error occurred while posting.");
    }
  };

  // THE NEW DELETE FUNCTION
  const handleDeleteAppointment = async (id: string) => {
    // 1. The Safety Check
    if (!window.confirm("Are you sure you want to delete this appointment? This cannot be undone.")) {
      return; 
    }

    try {
      // 2. Send the delete request to our new API
      const res = await fetch(`/api/contact/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        // 3. Remove it from the screen instantly without needing to refresh the page!
        setAppointments(appointments.filter((appt) => appt._id !== id));
      } else {
        alert("Failed to delete the appointment.");
      }
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };
  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Premium Dashboard Header */}
        <header className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border-l-8 border-teal-600 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-black tracking-tight">Clinic Command Center</h1>
            <p className="text-slate-900 font-medium mt-2 text-lg">Manage patient appointments and publish health articles.</p>
          </div>
          <div className="bg-teal-50 border border-teal-200 px-6 py-3 rounded-xl flex items-center gap-3 shadow-inner">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
            </span>
            <span className="text-teal-900 font-bold text-sm tracking-wide uppercase">System Online</span>
          </div>
        </header>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: Appointments (Takes up 7 columns on big screens) */}
          <section className="lg:col-span-7 bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden flex flex-col">
            <div className="bg-slate-900 p-6">
              <h2 className="text-2xl font-black text-white flex items-center gap-3">
                <span>📅</span> Patient Appointments
              </h2>
            </div>
            
            <div className="p-6 flex-1 overflow-y-auto bg-white">
              {appointments.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 rounded-xl border-2 border-dashed border-slate-300">
                  <p className="text-black font-bold text-lg">No appointments booked yet.</p>
                  <p className="text-slate-900 mt-1">When patients fill out the form, they will appear here.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {appointments.map((appt, index) => (
                    <div key={index} className="bg-white border-2 border-slate-200 rounded-xl p-5 hover:border-teal-500 hover:shadow-lg transition-all duration-200">
                      <div className="flex justify-between items-start border-b-2 border-slate-100 pb-3 mb-3">
                        
                        <div>
                          <h3 className="text-xl font-black text-black">{appt.name}</h3>
                          <span className="inline-block mt-1 bg-slate-100 text-black font-bold px-3 py-1 rounded-md text-sm border border-slate-300 shadow-sm">
                            {appt.date}
                          </span>
                        </div>

                        {/* THE NEW DELETE BUTTON */}
                        <button 
                          onClick={() => handleDeleteAppointment(appt._id)}
                          className="bg-red-50 text-red-600 border border-red-200 hover:bg-red-600 hover:text-white font-bold px-3 py-2 rounded-lg text-sm transition-colors shadow-sm flex items-center gap-1"
                        >
                          🗑️ Delete
                        </button>

                      </div>
                      <div className="space-y-2">
                        <p className="text-black font-bold flex items-center gap-2">
                          <span className="text-teal-700">📞 Phone:</span> {appt.phone}
                        </p>
                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 mt-3">
                          <p className="text-black font-bold text-sm mb-1 uppercase tracking-wider text-teal-800">Symptoms / Notes:</p>
                          <p className="text-black font-medium leading-relaxed">{appt.symptoms || "No symptoms provided."}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* RIGHT COLUMN: Blog Publisher (Takes up 5 columns on big screens) */}
          <section className="lg:col-span-5 bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden flex flex-col">
            <div className="bg-teal-700 p-6">
              <h2 className="text-2xl font-black text-white flex items-center gap-3">
                <span>✍️</span> Publish Article
              </h2>
            </div>
            
            <form onSubmit={handleBlogSubmit} className="p-6 space-y-6 bg-white">
              
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <label className="block text-black font-black mb-2 text-lg">Blog Title</label>
                <input 
                  required
                  className="w-full p-4 border-2 border-slate-300 rounded-xl text-black font-medium focus:border-teal-600 focus:ring-0 outline-none transition-colors" 
                  placeholder="e.g., 5 Natural Remedies for Winter Colds" 
                  value={blogData.title}
                  onChange={(e) => setBlogData({...blogData, title: e.target.value})}
                />
              </div>

              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <label className="block text-black font-black mb-2 text-lg">Cover Image Link</label>
                <input 
                  type="url"
                  className="w-full p-4 border-2 border-slate-300 rounded-xl text-black font-medium focus:border-teal-600 focus:ring-0 outline-none transition-colors" 
                  placeholder="Paste an image URL here..." 
                  value={blogData.imageUrl}
                  onChange={(e) => setBlogData({...blogData, imageUrl: e.target.value})}
                />
              </div>
              
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <label className="block text-black font-black mb-2 text-lg">Short Summary</label>
                <textarea 
                  required
                  className="w-full p-4 border-2 border-slate-300 rounded-xl text-black font-medium h-24 focus:border-teal-600 focus:ring-0 outline-none transition-colors" 
                  placeholder="Write 2-3 sentences summarizing the blog..."
                  value={blogData.excerpt}
                  onChange={(e) => setBlogData({...blogData, excerpt: e.target.value})}
                />
              </div>
              
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-2 gap-2">
                  <label className="block text-black font-black text-lg">Full Article Content</label>
                  <span className="text-xs text-black font-bold bg-amber-100 border border-amber-300 px-3 py-1.5 rounded-md shadow-sm">
                    Press Enter twice for new paragraphs
                  </span>
                </div>
                <textarea 
                  required
                  className="w-full p-4 border-2 border-slate-300 rounded-xl text-black font-medium h-80 focus:border-teal-600 focus:ring-0 outline-none leading-relaxed transition-colors" 
                  placeholder="Write your full article here..."
                  value={blogData.content}
                  onChange={(e) => setBlogData({...blogData, content: e.target.value})}
                />
              </div>
              
              <button type="submit" className="w-full bg-black text-white text-xl font-black py-5 rounded-xl hover:bg-teal-700 transition-colors shadow-xl flex justify-center items-center gap-2">
                🚀 Publish to Live Website
              </button>

            </form>
          </section>

        </div>
      </div>
    </div>
  );
}