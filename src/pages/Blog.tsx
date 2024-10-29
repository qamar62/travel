import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiClock, FiArrowRight } from 'react-icons/fi';
import SEO from '../components/SEO';
import { seoConfig } from '../utils/seoConfig';

const blogPosts = [
  {
    id: 1,
    title: "Top 10 Must-Visit Destinations in Dubai",
    excerpt: "Discover the most iconic and breathtaking locations in Dubai that you absolutely can't miss on your next visit.",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
    category: "Travel Guide",
    author: "Sarah Johnson",
    date: "2024-01-10",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Ultimate Desert Safari Experience: What to Expect",
    excerpt: "Everything you need to know about planning and enjoying an unforgettable desert safari in Dubai.",
    image: "https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=800",
    category: "Experience",
    author: "Michael Chen",
    date: "2024-01-08",
    readTime: "7 min read"
  },
  {
    id: 3,
    title: "Best Time to Visit Dubai: A Seasonal Guide",
    excerpt: "Plan your trip to Dubai with our comprehensive guide on weather, events, and peak seasons.",
    image: "https://images.unsplash.com/photo-1582672752486-dab67774f8f2?w=800",
    category: "Travel Tips",
    author: "Emma Wilson",
    date: "2024-01-05",
    readTime: "6 min read"
  }
];

const categories = [
  "All",
  "Travel Guide",
  "Experience",
  "Travel Tips",
  "Culture",
  "Food & Dining"
];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = selectedCategory === "All"
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <>
      <SEO {...seoConfig.blog} />
      <div className="bg-white">
        {/* Hero Section */}
        <div className="relative h-[400px] bg-primary-900">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=1200"
              alt="Blog Hero"
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-primary-900/50 to-primary-900/90" />
          <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center">
            <div className="text-white">
              <h1 className="text-5xl font-bold mb-4">Travel Blog</h1>
              <p className="text-xl text-primary-100">
                Discover travel tips, guides, and stories from around the world
              </p>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="group"
              >
                <article className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <FiCalendar className="mr-1" />
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center">
                          <FiClock className="mr-1" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <FiArrowRight className="text-primary-600 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}