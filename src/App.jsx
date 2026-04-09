import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import BlogPostsPage from './pages/BlogPostsPage/BlogPostsPage';
import IndividualPostPage from './pages/IndividualPostPage/IndividualPostPage';
import ContactPage from './pages/ContactPage/ContactPage';
import './styles/global.css';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<BlogPostsPage />} />
          <Route path="/post/:id" element={<IndividualPostPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}