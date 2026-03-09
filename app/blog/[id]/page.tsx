"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function BlogPost() {
  const params = useParams(); // Safely extracts the ID from the URL
  const id = params?.id;
  
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    // Fetch the specific blog from our API
    fetch(`/api/blogs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBlog(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blog:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-2xl font-black text-black animate-pulse">Loading Article...</div>
      </div>
    );
  }

  if (!blog || blog.error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
        <h1 className="text-4xl font-black text-black mb-4">Article Not Found</h1>
        <p className="text-slate-900 font-medium mb-8">The blog post you are looking for doesn't exist or was deleted.</p>
        <Link href="/blog" className="bg-black text-white px-8 py-3 rounded-xl font-bold hover:bg-teal-700 transition">
          ← Back to All Articles
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 md:px-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        
        {/* Blog Image */}
        {blog.imageUrl && (
          <div className="w-full h-64 md:h-96 bg-slate-200 relative">
            <img 
              src={blog.imageUrl} 
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Blog Content */}
        <div className="p-8 md:p-12">
          <Link href="/blog" className="text-teal-700 font-bold hover:text-teal-900 mb-8 inline-block transition-colors">
            ← Back to Articles
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-black text-black leading-tight mb-6">
            {blog.title}
          </h1>
          
          <div className="flex items-center gap-3 mb-10 pb-10 border-b-2 border-slate-100">
            <div className="h-12 w-12 bg-teal-100 rounded-full flex items-center justify-center text-xl">👩‍⚕️</div>
            <div>
              <p className="font-bold text-black">Dr. Shruti Vanpariya</p>
              <p className="text-sm font-bold text-slate-500">
                {new Date(blog.createdAt).toLocaleDateString('en-IN', {
                  year: 'numeric', month: 'long', day: 'numeric'
                })}
              </p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none text-black font-medium leading-relaxed whitespace-pre-wrap">
            {blog.content}
          </div>
        </div>
      </div>
    </div>
  );
}