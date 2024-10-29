export interface Attraction {
  id: string;
  name: string;
  description: string;
  location: string;
  latitude: number;
  longitude: number;
  price: number;
  rating: number;
  reviews_count: number;
  images: string[];
  features: string[];
  opening_hours: {
    [key: string]: {
      open: string;
      close: string;
    };
  };
  tickets: AttractionTicket[];
}

export interface AttractionTicket {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  inclusions: string[];
  exclusions: string[];
}