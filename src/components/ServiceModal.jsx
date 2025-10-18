import React, { useEffect, useRef } from 'react';
/**
 * ServiceModal ("service pop")
 * Styles live in: src/styles/ServiceModal.css
 * Key classnames map:
 *  - .service-modal-overlay → overlay backdrop
 *  - .service-modal-content → white rounded container
 *  - .service-modal-header → top banner with title/back/close
 *  - .service-modal-body → padding wrapper
 *  - .service-modal-grid → 5×5 grid
 *  - .service-card-item.{objective|deliverables|project|workflow|kpis}-card → grid tiles
 *  - .service-modal-footer → action buttons
 */
import '../styles/ServiceModal.css';
import logo from '../assets/PhyloBandits_Logo_Transparent_Cut.png';
import { sectionIcons } from '../utils/iconMap';

const ServiceModal = ({ service, isOpen, onClose, theme }) => {
  if (!isOpen || !service) return null;

  // Ref for modal content to manage focus trap
  const contentRef = useRef(null);

  // Focus management and ESC-to-close
  useEffect(() => {
    if (!isOpen) return;

    const node = contentRef.current;
    if (!node) return;

    // Collect focusable elements within the dialog
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input[type="text"]:not([disabled])',
      'input[type="email"]:not([disabled])',
      'input[type="search"]:not([disabled])',
      'input[type="submit"]:not([disabled])',
      'input[type="button"]:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ].join(',');

    const focusables = Array.from(node.querySelectorAll(focusableSelectors));
    const firstFocusable = focusables[0];
    const lastFocusable = focusables[focusables.length - 1];

    // Move focus into the dialog
    (firstFocusable || node).focus();

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      } else if (e.key === 'Tab' && focusables.length > 0) {
        // Basic focus trap
        if (e.shiftKey) {
          // Shift+Tab on first => wrap to last
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
          }
        } else {
          // Tab on last => wrap to first
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable.focus();
          }
        }
      }
    };

    node.addEventListener('keydown', onKeyDown);
    return () => node.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  return (
    <div className="service-modal-overlay" onClick={onClose}>
      <div
        className="service-modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`service-modal-title-${service.serviceArea?.replace(/\s+/g, '-').toLowerCase()}`}
        ref={contentRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        style={{
          // Set header background color (requested): teal #2A9D8F
          "--modal-primary": '#16554eff',
          // Keep secondary as passed or default blue
          "--modal-secondary": theme?.secondary || '#2196F3'
        }}
      >
        {/* Modal Header */}
  <div className="service-modal-header">
          <button className="service-modal-back" onClick={onClose}>
            ← Back
          </button>
          
          <div className="service-modal-title">
            <div className="service-title-text">
              <h2 id={`service-modal-title-${service.serviceArea?.replace(/\s+/g, '-').toLowerCase()}`}>{service.serviceArea}</h2>
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
            {/* Top-left grid logo above Project (restored) */}
            <div className="service-grid-logo" aria-hidden="true">
              <img src={logo} alt="PhyloBandits" />
            </div>
            
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
          <button
            className="btn-primary"
            aria-controls="contact"
            onClick={() => {
              // Close first to release scroll lock, then scroll after paint
              onClose();
              setTimeout(() => {
                const el = document.getElementById('contact');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                  // Fallback to hash navigation
                  window.location.hash = '#contact';
                }
              }, 80);
            }}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;