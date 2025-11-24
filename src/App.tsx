import React, { useState } from 'react';
import { 
  Car as CarIcon, 
  Calendar, 
  MapPin, 
  CheckCircle, 
  ShieldCheck, 
  CreditCard, 
  ChevronRight, 
  Menu, 
  X, 
  Phone, 
  Mail,
  Search,
  Briefcase,
  AlertCircle
} from 'lucide-react';
import { Car, CarGroup, SearchCriteria, BookingSummary } from './types';
import { MOCK_FLEET, LOCATIONS, APP_NAME } from './constants';
import AssistenteChat from './components/AssistenteChat';
/**
 * App.tsx — versão "humana" (visual parecido; código simples, sem Gemini/Lovable)
 */

/* --------------------------
   Pequenos componentes UI
   -------------------------- */

const SectionTitle: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="text-center mb-12">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{title}</h2>
    {subtitle && <div className="mx-auto w-20 h-1 bg-yellow-400 rounded-full mb-3" />}
    {subtitle && <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
  </div>
);

const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'outline' }
> = ({ variant = 'primary', className = '', children, ...props }) => {
  const base = 'px-4 py-2 rounded-md font-semibold inline-flex items-center gap-2';
  const variantClass =
    variant === 'primary'
      ? 'bg-yellow-400 text-gray-900 shadow-sm'
      : 'border border-gray-300 text-gray-800 bg-white';
  return (
    <button className={`${base} ${variantClass} ${className}`} {...props}>
      {children}
    </button>
  );
};

