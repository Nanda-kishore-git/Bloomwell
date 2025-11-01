import React from 'react';

const blogPosts = [
  {
    id: 1,
    title: "5 Natural Ways to Manage PCOS",
    description: "Discover effective natural strategies to manage Polycystic Ovary Syndrome symptoms and improve your hormonal health.",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Yoga Poses for Hormonal Balance",
    description: "Learn specific yoga poses that can help restore hormonal balance and promote overall wellness.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Herbal Remedies for Period Health",
    description: "Explore traditional herbal remedies that can support menstrual health and alleviate period-related discomfort.",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

function Blog() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-[#2B2B2B] mb-4 text-center">Blog</h1>
        <p className="text-xl text-gray-600 mb-12 text-center">Read our latest articles and wellness tips.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#2B2B2B] mb-3">{post.title}</h3>
                <p className="text-gray-600">{post.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blog;