import React, { useState } from 'react';
import BrandForm from './components/BrandForm';
import Dashboard from './components/Dashboard';
import Loader from './components/Loader';
import { generateBrand, saveBrand } from './api';
import { Save, PlusCircle, CheckCircle } from 'lucide-react';

function App() {
  const [loading, setLoading] = useState(false);
  const [brandData, setBrandData] = useState(null);
  const [inputs, setInputs] = useState(null);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async (formData) => {
    setLoading(true);
    setBrandData(null);
    setSaved(false);
    setError(null);
    setInputs(formData);
    
    try {
      const result = await generateBrand(formData);
      console.log("API Result:", result);
      setBrandData(result);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || "Failed to generate brand. Is the server running and API key active?");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await saveBrand({
        ...inputs,
        ...brandData
      });
      setSaved(true);
    } catch (err) {
      console.error(err);
      setError("Failed to save brand details.");
    }
  };

  const handleReset = () => {
    setBrandData(null);
    setInputs(null);
    setSaved(false);
    setError(null);
  };

  return (
    <div className="container">
      <header>
        <h1 className="brand-title">BrandCraft UI</h1>
        <p className="brand-subtitle">Automate your brand identity creation with Generative AI.</p>
      </header>

      {error && (
        <div style={{ background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.5)', padding: '1rem', borderRadius: '8px', color: '#fca5a5', marginBottom: '2rem', textAlign: 'center' }}>
          {error}
        </div>
      )}

      {!brandData && !loading && (
        <BrandForm onSubmit={handleGenerate} isLoading={loading} />
      )}

      {loading && <Loader />}

      {brandData && !loading && (
        <div style={{ animation: 'fadeInDown 0.6s ease-out' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginBottom: '1.5rem' }}>
            <button 
              onClick={handleReset} 
              className="btn" 
              style={{ width: 'auto', background: 'rgba(255,255,255,0.1)' }}
            >
              <PlusCircle size={18} /> New Brand
            </button>
            <button 
              onClick={handleSave} 
              disabled={saved}
              className="btn" 
              style={{ width: 'auto', background: saved ? '#10b981' : 'linear-gradient(135deg, var(--primary), var(--accent))' }}
            >
              {saved ? <><CheckCircle size={18} /> Saved successfully!</> : <><Save size={18} /> Save Brand Settings</>}
            </button>
          </div>
          
          <Dashboard data={brandData} />
        </div>
      )}
    </div>
  );
}

export default App;
