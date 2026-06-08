import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./lib/ThemeContext";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Certification from "./pages/Certification";
import Gallery from "./pages/Gallery";
import Journey from "./pages/Journey";
import Team from "./pages/Team";
import AdminGenerate from "./pages/AdminGenerate";

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/certification" element={<Certification />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/journey" element={<Journey />} />
            <Route path="/team" element={<Team />} />
            <Route path="/admin/generate" element={<AdminGenerate />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
      </ThemeProvider>
    </BrowserRouter>
  );
}
