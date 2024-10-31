export interface TourImage {
  image: string;
  is_primary?: boolean;
}

export interface Tour {
  id: string;
  title: string;
  description: string;
  base_price: number;
  duration: string;
  location: string;
  rating: number;
  available_days: number;
  reviews_count: number;
  images: TourImage[];
  max_group_size: number;
  dates?: TourDate[];
  highlights?: string[];
  included?: string[];
  not_included?: string[];
  start_time?: string;
  languages?: string[];
}

export interface TourDate {
  id: string;
  date: string;
  available_spots: number;
  price_modifier: number;
}

export interface TourSearchParams {
  search?: string;
  location?: string;
  date?: string;
  price_min?: number;
  price_max?: number;
}