/* --------------------------
   App
   -------------------------- */

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [view, setView] = useState<'home' | 'results' | 'checkout' | 'success'>('home');

  const [search, setSearch] = useState<SearchCriteria>({
    pickupLocation: LOCATIONS[0],
    dropoffLocation: LOCATIONS[0],
    startDate: '',
    endDate: '',
    pickupTime: '10:00',
    dropoffTime: '10:00'
  });

  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [booking, setBooking] = useState<BookingSummary | null>(null);

  const [filteredCars, setFilteredCars] = useState<Car[]>(MOCK_FLEET);
  const [filterGroup, setFilterGroup] = useState<string>('ALL');
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'store' | null>(null);

  /* helpers */
  const daysBetween = (start?: string, end?: string) => {
    if (!start || !end) return 1;
    const s = new Date(start);
    const e = new Date(end);
    const diff = Math.ceil((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  };

  const calculateTotal = (pricePerDay: number) => {
    const days = daysBetween(search.startDate, search.endDate);
    return days * pricePerDay;
  };

  /* Ações */
  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!search.startDate || !search.endDate) {
      alert('Por favor selecione datas de início e fim.');
      return;
    }
    const available = MOCK_FLEET.filter(c => c.isAvailable);
    setFilteredCars(available);
    setView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookNow = (car: Car) => {
    const total = calculateTotal(car.pricePerDay);
    setBooking({ car, totalDays: daysBetween(search.startDate, search.endDate), totalPrice: total });
    setSelectedCar(car);
    setView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const confirmBooking = () => {
    if (!paymentMethod) {
      alert('Escolha um método de pagamento.');
      return;
    }
    setView('success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* Renderizações pequenas */
  const Header = () => (
    <nav className="bg-white border-b sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('home')}>
          <div className="bg-yellow-400 p-1 rounded text-gray-900"><CarIcon /></div>
          <div className="font-bold text-lg hidden sm:block">{APP_NAME}</div>
          <div className="sm:hidden font-bold">Silva Rent</div>
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm">
          <button onClick={() => setView('home')} className="hover:text-yellow-500">Início</button>
          <button onClick={() => setView('results')} className="hover:text-yellow-500">Frota</button>
          <button className="px-3 py-2 border rounded text-sm">Gerir Reserva</button>
        </div>

        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(v => !v)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4">
          <button className="block py-2 w-full text-left" onClick={() => { setView('home'); setIsMobileMenuOpen(false); }}>Início</button>
          <button className="block py-2 w-full text-left" onClick={() => { setView('results'); setIsMobileMenuOpen(false); }}>Frota</button>
        </div>
      )}
    </nav>
  );

  const Hero = () => (
    <section className="relative bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h1 className="text-4xl font-bold">A Sua Frota de Aluguer em Crescimento</h1>
          <p className="mt-3 text-gray-200">Mais de 100 viaturas modernas. Zero complicações.</p>
        </div>

        <div className="bg-white text-gray-900 rounded-lg p-5 shadow-md max-w-5xl mx-auto">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
            <div>
              <label className="text-xs uppercase text-gray-500">Levantamento</label>
              <div className="relative">
                <div className="absolute left-3 top-3 text-yellow-400"><MapPin size={16} /></div>
                <select
                  className="w-full pl-10 p-2 border rounded"
                  value={search.pickupLocation}
                  onChange={e => setSearch({...search, pickupLocation: e.target.value})}
                >
                  {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs uppercase text-gray-500">Devolução</label>
              <div className="relative">
                <div className="absolute left-3 top-3 text-gray-400"><MapPin size={16} /></div>
                <select
                  className="w-full pl-10 p-2 border rounded"
                  value={search.dropoffLocation}
                  onChange={e => setSearch({...search, dropoffLocation: e.target.value})}
                >
                  {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs uppercase text-gray-500">Início</label>
              <div className="relative">
                <div className="absolute left-3 top-3 text-gray-400"><Calendar size={16} /></div>
                <input
                  type="date"
                  className="w-full pl-10 p-2 border rounded"
                  value={search.startDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={e => setSearch({...search, startDate: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="text-xs uppercase text-gray-500">Fim</label>
              <div className="relative">
                <div className="absolute left-3 top-3 text-gray-400"><Calendar size={16} /></div>
                <input
                  type="date"
                  className="w-full pl-10 p-2 border rounded"
                  value={search.endDate}
                  min={search.startDate || undefined}
                  onChange={e => setSearch({...search, endDate: e.target.value})}
                />
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full">
                <Search size={16} /> Pesquisar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );

  const WhyUs = () => (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle title="Porquê a Silva Rent-a-Car?" subtitle="O nosso compromisso é a sua tranquilidade." />
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-gray-50 rounded">
            <div className="w-12 h-12 bg-yellow-400 rounded flex items-center justify-center mb-4"><CheckCircle /></div>
            <h4 className="font-bold mb-2">Zero Sobreposições</h4>
            <p className="text-sm text-gray-600">Sistema simples para evitar overbooking.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded">
            <div className="w-12 h-12 bg-yellow-400 rounded flex items-center justify-center mb-4"><ShieldCheck /></div>
            <h4 className="font-bold mb-2">Verificação Rigorosa</h4>
            <p className="text-sm text-gray-600">Inspeção antes da entrega.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded">
            <div className="w-12 h-12 bg-yellow-400 rounded flex items-center justify-center mb-4"><CreditCard /></div>
            <h4 className="font-bold mb-2">Preços Transparentes</h4>
            <p className="text-sm text-gray-600">O preço que vês é o que pagas.</p>
          </div>
        </div>
      </div>
    </section>
  );

  const Fleet = () => {
    const display = filterGroup === 'ALL' ? filteredCars : filteredCars.filter(c => c.group === filterGroup);

    return (
      <section id="fleet" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionTitle title={view === 'home' ? 'A Nossa Frota em Destaque' : 'Veículos Disponíveis'} subtitle="Citadinos, familiares e elétricos." />

          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {['ALL', ...Object.values(CarGroup)].map(g => (
              <button
                key={g}
                onClick={() => setFilterGroup(g)}
                className={`px-4 py-2 rounded-full text-sm ${filterGroup === g ? 'bg-gray-900 text-white' : 'bg-white border'}`}
              >
                {g === 'ALL' ? 'Todos' : g}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {display.length === 0 && (
              <div className="col-span-full text-center p-8 bg-white rounded border">
                <AlertCircle className="mx-auto mb-3" />
                <p className="font-medium">Nenhum veículo encontrado. Tenta outras datas.</p>
              </div>
            )}

            {display.map(car => (
              <div key={car.id} className={`bg-white rounded-lg shadow p-4 border ${!car.isAvailable ? 'opacity-60' : ''}`}>
                <div className="h-44 overflow-hidden rounded mb-3">
                  <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
                </div>

                <div className="mb-3 flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">{car.name}</h3>
                    <p className="text-sm text-gray-500">{car.group}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-xl">{car.pricePerDay}€</div>
                    <div className="text-xs text-gray-500">/dia</div>
                  </div>
                </div>

                <div className="text-sm text-gray-600 mb-4 flex gap-3">
                  <div className="flex items-center gap-1"><CarIcon size={14} /> {car.fuel}</div>
                  <div className="flex items-center gap-1"><CheckCircle size={14} /> {car.seats} lugares</div>
                </div>

                <div className="mb-4">
                  {car.features.slice(0, 3).map((f, i) => (
                    <div key={i} className="text-sm text-gray-600">• {f}</div>
                  ))}
                </div>

                <Button onClick={() => handleBookNow(car)} disabled={!car.isAvailable} className="w-full">
                  Reservar agora <ChevronRight />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const Business = () => (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1">
          <div className="inline-block bg-yellow-400 text-gray-900 px-3 py-1 rounded font-bold text-xs uppercase">Para Empresas</div>
          <h2 className="text-3xl font-bold mt-4">Frota flexível para o seu negócio</h2>
          <p className="mt-3 text-gray-200">Condições especiais e faturação simplificada para empresas.</p>
          <div className="mt-4 flex gap-3">
            <Button><Briefcase /> Orçamento</Button>
            <Button variant="outline"><Phone /> Contactar</Button>
          </div>
        </div>
        <div className="flex-1">
          <img src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="business" className="rounded-lg shadow" />
        </div>
      </div>
    </section>
  );

  const Checkout = () => {
    if (!booking) return null;
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <button onClick={() => setView('results')} className="text-sm text-gray-600 mb-4">← Voltar</button>
          <h1 className="text-2xl font-bold mb-6">Finalizar Reserva</h1>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <div className="bg-white p-4 rounded border">
                <h3 className="font-bold mb-3">Os seus dados</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input className="p-2 border rounded" placeholder="Nome" />
                  <input className="p-2 border rounded" placeholder="Apelido" />
                </div>
                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input className="p-2 border rounded" placeholder="Email" type="email" />
                  <input className="p-2 border rounded" placeholder="Telefone" />
                </div>
              </div>

              <div className="bg-white p-4 rounded border">
                <h3 className="font-bold mb-3">Pagamento</h3>
                <label className={`block p-3 border rounded mb-3 ${paymentMethod === 'online' ? 'bg-yellow-50 border-yellow-400' : ''}`}>
                  <input type="radio" name="pay" className="mr-2" onChange={() => setPaymentMethod('online')} /> Pagar Online
                </label>
                <label className={`block p-3 border rounded ${paymentMethod === 'store' ? 'bg-yellow-50 border-yellow-400' : ''}`}>
                  <input type="radio" name="pay" className="mr-2" onChange={() => setPaymentMethod('store')} /> Pagar no Balcão
                </label>

                <Button onClick={confirmBooking} className="mt-4 w-full" disabled={!paymentMethod}>
                  Confirmar reserva
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white p-4 rounded border">
                <img src={booking.car.image} alt={booking.car.name} className="w-full h-36 object-cover rounded mb-3" />
                <h4 className="font-bold">{booking.car.name}</h4>
                <p className="text-sm text-gray-500">{booking.car.group}</p>
                <div className="mt-3 text-gray-700">
                  <div className="flex justify-between"><span>Duração</span><strong>{booking.totalDays} dias</strong></div>
                  <div className="flex justify-between mt-2"><span>Total</span><strong>{booking.totalPrice}€</strong></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Success = () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white rounded-lg p-8 shadow text-center max-w-lg">
        <div className="mx-auto w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <CheckCircle className="text-green-600" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Reserva Confirmada!</h2>
        <p className="text-gray-600 mb-6">Recebeste um email com os detalhes da reserva.</p>
        <Button onClick={() => { setView('home'); setBooking(null); setSelectedCar(null); setPaymentMethod(null); }}>Voltar ao início</Button>
      </div>
    </div>
  );

  /* --------------------------
     Main render
     -------------------------- */

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900">
      {view !== 'success' && <Header />}

      <main className="flex-grow">
        {view === 'home' && (
          <>
            <Hero />
            <WhyUs />
            <Fleet />
            <Business />
          </>
        )}

        {view === 'results' && (
          <>
            <div className="bg-gray-900 text-white py-4">
              <div className="container mx-auto px-4 flex justify-between items-center">
                <div>
                  <div className="text-xs text-gray-300">A sua pesquisa</div>
                  <div className="font-medium">{search.pickupLocation} • {search.startDate} a {search.endDate}</div>
                </div>
                <button onClick={() => setView('home')} className="underline text-sm">Alterar pesquisa</button>
              </div>
            </div>
            <Fleet />
          </>
        )}

        {view === 'checkout' && <Checkout />}
        {view === 'success' && <Success />}
      </main>

      {view !== 'success' && (
        <footer className="bg-gray-800 text-gray-300 py-8">
          <div className="container mx-auto px-4 grid md:grid-cols-4 gap-6">
            <div>
              <div className="font-bold text-white">{APP_NAME}</div>
              <p className="text-sm">A sua escolha de confiança para aluguer de automóveis.</p>
            </div>
            <div>
              <div className="font-bold text-white mb-2">Links</div>
              <ul className="text-sm space-y-1">
                <li>Sobre nós</li>
                <li>Frota</li>
                <li>Termos</li>
              </ul>
            </div>
            <div>
              <div className="font-bold text-white mb-2">Contactos</div>
              <div className="text-sm space-y-1">
                <div className="flex items-center gap-2"><Phone size={14} /> +351 210 000 000</div>
                <div className="flex items-center gap-2"><Mail size={14} /> reservas@silvarent.pt</div>
              </div>
            </div>
            <div>
              <div className="font-bold text-white mb-2">Newsletter</div>
              <div className="flex">
                <input className="p-2 rounded-l bg-gray-900 border border-gray-700 w-full" placeholder="Email" />
                <button className="px-3 py-2 rounded-r bg-yellow-400 text-gray-900 font-bold">OK</button>
              </div>
            </div>
          </div>

          <div className="text-center text-xs mt-6">© 2026 Silva Rent-a-Car. Todos os direitos reservados.</div>
        </footer>
      )}

      {/* Assistente virtual sempre visível */}
       <AssistenteChat />  
    </div>
  );
}

export default App;
