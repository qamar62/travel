interface SEOConfig {
  [key: string]: {
    title: string;
    description: string;
    keywords?: string;
  };
}

export const seoConfig: SEOConfig = {
  home: {
    title: 'Discover Amazing Tours Worldwide',
    description: 'Book unforgettable tours and activities for your next adventure. Find the best experiences with aiTours.',
    keywords: 'tours, activities, travel, adventure, booking, experiences, worldwide tours, dubai tours, dubai desert safari, dubai packages'
  },
  tour: {
    title: 'Tour Details',
    description: 'Explore detailed information about our amazing tours. Book your next adventure with aiTours.',
    keywords: 'tour details, booking, activities, desert safari, dubai desert safari, best desert safari , dubai tour, uae tours, travel uae , best attraction in dubai , arabian nights, travel experience, adventure tours'
  },
  blog: {
    title: 'Travel Blog - Tips, Guides & Stories',
    description: 'Discover travel tips, destination guides, and inspiring stories from around the world.',
    keywords: 'travel blog, travel tips, destination guides, travel stories, travel inspiration, dubai blog, uae travel'
  },
  about: {
    title: 'About Us',
    description: 'Learn about aiTours and our mission to provide unforgettable travel experiences worldwide.',
    keywords: 'about us, travel company, tour operator, travel experiences'
  },
  contact: {
    title: 'Contact Us',
    description: 'Get in touch with aiTours. We\'re here to help you plan your next adventure.',
    keywords: 'contact, support, help, customer service, travel assistance'
  },
  faq: {
    title: 'Frequently Asked Questions',
    description: 'Find answers to common questions about booking tours and activities with aiTours.',
    keywords: 'FAQ, help, support, questions, answers, tour booking'
  },
  terms: {
    title: 'Terms of Service',
    description: 'Read our terms of service and booking conditions for tours and activities.',
    keywords: 'terms, conditions, service, legal, booking terms'
  },
  privacy: {
    title: 'Privacy Policy',
    description: 'Learn how we protect your privacy and handle your personal information.',
    keywords: 'privacy, policy, data protection, personal information'
  }
};