export enum CarGroup {
  CITY = 'Citadinos',
  FAMILY = 'Familiares',
  SUV = 'SUV & Conforto',
  ELECTRIC = 'Elétricos (Novo)',
  VAN = 'Comerciais'
}

export enum Transmission {
  MANUAL = 'Manual',
  AUTOMATIC = 'Automático'
}

export enum FuelType {
  PETROL = 'Gasolina',
  DIESEL = 'Diesel',
  ELECTRIC = 'Elétrico'
}

export interface Car {
  id: string;
  name: string;
  group: CarGroup;
  image: string;
  pricePerDay: number;
  seats: number;
  transmission: Transmission;
  fuel: FuelType;
  features: string[];
  isAvailable: boolean; // For simulation
}

export interface SearchCriteria {
  pickupLocation: string;
  dropoffLocation: string;
  startDate: string;
  endDate: string;
  pickupTime: string;
  dropoffTime: string;
}

export interface BookingSummary {
  car: Car;
  totalDays: number;
  totalPrice: number;
}