import {
  BrowserRouter, Routes, Route
} from 'react-router-dom';
import CardForm from './components/CreditCardForm';
import Countries from './components/BannedCountries';
import Cards from './components/CardsList';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <div className="cover-container d-flex h-100 p-3 mx-auto flex-column">
        <Navbar />
        <Routes>
            <Route path="/" element={<CardForm />} />
            <Route path="/countries" element={<Countries />} />
            <Route path="/cards" element={<Cards />} />
        </Routes>
      </div>
      </BrowserRouter>
  );
}

export default App;
