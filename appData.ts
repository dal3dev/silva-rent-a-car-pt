// appData.ts
import { Car, CarGroup, FuelType, Transmission } from "./types";

// Nome da aplicação
export const APP_NAME = "Silva Rent-a-Car";

// Lista de localizações onde operamos
export const LOCATIONS = [
  "Lisboa Aeroporto",
  "Porto Aeroporto",
  "Faro Aeroporto",
  "Lisboa Centro",
  "Porto Centro",
];

// Frota simulada para demonstração
export const MOCK_FLEET: Car[] = [
  {
    id: "c1",
    name: "Renault Clio V",
    group: CarGroup.CITY,
    image: "https://picsum.photos/400/250?random=1",
    pricePerDay: 35,
    seats: 5,
    transmission: Transmission.MANUAL,
    fuel: FuelType.PETROL,
    features: ["Económico para cidade", "Fácil estacionamento", "Bluetooth/CarPlay"],
    isAvailable: true,
  },
  {
    id: "c2",
    name: "Fiat 500 Hybrid",
    group: CarGroup.CITY,
    image: "https://picsum.photos/400/250?random=2",
    pricePerDay: 30,
    seats: 4,
    transmission: Transmission.MANUAL,
    fuel: FuelType.PETROL,
    features: ["Estilo urbano", "Baixo consumo", "Ideal para 2 pessoas"],
    isAvailable: true,
  },
  {
    id: "f1",
    name: "Renault Megane GrandTour",
    group: CarGroup.FAMILY,
    image: "https://picsum.photos/400/250?random=3",
    pricePerDay: 55,
    seats: 5,
    transmission: Transmission.MANUAL,
    fuel: FuelType.DIESEL,
    features: ["Bagageira grande", "Confortável em autoestrada", "ISOFIX incluído"],
    isAvailable: true,
  },
  {
    id: "e1",
    name: "Peugeot e-2008",
    group: CarGroup.ELECTRIC,
    image: "https://picsum.photos/400/250?random=4",
    pricePerDay: 65,
    seats: 5,
    transmission: Transmission.AUTOMATIC,
    fuel: FuelType.ELECTRIC,
    features: ["Autonomia 400 km", "Zero emissões", "Carregamento rápido"],
    isAvailable: false,
  },
  {
    id: "s1",
    name: "Nissan Qashqai",
    group: CarGroup.SUV,
    image: "https://picsum.photos/400/250?random=5",
    pricePerDay: 70,
    seats: 5,
    transmission: Transmission.AUTOMATIC,
    fuel: FuelType.PETROL,
    features: ["Condução elevada", "Câmara 360º", "Espaçoso para viagens"],
    isAvailable: true,
  },
  {
    id: "v1",
    name: "Mercedes Vito",
    group: CarGroup.VAN,
    image: "https://picsum.photos/400/250?random=6",
    pricePerDay: 110,
    seats: 9,
    transmission: Transmission.AUTOMATIC,
    fuel: FuelType.DIESEL,
    features: ["Ideal para grupos", "Ar condicionado traseiro", "Portas laterais"],
    isAvailable: true,
  },
];

// Texto base para IA (se for usado)
export const SYSTEM_INSTRUCTION = `
És o "SilvaBot", assistente virtual da Silva Rent-a-Car.
Objetivo: ajudar clientes a encontrar o carro certo para a sua reserva.
Operamos em Lisboa, Porto e Faro, com frota renovada para 2026.
Grupos: Citadinos, Familiares, SUV, Elétricos e Vans.

Tom: profissional, educado, direto.
Idioma: Português de Portugal.
Se perguntarem por reservas, encaminha para o formulário no topo da página.
`;
