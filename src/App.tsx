import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import TourDetail from './pages/TourDetail';
import CartPage from './pages/CartPage';
import SearchResults from './pages/SearchResults';
import CheckoutPage from './pages/CheckoutPage';
import BookingConfirmation from './pages/BookingConfirmation';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Dashboard from './pages/Dashboard';
import ThingsToDo from './pages/ThingsToDo';
import Preloader from './components/Preloader';

function PageWrapper() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {isLoading && <Preloader />}
      <div className={isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}>
        {!location.pathname.startsWith('/dashboard') && <Navbar />}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/things-to-do" element={<ThingsToDo />} />
            <Route path="/tour/:id" element={<TourDetail />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/search-results" element={<SearchResults />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/booking-confirmation" element={<BookingConfirmation />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
          </Routes>
        </main>
        {!location.pathname.startsWith('/dashboard') && <Footer />}
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <Suspense fallback={<Preloader />}>
        <div className="min-h-screen flex flex-col">
          <PageWrapper />
        </div>
      </Suspense>
    </Router>
  );
}

export default App;