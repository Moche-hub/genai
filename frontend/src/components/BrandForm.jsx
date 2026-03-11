import React, { useState } from 'react';
import { Wand2 } from 'lucide-react';

const BrandForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    brand_name: '',
    industry: '',
    target_audience: '',
    brand_personality: '',
    color_preference: '',
    product_description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="glass-panel" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div className="form-group">
            <label className="form-label">Brand Name (Optional)</label>
            <input 
              type="text" 
              name="brand_name"
              className="form-input"
              placeholder="e.g. Acme Corp" 
              value={formData.brand_name}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Industry *</label>
            <input 
              type="text" 
              name="industry"
              required
              className="form-input"
              placeholder="e.g. Organic Skincare" 
              value={formData.industry}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Target Audience *</label>
            <input 
              type="text" 
              name="target_audience"
              required
              className="form-input"
              placeholder="e.g. Gen Z, eco-conscious" 
              value={formData.target_audience}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Brand Personality *</label>
            <input 
              type="text" 
              name="brand_personality"
              required
              className="form-input"
              placeholder="e.g. Playful, trustworthy, bold" 
              value={formData.brand_personality}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="form-label">Color Preferences *(Hex codes or names)*</label>
            <input 
              type="text" 
              name="color_preference"
              className="form-input"
              placeholder="e.g. Pastel pinks, deep ocean blues, or #ff0000" 
              value={formData.color_preference}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="form-label">Product/Service Description *</label>
            <textarea 
              name="product_description"
              required
              className="form-textarea"
              placeholder="Describe what your product or service actually does..." 
              value={formData.product_description}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>

        <button type="submit" className="btn" disabled={isLoading} style={{ marginTop: '1rem' }}>
          <Wand2 size={20} />
          {isLoading ? 'Generating Magic...' : 'Generate Brand Identity'}
        </button>
      </form>
    </div>
  );
};

export default BrandForm;
