const destinations = [
  {
    name: "Dubai",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=500",
    tours: 156,
    description: "The city of future, luxury, and endless possibilities"
  },
  {
    name: "Abu Dhabi",
    image: "https://images.unsplash.com/photo-1511497584788-876760111969?w=500",
    tours: 89,
    description: "A perfect blend of culture, art, and modern architecture"
  },
  {
    name: "Sharjah",
    image: "https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=500",
    tours: 45,
    description: "The cultural heart of the UAE"
  },
  {
    name: "Ras Al Khaimah",
    image: "https://images.unsplash.com/photo-1577560688665-8e8baa4c8568?w=500",
    tours: 34,
    description: "Adventure and nature at its finest"
  }
];

export default function TopDestinations() {
  return (
    <div className="bg-gradient-to-b from-primary-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary-900">Top UAE Destinations</h2>
          <p className="text-primary-600 mt-2">Explore the most beautiful emirates of the UAE</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-xl">
                <img 
                  src={dest.image} 
                  alt={dest.name}
                  className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-xl font-bold mb-1">{dest.name}</h3>
                  <p className="text-sm text-gray-200 mb-2">{dest.description}</p>
                  <span className="text-primary-300">{dest.tours} tours</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}