import { Car, CarGroup, FuelType, Transmission } from './types';

export const APP_NAME = "Silva Rent-a-Car";
export const LOCATIONS = ["Lisboa Aeroporto", "Porto Aeroporto", "Faro Aeroporto", "Lisboa Centro", "Porto Centro"];

// Simulation of fleet data for 2026
export const MOCK_FLEET: Car[] = [
  {
    id: 'c1',
    name: 'Renault Clio V',
    group: CarGroup.CITY,
    image: 'https://picsum.photos/400/250?random=1',
    pricePerDay: 35,
    seats: 5,
    transmission: Transmission.MANUAL,
    fuel: FuelType.PETROL,
    features: ['Económico para cidade', 'Fácil estacionamento', 'Bluetooth/CarPlay'],
    isAvailable: true
  },
  {
    id: 'c2',
    name: 'Fiat 500 Hybrid',
    group: CarGroup.CITY,
    image: 'https://picsum.photos/400/250?random=2',
    pricePerDay: 30,
    seats: 4,
    transmission: Transmission.MANUAL,
    fuel: FuelType.PETROL,
    features: ['Estilo urbano', 'Baixo consumo', 'Ideal para 2 pessoas'],
    isAvailable: true
  },
  {
    id: 'f1',
    name: 'Renault Megane GrandTour',
    group: CarGroup.FAMILY,
    image: 'https://picsum.photos/400/250?random=3',
    pricePerDay: 55,
    seats: 5,
    transmission: Transmission.MANUAL,
    fuel: FuelType.DIESEL,
    features: ['Bagageira XXL', 'Conforto em autoestrada', 'ISOFIX incluído'],
    isAvailable: true
  },
  {
    id: 'e1',
    name: 'Peugeot e-2008',
    group: CarGroup.ELECTRIC,
    image: 'https://picsum.photos/400/250?random=4',
    pricePerDay: 65,
    seats: 5,
    transmission: Transmission.AUTOMATIC,
    fuel: FuelType.ELECTRIC,
    features: ['Autonomia 400km', 'Zero emissões', 'Carregamento rápido'],
    isAvailable: false // Simulation: This car is booked
  },
  {
    id: 's1',
    name: 'Nissan Qashqai',
    group: CarGroup.SUV,
    image: 'https://picsum.photos/400/250?random=5',
    pricePerDay: 70,
    seats: 5,
    transmission: Transmission.AUTOMATIC,
    fuel: FuelType.PETROL,
    features: ['Posição condução alta', 'Câmera 360º', 'Espaçoso para viagens'],
    isAvailable: true
  },
  {
    id: 'v1',
    name: 'Mercedes Vito',
    group: CarGroup.VAN,
    image: 'https://picsum.photos/400/250?random=6',
    pricePerDay: 110,
    seats: 9,
    transmission: Transmission.AUTOMATIC,
    fuel: FuelType.DIESEL,
    features: ['Ideal para grupos', 'Ar condicionado traseiro', 'Portas laterais'],
    isAvailable: true
  }
];

export const SYSTEM_INSTRUCTION = 
`You are "SilvaBot", the virtual assistant for Silva Rent-a-Car in Portugal.
Our mission: Provide reliable, modern car rentals for tourists and businesses.
We are launching our new platform for 2026.
Fleet info: We have grown from 60 to over 100 vehicles. We now offer Electrics and Automatics.
Car Groups: City (Citadinos), Family (Familiares), SUV, Electric (Elétricos), Vans.
Key Value Propositions:
1. Zero Overbooking (Guaranteed availability).
2. Rigorous Verification (Clean, fueled, checked cars).
3. Transparent Pricing (No hidden fees).

Tone: Professional, helpful, polite, concise.
Language: Portuguese (Portugal).
If asked about booking, guide them to the search form at the top of the page.`;