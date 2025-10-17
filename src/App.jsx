import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";
import "./App.css";
import servicesData from "./servicesData.json";
import { getServiceIconAsset } from "./utils/iconMap";
//import heroLogo from "./assets/PhyloBandits_logo.png";          // big illustrated hero graphic
import heroLogo from "./assets/PhyloBandits_Logo_Transparent_Cut.png"
//import logo from "./assets/PhyloBandits_logo_NOTEXT.png";       // small icon for navbar
import logo from "./assets/PhyloBandits_Logo_Transparent_Cut.png";
import MoleculeBackground from "./components/MoleculeBackground";
import ServiceModal from "./components/ServiceModal";
import "./styles/buttons.css";


const tableVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { when: "beforeChildren", staggerChildren: 0.1 } }
};

const rowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  hover: {
    scale: 1.02,
    boxShadow: "0 5px 15px rgba(5,102,118,.2)",
    backgroundColor: "rgba(224,242,241,.8)",
    transition: { duration: 0.3 }
  }
};

/* -------------------------------------------------------------------- */
const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function App() {
  const contactRef = useRef(null);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Global theme (same for all service tiles + modal)
  // Based on the provided palette "Sunny Beach Day"
  const globalTheme = { primary: "#2A9D8F", secondary: "#E9C46A" };
  // Modal-specific theme using Sunny Beach palette: dark base + subtle green accent
  // primary: #264653 (deep blue-teal), secondary: #2A9D8F (teal/green)
  const modalTheme = { primary: "#264653", secondary: "#2A9D8F" };

  const handleServiceClick = (service, theme) => {
    const themed = { ...service, _theme: theme };
    setSelectedService(themed);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  // Lock background scroll when modal is open
  useEffect(() => {
    let scrollY = 0;
    const body = document.body;
    if (isModalOpen) {
      scrollY = window.scrollY || window.pageYOffset;
      body.dataset.scrollY = String(scrollY);
      body.style.position = 'fixed';
      body.style.top = `-${scrollY}px`;
      body.style.left = '0';
      body.style.right = '0';
      body.style.width = '100%';
      body.style.overflow = 'hidden';
    } else {
      const prev = Number(body.dataset.scrollY || 0);
      body.style.position = '';
      body.style.top = '';
      body.style.left = '';
      body.style.right = '';
      body.style.width = '';
      body.style.overflow = '';
      window.scrollTo(0, prev);
      delete body.dataset.scrollY;
    }
    return () => {
      // ensure cleanup in case component unmounts with modal open
      body.style.position = '';
      body.style.top = '';
      body.style.left = '';
      body.style.right = '';
      body.style.width = '';
      body.style.overflow = '';
    };
  }, [isModalOpen]);

  return (
    <>
      <MoleculeBackground />

      {/* Toast notifications */}
      <Toaster />

      {/* ============ NAVBAR ============ */}
      <motion.nav
        className="navbar"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        role="navigation"
        aria-label="Primary Navigation"
      >
        <a
          className="nav-brand"
          href="#home"
          onClick={(e) => { e.preventDefault(); scrollTo("home"); }}
        >
          {/* mini logo */}
          <motion.img
            src={logo}
            alt="PhyloBandits logo"
            className="nav-logo"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          />

          {/* brand name text */}
          <motion.span
            className="brand-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            PhyloBandits
          </motion.span>
        </a>

        <div className="nav-links">
          <a href="#home"     onClick={(e)=>{e.preventDefault(); scrollTo("home");}}>Home</a>
          <a href="#services" onClick={(e)=>{e.preventDefault(); scrollTo("services");}}>Services</a>
          <a href="#contact"  onClick={(e)=>{e.preventDefault(); scrollTo("contact");}}>Contact</a>
        </div>
      </motion.nav>

      <main className="main">
        {/* ============ HERO ============ */}
        <motion.section
          id="home"
          className="hero"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="container hero-center">
            {/* Small top logo */}
            <motion.img
              src={heroLogo}
              alt="PhyloBandits Logo"
              className="hero-logo"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            />

            {/* Heading */}
            <motion.h1
              className="hero-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Advanced Bioinformatics{" "}
              <span className="accent"> Services for Life Sciences</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="hero-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              From microbiome analysis to molecular docking, actionable insights
              delivered with precision.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              className="hero-buttons"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <a
                href="#services"
                className="btn-primary"
                onClick={(e) => { e.preventDefault(); scrollTo("services"); }}
              >
                View Services
              </a>

              <a
                href="#contact"
                className="btn-secondary"
                onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}
              >
                Contact Us
              </a>
            </motion.div>

          </div>
        </motion.section>


        {/* ============ SERVICES ============ */}
        <section id="services" className="services" aria-labelledby="services-heading">
          <div className="container">
            {/* Section header with title + subtitle */}
            <motion.div
              className="services-header"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h2 id="services-heading" className="section-title">
                Our Bioinformatics Services
              </h2>
              {/* <p className="section-subtitle">
                From Raw Data to Actionable Biological Insights
              </p> */}
            </motion.div>

            {/* Cards grid: first row 3, second row 2 (responsive) */}
            <motion.div
              className="services-grid"
              initial="hidden"
              animate="visible"
              variants={tableVariants}
            >
              {/* Row 1: 3 cards */}
              <motion.div className="services-row three" variants={tableVariants}>
                {servicesData.slice(0, 3).map((s, i) => {
                  const theme = globalTheme;
                  return (
                  <motion.article
                    key={`r1-${i}`}
                    className="service-card product-card clickable"
                    variants={rowVariants}
                    whileHover="hover"
                    style={{ borderTop: `4px solid ${theme.primary}`, "--svc-primary": theme.primary, "--svc-secondary": theme.secondary }}
                    onClick={() => handleServiceClick(s, theme)}
                  >
                    <div className="service-icon-wrap" aria-hidden="true">
                      <img src={getServiceIconAsset(s.serviceArea)} alt="" />
                    </div>
                    <h3 className="service-title">{s.serviceArea}</h3>
                    <p className="service-preview">{s.shortDescription}</p>
                    <div className="service-card-footer">
                      <span className="click-hint">Click to learn more →</span>
                    </div>
                  </motion.article>
                  );
                })}
              </motion.div>

              {/* Row 2: 2 cards */}
              <motion.div className="services-row two" variants={tableVariants}>
                {servicesData.slice(3).map((s, i) => {
                  const theme = globalTheme;
                  return (
                  <motion.article
                    key={`r2-${i}`}
                    className="service-card product-card clickable"
                    variants={rowVariants}
                    whileHover="hover"
                    style={{ borderTop: `4px solid ${theme.primary}`, "--svc-primary": theme.primary, "--svc-secondary": theme.secondary }}
                    onClick={() => handleServiceClick(s, theme)}
                  >
                    <div className="service-icon-wrap" aria-hidden="true">
                      <img src={getServiceIconAsset(s.serviceArea)} alt="" />
                    </div>
                    <h3 className="service-title">{s.serviceArea}</h3>
                    <p className="service-preview">{s.shortDescription}</p>
                    <div className="service-card-footer">
                      <span className="click-hint">Click to learn more →</span>
                    </div>
                  </motion.article>
                  );
                })}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ============ CONTACT ============ */}
        <motion.section
          id="contact"
          className="contact"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Contact Me</h2>
          <form
            onSubmit={async(e)=>{
              e.preventDefault();
              const form = e.target;
              const data = new FormData(form);
              const msgBox = form.querySelector(".form-message");
              msgBox.textContent = "";

              try {
                // Send to first email
                await fetch("https://formsubmit.co/ajax/ujwalv098@gmail.com", {
                  method: "POST",
                  headers: { Accept: "application/json" },
                  body: data
                });

                // Send to second email
                await fetch("https://formsubmit.co/ajax/desaigururaj06@gmail.com", {
                  method: "POST",
                  headers: { Accept: "application/json" },
                  body: data
                });

                msgBox.textContent = "✅ Message sent successfully!";
                msgBox.style.color = "#056676";
                form.reset();
              } catch (err) {
                msgBox.textContent = "❌ Failed to send. Please try again.";
                msgBox.style.color = "crimson";
              }
            }}
          >
            <input type="text"   name="name"    placeholder="Your Name"   required />
            <input type="email"  name="email"   placeholder="Your Email"  required />
            <textarea name="message" rows="5" placeholder="Your Message" required/>
            <input type="hidden" name="_subject" value="PhyloBandits Website Contact" />
            <button type="submit">Send Message</button>

            {/* toast message location */}
            <div className="form-message" style={{ marginTop:"1rem", fontWeight:"bold" }}/>
          </form>
        </motion.section>
      </main>

      {/* ============ FOOTER ============ */}
      <motion.footer
        className="footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        role="contentinfo"
      >
        &copy; {new Date().getFullYear()} PhyloBandits
      </motion.footer>

      {/* ============ SERVICE MODAL ============ */}
      <ServiceModal 
        service={selectedService}
        theme={modalTheme}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
}
