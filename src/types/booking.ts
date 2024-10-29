export type BookingType = 'tour' | 'hotel' | 'ticket' | 'attraction' | 'transfer';

export interface TransferSearchParams {
  pickupLocation: string;
  dropoffLocation: string;
  date: Date;
  time: string;
  passengers: number;
  luggage: number;
}

export interface Vehicle {
  id: string;
  name: string;
  category: 'economy' | 'business' | 'first' | 'van';
  description: string;
  image: string;
  thumbnailImage: string;
  maxPassengers: number;
  maxLuggage: number;
  price: number;
  features: string[];
  cancellation?: string;
  inclusions: string[];
  terms: string[];
}

export interface CartItem {
  id: string;
  type: BookingType;
  title: string;
  image: string;
  date: string;
  time?: string;
  price: number;
  quantity: number;
  details: {
    [key: string]: string | number;
  };
}