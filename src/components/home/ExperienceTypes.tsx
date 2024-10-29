import { FiSunrise, FiCamera, FiAward } from 'react-icons/fi';

const experiences = [
  {
    icon: <FiSunrise className="w-8 h-8" />,
    title: "Desert Adventures",
    description: "Experience thrilling dune bashing, camel rides, and magical desert sunsets"
  },
  {
    icon: <FiCamera className="w-8 h-8" />,
    title: "Cultural Tours",
    description: "Discover the rich heritage and traditions of the UAE"
  },
  {
    icon: <FiAward className="w-8 h-8" />,
    title: "Luxury Experiences",
    description: "Indulge in premium tours and exclusive access to iconic landmarks"
  }
];

export default function ExperienceTypes() {
  return (
    <div className="bg-primary-50 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary-900">Unforgettable Experiences</h2>
          <p className="text-primary-600 mt-2">Choose from our wide range of carefully curated experiences</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {experiences.map((exp, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-primary-600 mb-4">{exp.icon}</div>
              <h3 className="text-xl font-semibold text-primary-900 mb-2">{exp.title}</h3>
              <p className="text-primary-600">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}