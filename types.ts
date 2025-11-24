// Grupos principais de veículos
export enum CarGroup {
  CITY = "Citadinos",
  FAMILY = "Familiares",
  SUV = "SUV",
  ELECTRIC = "Elétricos",
  VAN = "Comerciais",
}

// Tipos de transmissão
export enum Transmission {
  MANUAL = "Manual",
  AUTOMATIC = "Automático",
}

// Tipo de combustível ou energia
export enum FuelType {
  PETROL = "Gasolina",
  DIESEL = "Diesel",
  ELECTRIC = "Elétrico",
}

// Estrutura de um veículo no sistema
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
  isAvailable: boolean;
}

// Critérios usados na pesquisa pelo utilizador
export interface SearchCriteria {
  pickupLocation: string;
  dropoffLocation: string;
  startDate: string;
  endDate: string;
  pickupTime: string;
  dropoffTime: string;
}

// Resumo final de uma reserva
export interface BookingSummary {
  car: Car;
  totalDays: number;
  totalPrice: number;
}
