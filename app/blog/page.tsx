"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch('/api/blogs');
        const data = await res.json();

        // THE CRASH HELMET
        if (Array.isArray(data)) {
          setBlogs(data);
        } else {
          console.error("Expected an array of blogs, but got:", data);
          setBlogs([]);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Health & Wellness <span className="text-teal-600">Blog</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Insights, tips, and natural remedies from Dr. Shruti Vanpariya.
          </p>
        </div>
        
        {loading ? (
          <div className="text-center text-teal-600 text-xl font-medium py-20 animate-pulse">Loading articles...</div>
        ) : !Array.isArray(blogs) || blogs.length === 0 ? (
          <div className="text-center bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
            <span className="text-4xl mb-4 block">📝</span>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No articles published yet.</h3>
            <p className="text-gray-500">Check back soon for new health and wellness updates!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog: any) => (
              <article key={blog._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                
                {/* NEW: Dynamic Background Image Section */}
                <div 
                  className="h-56 bg-teal-100 bg-cover bg-center flex items-center justify-center text-teal-600 font-medium relative overflow-hidden group"
                  // This injects the image URL directly into the CSS background
                  style={{ backgroundImage: `url(${blog.imageUrl || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1000'})` }}
                >
                  {/* Subtle dark overlay to make it look premium on hover */}
                  <div className="absolute inset-0 bg-teal-900 opacity-10 group-hover:opacity-30 transition-opacity duration-300 z-10"></div>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">{blog.category}</span>
                    <span className="text-gray-400 text-sm">{blog.readTime}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 leading-snug">{blog.title}</h2>
                  <p className="text-gray-600 mb-6 line-clamp-3 flex-grow">{blog.excerpt}</p>
                  <Link href={`/blog/${blog._id}`} className="inline-flex items-center gap-2 text-teal-600 font-bold hover:text-teal-800 transition-colors mt-auto group">
                    Read Full Article 
                    <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
        
      </div>
    </div>
  );
}