"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function BlogPostPage() {
  const { id } = useParams(); // Grabs the ID from the URL
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await fetch(`/api/blogs/${id}`); // We will create this API next
        const data = await res.json();
        setBlog(data);
      } catch (err) {
        console.error("Error loading blog", err);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchBlog();
  }, [id]);

  if (loading) return <div className="text-center py-20">Loading article...</div>;
  if (!blog) return <div className="text-center py-20">Blog post not found.</div>;

  return (
    <article className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-teal-50 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/blog" className="text-teal-600 font-semibold mb-8 inline-block">← Back to Blog</Link>
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-teal-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              {blog.category}
            </span>
            <span className="text-gray-500 text-sm">{blog.date}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            {blog.title}
          </h1>
          <p className="mt-6 text-xl text-gray-600 italic">
            {blog.excerpt}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="prose prose-lg prose-teal max-w-none text-gray-800 leading-relaxed whitespace-pre-wrap">
          {blog.content}
        </div>
        
        <div className="mt-16 pt-8 border-t border-gray-100">
          <div className="bg-teal-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-teal-900 mb-2">Need a consultation?</h3>
            <p className="text-teal-700 mb-6">Dr. Shruti Vanpariya is here to help you heal naturally.</p>
            <Link href="/contact" className="bg-teal-600 text-white px-8 py-3 rounded-full font-bold hover:bg-teal-700 transition">
              Book Appointment Now
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}