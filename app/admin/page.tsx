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

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-12">
        <h1 className="text-4xl font-extrabold text-teal-900">NexusNode Admin Panel</h1>

        {/* Section 1: Appointments Table */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 bg-teal-600 text-white">
            <h2 className="text-xl font-bold">Incoming Patient Appointments</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 text-sm uppercase">
                <tr>
                  <th className="p-4">Patient</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Symptoms</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={4} className="p-4 text-center">Loading appointments...</td></tr>
                ) : !Array.isArray(appointments) || appointments.length === 0 ? (
                  <tr><td colSpan={4} className="p-4 text-center">No appointments found.</td></tr>
                ) : (
                  appointments.map((app: any) => (
                    <tr key={app._id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="p-4 font-semibold text-gray-900">{app.name}</td>
                      <td className="p-4 text-gray-900">{app.phone}</td>
                      <td className="p-4 italic text-gray-900">{app.date}</td>
                      <td className="p-4 text-gray-600 text-sm">{app.symptoms}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 2: Create Blog Form */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Blog Post</h2>
          <form onSubmit={handleBlogSubmit} className="grid grid-cols-1 gap-6">
            
            {/* Title Input */}
            <input 
              required
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-gray-900" 
              placeholder="Blog Title" 
              value={blogData.title}
              onChange={(e) => setBlogData({...blogData, title: e.target.value})}
            />
            
            {/* NEW: Image URL Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image URL</label>
              <input 
                type="url"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-gray-900" 
                placeholder="https://example.com/image.jpg" 
                value={blogData.imageUrl}
                onChange={(e) => setBlogData({...blogData, imageUrl: e.target.value})}
              />
              <p className="text-xs text-gray-500 mt-1">Paste a link to an image from the web (e.g., Unsplash, Pexels).</p>
            </div>

            {/* Excerpt Input */}
            <textarea 
              required
              className="p-3 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-teal-500 outline-none text-gray-900" 
              placeholder="Short Excerpt (shows on home page)"
              value={blogData.excerpt}
              onChange={(e) => setBlogData({...blogData, excerpt: e.target.value})}
            />
            
            {/* Content Input */}
            <textarea 
              required
              className="p-3 border border-gray-300 rounded-lg h-64 focus:ring-2 focus:ring-teal-500 outline-none text-gray-900" 
              placeholder="Full Blog Content"
              value={blogData.content}
              onChange={(e) => setBlogData({...blogData, content: e.target.value})}
            />
            
            <button type="submit" className="bg-teal-600 text-white font-bold py-3 rounded-lg hover:bg-teal-700 transition shadow-md">
              Publish to Website
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}