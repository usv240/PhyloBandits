import React from 'react';
import '../styles/ServiceModal.css';
import logo from '../assets/PhyloBandits_Logo_Transparent_Cut.png';
import { sectionIcons } from '../utils/iconMap';

const ServiceModal = ({ service, isOpen, onClose }) => {
  if (!isOpen || !service) return null;

  return (
    <div className="service-modal-overlay" onClick={onClose}>
      <div className="service-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="service-modal-header">
          <button className="service-modal-back" onClick={onClose}>
            ← Back
          </button>
          
          <div className="service-modal-title">
            <img src={logo} alt="PhyloBandits" className="service-modal-logo" />
            <div className="service-title-text">
              <h2>{service.serviceArea}</h2>
              <p className="service-project">{service.project}</p>
            </div>
          </div>
          
          <button className="service-modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        {/* Modal Body - Grid Layout */}
        <div className="service-modal-body">
          <div className="service-modal-grid">
            
            {/* Row 1: Objective + Deliverables */}
            <div className="service-card-item objective-card">
              <div className="card-header">
                <span className="card-icon" aria-hidden="true">{React.createElement(sectionIcons['Objective'])}</span>
                <h3>Objective</h3>
              </div>
              <div className="card-content">
                <p>{service.objective}</p>
              </div>
            </div>

            <div className="service-card-item deliverables-card">
              <div className="card-header">
                <span className="card-icon" aria-hidden="true">{React.createElement(sectionIcons['Deliverables'])}</span>
                <h3>Deliverables</h3>
              </div>
              <div className="card-content">
                <ul>
                  {service.deliverables?.map((deliverable, index) => (
                    <li key={index}>{deliverable}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Row 2: Project + Workflow + KPIs */}
            <div className="service-card-item project-card">
              <div className="card-header">
                <span className="card-icon" aria-hidden="true">{React.createElement(sectionIcons['Project'])}</span>
                <h3>Project</h3>
              </div>
              <div className="card-content">
                <p><strong>Data:</strong></p>
                <ul>
                  {service.data?.map((dataItem, index) => (
                    <li key={index}>{dataItem}</li>
                  ))}
                </ul>
                <p><strong>Tools:</strong> {service.tools}</p>
                <p><strong>Clients:</strong> {service.clients}</p>
              </div>
            </div>

            <div className="service-card-item workflow-card">
              <div className="card-header">
                <span className="card-icon" aria-hidden="true">{React.createElement(sectionIcons['Workflow / Tools'])}</span>
                <h3>Workflow / Tools</h3>
              </div>
              <div className="card-content">
                <ul>
                  {service.workflow?.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="service-card-item kpis-card">
              <div className="card-header">
                <span className="card-icon" aria-hidden="true">{React.createElement(sectionIcons['KPIs'])}</span>
                <h3>KPIs</h3>
              </div>
              <div className="card-content">
                <ul>
                  {service.kpis?.map((kpi, index) => (
                    <li key={index}>{kpi}</li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>

        {/* Modal Footer */}
        <div className="service-modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Close
          </button>
          <button className="btn-primary" onClick={() => {
            onClose();
            // Scroll to contact section
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
          }}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;