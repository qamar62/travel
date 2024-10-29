import { useParams, Link } from 'react-router-dom';
import { FiCalendar, FiClock, FiArrowLeft, FiShare2 } from 'react-icons/fi';
import SEO from '../components/SEO';

// This would typically come from an API
const blogPost = {
  id: 1,
  title: "Top 10 Must-Visit Destinations in Dubai",
  content: `
    <p>Dubai, a city of superlatives, offers an incredible array of attractions that cater to every type of traveler. From record-breaking architecture to natural wonders, here are the top 10 destinations you absolutely must visit during your trip to Dubai.</p>

    <h2>1. Burj Khalifa</h2>
    <p>Standing at an impressive 828 meters, the Burj Khalifa is the world's tallest building. Visit the observation decks on the 124th, 125th, or 148th floors for breathtaking views of the city.</p>

    <h2>2. Dubai Mall</h2>
    <p>More than just a shopping destination, Dubai Mall is an entertainment complex featuring the Dubai Aquarium, an ice rink, and the famous Dubai Fountain show.</p>

    <h2>3. Palm Jumeirah</h2>
    <p>This man-made island in the shape of a palm tree is home to luxury hotels, restaurants, and beautiful beaches. Don't miss the Atlantis resort at its crown.</p>

    <h2>4. Dubai Desert Conservation Reserve</h2>
    <p>Experience the magic of the Arabian desert through activities like dune bashing, camel riding, and traditional Bedouin camps under the stars.</p>

    <h2>5. Dubai Marina</h2>
    <p>This artificial canal city offers stunning waterfront dining, luxury yachts, and beautiful walking paths along the marina.</p>
  `,
  image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200",
  category: "Travel Guide",
  author: {
    name: "Sarah Johnson",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    bio: "Travel writer and Dubai expert with over 10 years of experience exploring the UAE."
  },
  date: "2024-01-10",
  readTime: "5 min read"
};

export default function BlogPost() {
  const { id } = useParams();

  return (
    <>
      <SEO
        title={blogPost.title}
        description="Discover the most iconic and breathtaking locations in Dubai that you absolutely can't miss on your next visit."
        image={blogPost.image}
        type="article"
      />
      <div className="bg-white">
        {/* Hero Section */}
        <div className="relative h-[60vh] bg-gray-900">
          <div className="absolute inset-0">
            <img
              src={blogPost.image}
              alt={blogPost.title}
              className="w-full h-full object-cover opacity-70"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white max-w-4xl mx-auto">
            <div className="mb-4">
              <Link
                to="/blog"
                className="inline-flex items-center text-primary-300 hover:text-primary-200"
              >
                <FiArrowLeft className="mr-2" />
                Back to Blog
              </Link>
            </div>
            <span className="inline-block bg-primary-600 text-white px-3 py-1 rounded-full text-sm mb-4">
              {blogPost.category}
            </span>
            <h1 className="text-4xl font-bold mb-4">{blogPost.title}</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <FiCalendar className="mr-1" />
                <span>{new Date(blogPost.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <FiClock className="mr-1" />
                <span>{blogPost.readTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Author Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="text-center mb-6">
                  <img
                    src={blogPost.author.avatar}
                    alt={blogPost.author.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4"
                  />
                  <h3 className="font-semibold text-gray-900">
                    {blogPost.author.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">
                    {blogPost.author.bio}
                  </p>
                </div>
                <div className="border-t pt-6">
                  <button className="w-full flex items-center justify-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                    <FiShare2 />
                    <span>Share Article</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}