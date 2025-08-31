import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";
import "./App.css";

import heroLogo from "./assets/PhyloBandits_logo.png";          // big illustrated hero graphic
import logo from "./assets/PhyloBandits_logo_NOTEXT.png";       // small icon for navbar

/* -------------------------- data & variants -------------------------- */
const servicesData = [
  { serviceArea: "Microbiome & Metagenomics", whatsIncluded: "Taxonomic profiling, functional annotation, pathway mapping, resistance genes", tools: "FastQC, MetaPhlAn, HUMAnN3, MEGAN, CARD-RGI", clients: "Biotech, aquaculture, gut health, agriculture" },
  { serviceArea: "Genome Annotation", whatsIncluded: "Prokaryotic genome annotation, SNP/indel calling, comparative genomics", tools: "RAST, PATRIC, PROKKA, EnsemblVEP", clients: "Microbiologists, viral research groups" },
  { serviceArea: "Functional Enrichment", whatsIncluded: "GO/KEGG/COG annotation, pathway enrichment, gene function predictions", tools: "DAVID, g:Profiler, Enrichr, Blast2GO", clients: "Academics, pharma, nutraceutical studies" },
  { serviceArea: "Transcriptome (RNA-seq)", whatsIncluded: "Differential gene expression, clustering, heatmaps, enrichment analysis", tools: "STAR/Hisat2, featureCounts, DESeq2, EdgeR", clients: "Drug development, stress response, expression studies" },
  { serviceArea: "Molecular Docking", whatsIncluded: "Protein-ligand docking, protein-protein interaction, visualization", tools: "AutoDock, PyMOL, SwissDock, HADDOCK", clients: "Drug screening, nutraceutical testing" },
  { serviceArea: "Systems Biology Modeling", whatsIncluded: "Metabolic network simulation, rate law fitting, pathway dynamics modeling", tools: "COPASI", clients: "Synthetic biology, product R&D, mechanistic modeling" },
  { serviceArea: "BLAST & Genomic Comparison", whatsIncluded: "Gene identification, homology searches, ortholog/paralog analysis", tools: "BLAST, MAUVE, UGENE", clients: "Bacterial & viral strain characterization" },
  { serviceArea: "Data Visualization", whatsIncluded: "Heatmaps, PCA, volcano plots, KEGG maps, Sankey plots", tools: "R, GraphPad, Cytoscape", clients: "Research reports, publications, startup dashboards" },
  { serviceArea: "Proposal/Publication Support", whatsIncluded: "Bioinfo sections for papers, grants, and theses", tools: "Word, LaTeX, Mendeley", clients: "Students, academics, startups" },
  { serviceArea: "Training & Workshops", whatsIncluded: "Custom training on metagenomics, RNA-seq, docking, systems biology", tools: "Galaxy, RStudio, Jupyter, COPASI", clients: "Colleges, research institutes, biotech firms" }
];

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

  return (
    <>
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
          <div className="dna-icon" style={{ top: "10%", left: "5%" }} />
          <div className="dna-icon" style={{ bottom: "10%", right: "5%" }} />

          <div className="container hero-grid">
            <motion.div
              className="hero-text"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              aria-label="Hero text introduction"
            >
              <motion.h1
                animate={{
                  textShadow:[
                    "0 2px 4px rgba(2,54,57,.1)",
                    "0 4px 8px rgba(2,54,57,.2)",
                    "0 2px 4px rgba(2,54,57,.1)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Advanced Bioinformatics Services for Life Sciences
              </motion.h1>

              <motion.p
                animate={{ opacity: [0.9, 1, 0.9] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                Comprehensive bioinformatics solutions from microbiome analysis
                to molecular docking and systems biology modeling.
              </motion.p>

              <a
                className="hero-cta-link"
                href="#services"
                onClick={(e)=>{ e.preventDefault(); scrollTo("services"); }}
              >
                <motion.span
                  className="hero-cta"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  View Services
                </motion.span>
              </a>
            </motion.div>

            {/* hero-side logo */}
            <motion.img
              className="hero-image"
              src={heroLogo}           /* big illustrated hero graphic */
              alt="PhyloBandits hero logo"
              loading="lazy"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </div>
        </motion.section>

        {/* ============ SERVICES ============ */}
        <section id="services" className="services" aria-labelledby="services-heading">
          <div className="container">
            <motion.h2
              id="services-heading"
              className="section-title"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Our Bioinformatics Services
            </motion.h2>

            <motion.div initial="hidden" animate="visible" variants={tableVariants}>
              {/* ------- responsive table wrapper ------- */}
              <div className="bt-table-wrapper">
                <table className="bt-table">
                  <thead>
                    <motion.tr
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      <th>Service Area</th>
                      <th>What's Included</th>
                      <th>Tools/Software</th>
                      <th>Ideal Clients</th>
                    </motion.tr>
                  </thead>
                  <tbody>
                    {servicesData.map((s,i)=>(  
                      <motion.tr
                        key={i}
                        variants={rowVariants}
                        whileHover="hover"
                        initial="hidden"
                        animate="visible"
                      >
                        <td data-label="Service Area"><strong>{s.serviceArea}</strong></td>
                        <td data-label="What's Included">{s.whatsIncluded}</td>
                        <td data-label="Tools / Software">{s.tools}</td>
                        <td data-label="Ideal Clients">{s.clients}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
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

              try{
                await fetch("https://formsubmit.co/ajax/ujwalv098@gmail.com",{
                  method:"POST",
                  headers:{ Accept:"application/json" },
                  body:data
                });
                msgBox.textContent = "✅ Message sent successfully!";
                msgBox.style.color = "#056676";
                form.reset();
              }catch(err){
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
    </>
  );
}
