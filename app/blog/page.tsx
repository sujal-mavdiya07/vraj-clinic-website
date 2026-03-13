"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';

export default function BlogPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
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

  // --- Animation Variants ---
  const headerVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 sm:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={headerVariants}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Health & Wellness{" "}
            {/* ✨ THE PREMIUM SHEEN EFFECT ✨ */}
            <motion.span
              className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-300 to-teal-600 bg-[length:200%_auto]"
              animate={{ backgroundPosition: ["0% center", "200% center"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              Blog
            </motion.span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Insights, tips, and natural remedies from Dr. Shruti Vanpariya.
          </p>
        </motion.div>
        
        {loading ? (
          <div className="text-center text-teal-600 text-xl font-medium py-20 animate-pulse">Loading articles...</div>
        ) : !Array.isArray(blogs) || blogs.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center bg-white rounded-2xl shadow-sm border border-gray-100 p-12"
          >
            <span className="text-4xl mb-4 block">📝</span>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No articles published yet.</h3>
            <p className="text-gray-500">Check back soon for new health and wellness updates!</p>
          </motion.div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {blogs.map((blog: any) => (
              <motion.article 
                key={blog._id} 
                variants={cardVariants}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col group"
              >
                
                {/* Dynamic Background Image Section */}
                <div 
                  className="h-56 bg-teal-100 bg-cover bg-center flex items-center justify-center text-teal-600 font-medium relative overflow-hidden"
                  style={{ backgroundImage: `url(${blog.imageUrl || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1000'})` }}
                >
                  <motion.div 
                    className="absolute inset-0 bg-teal-900 opacity-10 z-10"
                    whileHover={{ opacity: 0.3 }}
                    transition={{ duration: 0.3 }}
                  ></motion.div>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">{blog.category}</span>
                    <span className="text-gray-400 text-sm">{blog.readTime}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 leading-snug group-hover:text-teal-700 transition-colors">{blog.title}</h2>
                  <p className="text-gray-600 mb-6 line-clamp-3 flex-grow">{blog.excerpt}</p>
                  <Link href={`/blog/${blog._id}`} className="inline-flex items-center gap-2 text-teal-600 font-bold hover:text-teal-800 transition-colors mt-auto group/link">
                    Read Full Article 
                    <span aria-hidden="true" className="group-hover/link:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}
        
      </div>
    </div>
  );
}