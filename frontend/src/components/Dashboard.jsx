import React, { useState } from 'react';
import { Sparkles, Palette, PenTool, Hash, Share2, Type } from 'lucide-react';

const Dashboard = ({ data }) => {
  if (!data) return null;

  return (
    <div className="dashboard-grid">
      {/* Brand Identity Section */}
      <div className="card">
        <div className="card-header">
          <Sparkles className="card-icon" />
          <h3 className="card-title">Brand Identity</h3>
        </div>
        
        <div className="tagline-text">"{data.tagline || 'Tagline missing'}"</div>
        
        <div className="content-block">
          <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-main)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Name Ideas</h4>
          <div className="pill-list">
            {data.brand_name_ideas?.map((name, i) => (
              <span key={i} className="pill">{name}</span>
            )) || <span>No ideas generated</span>}
          </div>
        </div>

        <div className="content-block">
          <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-main)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Brand Story</h4>
          <p>{data.brand_story || 'Story missing'}</p>
        </div>
      </div>

      {/* Visual Identity Section */}
      <div className="card">
        <div className="card-header">
          <Palette className="card-icon" />
          <h3 className="card-title">Visual Identity</h3>
        </div>
        
        <div className="content-block">
          <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-main)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Color Palette</h4>
          <div className="color-palette">
            {data.color_palette?.map((hex, i) => (
              <div 
                key={i} 
                className="color-swatch"
                style={{ backgroundColor: hex }}
                title={hex}
              >
                {hex}
              </div>
            )) || <div>No palette provided</div>}
          </div>
        </div>

        <div className="content-block" style={{ marginTop: '1.5rem' }}>
          <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-main)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Logo Concept</h4>
          <p>{data.logo_concept || 'Logo concept missing'}</p>
        </div>
      </div>

      {/* Marketing & Social Section */}
      <div className="card" style={{ gridColumn: '1 / -1' }}>
        <div className="card-header">
          <Share2 className="card-icon" />
          <h3 className="card-title">Marketing & Social Media</h3>
        </div>
        
        <div className="dashboard-grid" style={{ marginTop: '0', gridTemplateColumns: '1fr 1fr' }}>
          <div>
            <div className="content-block" style={{ height: '100%' }}>
              <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-main)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Social Media Bio</h4>
              <p>{data.social_media_bio || 'Bio missing'}</p>
            </div>
          </div>
          
          <div>
            <div className="content-block" style={{ height: '100%' }}>
              <h4 style={{ marginBottom: '1rem', color: 'var(--text-main)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Caption Ideas</h4>
              <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {data.marketing_captions?.map((caption, i) => (
                  <li key={i}>{caption}</li>
                )) || <li>No captions provided</li>}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
