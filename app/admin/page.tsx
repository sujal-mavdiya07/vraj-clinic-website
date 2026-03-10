"use client";

import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  // --- SECURITY STATE ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);

  // --- DASHBOARD STATE ---
  const [activeTab, setActiveTab] = useState<'appointments' | 'articles'>('appointments');
  const [appointments, setAppointments] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  
  const [blogData, setBlogData] = useState({ 
    title: '', excerpt: '', content: '', category: 'General', readTime: '5 min', imageUrl: '' 
  });

  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  // Only fetch data IF the user is authenticated!
  useEffect(() => {
    if (isAuthenticated) {
      fetchAppointments();
      fetchBlogs();
    }
  }, [isAuthenticated]);

  async function fetchAppointments() {
    try {
      const res = await fetch('/api/contact');
      const data = await res.json();
      if (Array.isArray(data)) setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchBlogs() {
    try {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      if (Array.isArray(data)) setBlogs(data);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    }
  }

  // --- LOGIN HANDLER ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Change "Vraj@Admin" to whatever secret password you want!
    if (passwordInput === "vraj2026") {
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
      setPasswordInput('');
    }
  };

  // ==========================================
  // 1. THE LOGIN SCREEN (Shows if not logged in)
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-8 rounded-2xl shadow-2xl w-full max-w-md relative z-10">
          <div className="flex justify-center mb-6">
            <div className="bg-teal-500/20 p-4 rounded-full border border-teal-500/30 text-teal-400">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            </div>
          </div>
          <h1 className="text-2xl font-black text-white text-center mb-2 tracking-wide">Restricted Access</h1>
          <p className="text-slate-400 text-center text-sm font-medium mb-8">Please enter the master password to access the NexusPortal.</p>
          
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <input 
                type="password" 
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter password..."
                className={`w-full bg-slate-950 border ${loginError ? 'border-red-500 focus:ring-red-500' : 'border-slate-700 focus:ring-teal-500'} text-white px-4 py-3 rounded-lg outline-none focus:ring-2 transition-all text-center font-bold tracking-widest`}
                autoFocus
              />
              {loginError && <p className="text-red-400 text-xs font-bold text-center mt-2 mt-2">Incorrect password. Access denied.</p>}
            </div>
            <button type="submit" className="w-full bg-teal-600 hover:bg-teal-500 text-white font-black py-3 rounded-lg transition-colors shadow-lg hover:shadow-teal-500/25">
              Unlock Dashboard
            </button>
          </form>
          <div className="mt-8 text-center border-t border-slate-800 pt-6">
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Secured by NexusNode</p>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // 2. THE LOADING SCREEN (Shows while fetching data)
  // ==========================================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <svg className="animate-spin h-8 w-8 text-teal-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          <div className="text-teal-800 font-bold tracking-wide">Loading System...</div>
        </div>
      </div>
    );
  }

  // THE REST OF YOUR EXISTING DASHBOARD FUNCTIONS...
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    showToast("Uploading image to server...", "success");

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=05b08b2c27598b33b2ec61001fdc2d1a`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setBlogData({ ...blogData, imageUrl: data.data.url });
        showToast("Image uploaded successfully!");
      } else {
        showToast("Failed to upload image.", "error");
      }
    } catch (error) {
      console.error("Upload error:", error);
      showToast("Error connecting to image server.", "error");
    } finally {
      setIsUploading(false);
    }
  };

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isUploading) {
      showToast("Please wait for the image to finish uploading.", "error");
      return;
    }
    try {
      const res = await fetch('/api/blogs', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogData),
      });
      if (res.ok) {
        showToast("Article published successfully!");
        setBlogData({ title: '', excerpt: '', content: '', category: 'General', readTime: '5 min', imageUrl: '' });
        const fileInput = document.getElementById('image-upload') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
        fetchBlogs();
      } else {
        showToast("Failed to publish article.", "error");
      }
    } catch (error) {
      showToast("An error occurred.", "error");
    }
  };

  const handleDeleteAppointment = async (id: string) => {
    if (!window.confirm("Permanently delete this appointment record?")) return; 
    try {
      const res = await fetch(`/api/contact/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setAppointments(appointments.filter((appt) => appt._id !== id));
        showToast("Appointment record deleted.");
      } else {
        showToast("Failed to delete record.", "error");
      }
    } catch (error) {
      showToast("An error occurred.", "error");
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!window.confirm("Permanently delete this article?")) return; 
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setBlogs(blogs.filter((blog) => blog._id !== id));
        showToast("Article removed from website.");
      } else {
        showToast("Failed to delete article.", "error");
      }
    } catch (error) {
      showToast("An error occurred.", "error");
    }
  };

  const handleWhatsAppMessage = (name: string, phone: string, date: string, type: string) => {
    let cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length === 10) cleanPhone = '91' + cleanPhone;
    const typeText = type === 'Online' ? 'an Online Consultation 💻' : 'an In-Clinic Appointment 🏥';
    const message = `Hello ${name}, this is the reception at Vraj Homeopathy.\n\nWe received your request for ${typeText} on ${date}. Could you please let us know what time works best for you to connect?`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${cleanPhone}?text=${encodedMessage}`, '_blank');
  };

  // ==========================================
  // 3. THE ACTUAL DASHBOARD (Shows only after password)
  // ==========================================
  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-12">
      
      {/* Toast Notification */}
      <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${toast.show ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
        <div className={`px-6 py-3 rounded-lg shadow-xl font-bold text-white text-sm flex items-center gap-2 ${toast.type === 'success' ? 'bg-slate-900' : 'bg-red-600'}`}>
          {toast.type === 'success' ? (
            <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          )}
          {toast.message}
        </div>
      </div>

      {/* Admin Top Navigation */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="bg-teal-700 text-white p-2 rounded-lg shadow-inner">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
              </div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight">Nexus<span className="text-teal-600 font-medium">Portal</span></h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900">Dr. Shruti Vanpariya</p>
                <p className="text-xs font-bold text-teal-600 uppercase tracking-wider">Administrator</p>
              </div>
              {/* Added a quick Logout button here */}
              <button onClick={() => setIsAuthenticated(false)} className="h-10 px-4 bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 font-bold shadow-sm hover:bg-slate-200 transition-colors text-sm">
                Lock 🔒
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-8 mt-2">
            <button 
              onClick={() => setActiveTab('appointments')}
              className={`pb-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${activeTab === 'appointments' ? 'border-teal-600 text-teal-800' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              Patient Roster
            </button>
            <button 
              onClick={() => setActiveTab('articles')}
              className={`pb-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${activeTab === 'articles' ? 'border-teal-600 text-teal-800' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v10a2 2 0 01-2 2z"></path></svg>
              Content Manager
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* ==================== APPOINTMENTS TAB ==================== */}
        {activeTab === 'appointments' && (
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 bg-white flex justify-between items-center">
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                Incoming Requests
              </h2>
              <span className="bg-teal-50 text-teal-700 text-xs font-bold px-3 py-1.5 rounded-md border border-teal-100 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
                {appointments.length} Total
              </span>
            </div>

            {appointments.length === 0 ? (
              <div className="p-16 text-center flex flex-col items-center">
                <div className="bg-slate-50 p-4 rounded-full mb-3">
                  <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
                </div>
                <p className="text-slate-900 font-bold text-lg">No appointments scheduled</p>
                <p className="text-slate-500 font-medium text-sm mt-1">New patient requests will appear here automatically.</p>
              </div>
            ) : (
              <>
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-black">
                        <th className="px-6 py-4">Patient Name</th>
                        <th className="px-6 py-4">Contact Info</th>
                        <th className="px-6 py-4">Requested Date</th>
                        <th className="px-6 py-4">Type</th>
                        <th className="px-6 py-4">Symptoms / Notes</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {appointments.map((appt) => (
                        <tr key={appt._id} className="hover:bg-slate-50/80 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-xs uppercase">
                                {appt.name.charAt(0)}
                              </div>
                              <span className="font-bold text-slate-900">{appt.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 font-medium text-slate-600 flex items-center gap-2">
                            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                            {appt.phone}
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-sm font-bold bg-slate-100 text-slate-700 border border-slate-200">
                              <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                              {appt.date}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-black uppercase tracking-wider border ${
                              appt.consultationType === 'Online' 
                                ? 'bg-blue-50 text-blue-700 border-blue-200' 
                                : 'bg-teal-50 text-teal-700 border-teal-200'
                            }`}>
                              {appt.consultationType === 'Online' ? (
                                <>
                                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                                  Online
                                </>
                              ) : (
                                <>
                                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                                  In-Clinic
                                </>
                              )}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-600 font-medium max-w-xs truncate" title={appt.symptoms}>
                            {appt.symptoms || "—"}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button 
                                onClick={() => handleWhatsAppMessage(appt.name, appt.phone, appt.date, appt.consultationType || 'In-Clinic')}
                                className="inline-flex items-center justify-center p-2 text-emerald-600 hover:text-white hover:bg-emerald-500 rounded-lg transition-colors border border-transparent hover:border-emerald-600"
                                title="Message on WhatsApp"
                              >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                              </button>
                              <button 
                                onClick={() => handleDeleteAppointment(appt._id)}
                                className="inline-flex items-center justify-center p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                                title="Delete Record"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile View */}
                <div className="md:hidden divide-y divide-slate-100 bg-slate-50 p-4 space-y-4">
                  {appointments.map((appt) => (
                    <div key={appt._id} className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-sm uppercase">
                            {appt.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-black text-slate-900">{appt.name}</p>
                            <div className="flex gap-2 mt-1 flex-wrap">
                              <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
                                {appt.date}
                              </span>
                              <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded border ${
                                appt.consultationType === 'Online' 
                                  ? 'bg-blue-50 text-blue-700 border-blue-200' 
                                  : 'bg-teal-50 text-teal-700 border-teal-200'
                              }`}>
                                {appt.consultationType === 'Online' ? (
                                  <>
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                                    Online
                                  </>
                                ) : (
                                  <>
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                                    In-Clinic
                                  </>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <button onClick={() => handleWhatsAppMessage(appt.name, appt.phone, appt.date, appt.consultationType || 'In-Clinic')} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-md">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                          </button>
                          <button onClick={() => handleDeleteAppointment(appt._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-md">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                          </button>
                        </div>
                      </div>
                      <p className="text-slate-600 font-medium text-sm flex items-center gap-2 mb-2">
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                        {appt.phone}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* ==================== ARTICLES TAB ==================== */}
        {activeTab === 'articles' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-100 bg-white">
                <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                  Publish New Article
                </h2>
              </div>
              <form onSubmit={handleBlogSubmit} className="p-6 space-y-5 bg-slate-50/50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">Article Title</label>
                    <input required className="w-full p-3 bg-white border border-slate-200 rounded-lg text-slate-900 font-medium focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-shadow shadow-sm" placeholder="e.g. Benefits of Homeopathy..." value={blogData.title} onChange={(e) => setBlogData({...blogData, title: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">Upload Cover Image</label>
                    <div className="relative">
                      <input 
                        type="file" 
                        id="image-upload"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={isUploading}
                        className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-900 font-medium file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-bold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 focus:ring-2 focus:ring-teal-500 outline-none transition-all shadow-sm disabled:opacity-50 cursor-pointer" 
                      />
                      {isUploading && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <svg className="animate-spin h-5 w-5 text-teal-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        </div>
                      )}
                    </div>
                    {blogData.imageUrl && !isUploading && (
                      <p className="mt-2 text-xs font-bold text-emerald-600 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        Image securely attached to form!
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">Short Summary</label>
                  <textarea required className="w-full p-3 bg-white border border-slate-200 rounded-lg text-slate-900 font-medium h-20 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none resize-none shadow-sm" placeholder="A brief description for the blog list..." value={blogData.excerpt} onChange={(e) => setBlogData({...blogData, excerpt: e.target.value})} />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="block text-xs font-black text-slate-500 uppercase tracking-wider">Full Content</label>
                    <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded border border-teal-100">Press Enter twice for paragraphs</span>
                  </div>
                  <textarea required className="w-full p-4 bg-white border border-slate-200 rounded-lg text-slate-900 font-medium h-64 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none leading-relaxed resize-none shadow-sm" placeholder="Start writing the full article here..." value={blogData.content} onChange={(e) => setBlogData({...blogData, content: e.target.value})} />
                </div>
                <div className="pt-4 flex justify-end">
                  <button type="submit" disabled={isUploading} className={`text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-md flex items-center gap-2 ${isUploading ? 'bg-slate-400 cursor-not-allowed' : 'bg-slate-900 hover:bg-teal-700'}`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    {isUploading ? 'Uploading Image...' : 'Publish Article'}
                  </button>
                </div>
              </form>
            </div>
            <div className="lg:col-span-1 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col h-full md:max-h-[700px]">
              <div className="px-6 py-5 border-b border-slate-100 bg-white">
                <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                  Library Manager
                </h2>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
                {blogs.length === 0 ? (
                  <div className="text-center py-10">
                    <svg className="w-10 h-10 text-slate-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v10a2 2 0 01-2 2z"></path></svg>
                    <p className="text-slate-500 font-bold text-sm">No articles published yet.</p>
                  </div>
                ) : (
                  blogs.map((blog) => (
                    <div key={blog._id} className="p-4 border border-slate-200 rounded-lg bg-white hover:border-teal-400 hover:shadow-md transition-all group cursor-default">
                      <p className="font-black text-slate-900 text-sm leading-snug mb-2">{blog.title}</p>
                      <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-100">
                        <p className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </p>
                        <button 
                          onClick={() => handleDeleteBlog(blog._id)} 
                          className="text-red-500 hover:text-red-700 p-1.5 hover:bg-red-50 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                          title="Delete Article"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}