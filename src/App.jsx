import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  * {
    box-sizing: border-box;
  }

  
  body {
    margin: 0; 
    font-family: 'Inter', sans-serif;
    background: #eef7f6;
    color: #2b3a42;
    min-height: 100vh;
    width: 100%;

    display: flex;
    flex-direction: column;
    overflow-x: hidden;
  }

  #root {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;
  }

  th, td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #056676;
    color: white;
    font-weight: 600;
    position: sticky;
    top: 0;
  }

  tr:nth-child(even) {
    background-color: #f2f9f9;
  }

  tr:hover {
    background-color: #e0f2f1;
  }
`;

// DNA helix animation
const dnaAnimation = keyframes`
  0% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-10px) rotate(5deg); }
  50% { transform: translateY(0) rotate(0deg); }
  75% { transform: translateY(10px) rotate(-5deg); }
  100% { transform: translateY(0) rotate(0deg); }
`;

const wave = keyframes`
  0%, 100% {
    transform: rotate(0deg);
  }
  15% {
    transform: rotate(15deg);
  }
  30% {
    transform: rotate(-10deg);
  }
  45% {
    transform: rotate(12deg);
  }
  60% {
    transform: rotate(-8deg);
  }
  75% {
    transform: rotate(7deg);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
`;

// Main container
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 0 1rem;
`;

// Navbar styles
const Navbar = styled(motion.nav)`
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #056676;
  box-shadow: 0 4px 15px rgba(5, 102, 118, 0.15);
  position: sticky;
  top: 0;
  z-index: 100;

  @media (max-width: 600px) {
    padding: 1rem;
  }
`;

const NavBrand = styled(motion.div)`
  font-weight: 700;
  font-size: 1.6rem;
  color: #d0f0fd;
  display: flex;
  align-items: center;
  gap: 10px;

  svg {
    animation: ${wave} 2.5s infinite;
  }

  @media (max-width: 600px) {
    font-size: 1.3rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.8rem;

  a {
    font-weight: 600;
    font-size: 1rem;
    color: #d0f0fd;
    padding: 8px 12px;
    border-radius: 8px;
    transition: all 0.3s ease;
    position: relative;

    &:hover,
    &.active {
      background-color: #04393b;
      color: #aef0fd;
    }

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: #aef0fd;
      transition: width 0.3s ease;
    }

    &:hover::after {
      width: 100%;
    }
  }

  @media (max-width: 600px) {
    gap: 1rem;
  }
`;

// Hero section
const HeroSection = styled(motion.section)`
  background: linear-gradient(135deg, #60c0b8 0%, #b2e3e0 100%);
  padding: 6rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 80vh;
  border-radius: 0 0 90px 90px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23023639' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E");
    opacity: 0.3;
    z-index: 0;
  }

  @media (max-width: 900px) {
    flex-direction: column;
    border-radius: 0 0 60px 60px;
    padding: 4rem 1rem;
    text-align: center;
    min-height: auto;
  }
`;
const ContactSection = styled(motion.section)`
  background: #ffffff;
  color: #333;
  padding: 6rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }

  form {
    width: 100%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  input, textarea {
    padding: 1rem;
    font-size: 1rem;
    border-radius: 8px;
    border: 1px solid #ccc;
    resize: vertical;
  }

  button {
    background: #60c0b8;
    color: white;
    border: none;
    padding: 1rem;
    font-size: 1rem;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
      background: #4ba69e;
    }
  }
`;

const HeroText = styled(motion.div)`
  max-width: 600px;
  color: #023639;
  position: relative;
  z-index: 1;

  h1 {
    font-size: 3.2rem;
    margin-bottom: 1rem;
    font-weight: 900;
    letter-spacing: -1px;
    line-height: 1.1;
    text-shadow: 0 2px 4px rgba(2, 54, 57, 0.1);
  }

  p {
    font-size: 1.3rem;
    line-height: 1.5;
    margin-bottom: 2rem;
    font-weight: 500;
  }

  @media (max-width: 900px) {
    max-width: 100%;
    
    h1 {
      font-size: 2.5rem;
    }
    
    p {
      font-size: 1.1rem;
    }
  }

  @media (max-width: 480px) {
    h1 {
      font-size: 2rem;
    }
  }
`;

const HeroCTA = styled(motion.div)`
  background-color: #023639;
  color: #d0f0fd;
  font-weight: 700;
  padding: 15px 42px;
  border-radius: 50px;
  font-size: 1.1rem;
  box-shadow: 0 8px 15px rgba(2, 54, 57, 0.56);
  transition: all 0.3s ease;
  display: inline-block;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #056676;
    z-index: -1;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.4s ease;
  }

  &:hover::before {
    transform: scaleX(1);
    transform-origin: left;
  }

  &:hover {
    box-shadow: 0 12px 24px rgba(5, 102, 118, 0.6);
  }

  @media (max-width: 480px) {
    padding: 12px 32px;
    font-size: 1rem;
  }
`;

const HeroImage = styled(motion.img)`
  width: 480px;
  max-width: 100%;
  border-radius: 24px;
  box-shadow: 0 25px 30px rgba(2, 54, 57, 0.2);
  animation: ${float} 6s ease-in-out infinite;
  position: relative;
  z-index: 1;

  @media (max-width: 900px) {
    margin-top: 2.7rem;
    width: 100%;
    max-width: 400px;
  }
`;

// Services Section
const ServicesSection = styled(motion.section)`
  padding: 4rem 1rem;
  background: #f0fbfb;
  flex: 1;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23056676' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E");
    opacity: 0.3;
    z-index: 0;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-weight: 900;
  font-size: 2.8rem;
  color: #056676;
  margin-bottom: 2rem;
  text-align: center;
  position: relative;
  display: inline-block;
  padding: 0 20px;

  &::before, &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 50px;
    height: 3px;
    background: linear-gradient(90deg, #056676, transparent);
  }

  &::before {
    left: -50px;
  }

  &::after {
    right: -50px;
    background: linear-gradient(90deg, transparent, #056676);
  }

  @media (max-width: 768px) {
    font-size: 2.2rem;
    
    &::before, &::after {
      width: 30px;
    }
    
    &::before {
      left: -30px;
    }
    
    &::after {
      right: -30px;
    }
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
    
    &::before, &::after {
      width: 20px;
    }
    
    &::before {
      left: -20px;
    }
    
    &::after {
      right: -20px;
    }
  }
`;

const Footer = styled(motion.footer)`
  background: #056676;
  color: #d0f0fd;
  padding: 2rem 1rem;
  text-align: center;
  font-weight: 500;
  margin-top: auto;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #60c0b8, #b2e3e0);
  }
`;

const LogoIcon = () => (
  <motion.svg
    width="32"
    height="32"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    animate={{ rotate: [0, 10, -10, 0] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
  >
    <motion.circle 
      cx="32" 
      cy="32" 
      r="30" 
      stroke="#d0f0fd" 
      strokeWidth="3"
      animate={{ strokeWidth: [3, 4, 3] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
    <motion.path
      d="M18 38a14 14 0 0016-16M18 26a14 14 0 0016 16M38 18a14 14 0 0012 32"
      stroke="#d0f0fd"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{ pathLength: [1, 0.8, 1] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
  </motion.svg>
);

const DnaIcon = styled(motion.div)`
  position: absolute;
  width: 100px;
  height: 150px;
  background: url("data:image/svg+xml,%3Csvg width='100' height='150' viewBox='0 0 100 150' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 5v10M30 25v10M70 25v10M50 45v10M30 65v10M70 65v10M50 85v10M30 105v10M70 105v10M50 125v10' stroke='%23023639' stroke-width='2' stroke-linecap='round'/%3E%3Cpath d='M50 5c-10 10-20 20-20 20s20 0 40 0 20-10 20-10-10-10-20-10-20 0-20 0zM50 45c-10 10-20 20-20 20s20 0 40 0 20-10 20-10-10-10-20-10-20 0-20 0zM50 85c-10 10-20 20-20 20s20 0 40 0 20-10 20-10-10-10-20-10-20 0-20 0zM50 125c-10 10-20 20-20 20s20 0 40 0 20-10 20-10-10-10-20-10-20 0-20 0z' fill='none' stroke='%23023639' stroke-width='2'/%3E%3C/svg%3E") no-repeat center center;
  opacity: 0.1;
  animation: ${dnaAnimation} 8s ease-in-out infinite;
  z-index: 0;
`;

const servicesData = [
  {
    serviceArea: "Microbiome & Metagenomics",
    whatsIncluded: "Taxonomic profiling, functional annotation, pathway mapping, resistance genes",
    tools: "FastQC, MetaPhlAn, HUMAnN3, MEGAN, CARD-RGI",
    clients: "Biotech, aquaculture, gut health, agriculture"
  },
  {
    serviceArea: "Genome Annotation",
    whatsIncluded: "Prokaryotic genome annotation, SNP/indel calling, comparative genomics",
    tools: "RAST, PATRIC, PROKKA, EnsemblVEP",
    clients: "Microbiologists, viral research groups"
  },
  {
    serviceArea: "Functional Enrichment",
    whatsIncluded: "GO/KEGG/COG annotation, pathway enrichment, gene function predictions",
    tools: "DAVID, g:Profiler, Enrichr, Blast2GO",
    clients: "Academics, pharma, nutraceutical studies"
  },
  {
    serviceArea: "Transcriptome (RNA-seq)",
    whatsIncluded: "Differential gene expression, clustering, heatmaps, enrichment analysis",
    tools: "STAR/Hisat2, featureCounts, DESeq2, EdgeR",
    clients: "Drug development, stress response, expression studies"
  },
  {
    serviceArea: "Molecular Docking",
    whatsIncluded: "Protein-ligand docking, protein-protein interaction, visualization",
    tools: "AutoDock, PyMOL, SwissDock, HADDOCK",
    clients: "Drug screening, nutraceutical testing"
  },
  {
    serviceArea: "Systems Biology Modeling",
    whatsIncluded: "Metabolic network simulation, rate law fitting, pathway dynamics modeling",
    tools: "COPASI",
    clients: "Synthetic biology, product R&D, mechanistic modeling"
  },
  {
    serviceArea: "BLAST & Genomic Comparison",
    whatsIncluded: "Gene identification, homology searches, ortholog/paralog analysis",
    tools: "BLAST, MAUVE, UGENE",
    clients: "Bacterial & viral strain characterization"
  },
  {
    serviceArea: "Data Visualization",
    whatsIncluded: "Heatmaps, PCA, volcano plots, KEGG maps, Sankey plots",
    tools: "R, GraphPad, Cytoscape",
    clients: "Research reports, publications, startup dashboards"
  },
  {
    serviceArea: "Proposal/Publication Support",
    whatsIncluded: "Bioinfo sections for papers, grants, and theses",
    tools: "Word, LaTeX, Mendeley",
    clients: "Students, academics, startups"
  },
  {
    serviceArea: "Training & Workshops",
    whatsIncluded: "Custom training on metagenomics, RNA-seq, docking, systems biology",
    tools: "Galaxy, RStudio, Jupyter, COPASI",
    clients: "Colleges, research institutes, biotech firms"
  }
];

const tableVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const rowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  },
  hover: {
    scale: 1.02,
    boxShadow: "0 5px 15px rgba(5, 102, 118, 0.2)",
    backgroundColor: "rgba(224, 242, 241, 0.8)",
    transition: { duration: 0.3 }
  }
};

function Home() {
  return (
    <>
      <HeroSection
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <DnaIcon style={{ top: '10%', left: '5%' }} />
        <DnaIcon style={{ bottom: '10%', right: '5%' }} />
        <Container style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <HeroText
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            aria-label="Hero text introduction"
          >
            <motion.h1
              animate={{ 
                textShadow: ["0 2px 4px rgba(2, 54, 57, 0.1)", "0 4px 8px rgba(2, 54, 57, 0.2)", "0 2px 4px rgba(2, 54, 57, 0.1)"]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Advanced Bioinformatics Services for Life Sciences
            </motion.h1>
            <motion.p
              animate={{ 
                opacity: [0.9, 1, 0.9]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              Comprehensive bioinformatics solutions from microbiome analysis to 
              molecular docking and systems biology modeling.
            </motion.p>
            <Link to="/services">
              <HeroCTA
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                View Services
              </HeroCTA>
            </Link>
          </HeroText>
          <HeroImage
            src="https://images.unsplash.com/photo-1581093588401-41c97a08e45b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
            alt="Bioinformatics data visualization"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            loading="lazy"
          />
        </Container>
      </HeroSection>
              
      <ServicesSection aria-labelledby="services-heading">
        <Container>
          <SectionTitle
            id="services-heading"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Our Bioinformatics Services
          </SectionTitle>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={tableVariants}
          >
            <table>
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
                {servicesData.map((service, index) => (
                  <motion.tr
                    key={index}
                    variants={rowVariants}
                    whileHover="hover"
                    initial="hidden"
                    animate="visible"
                    custom={index}
                  >
                    <td>
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <strong>{service.serviceArea}</strong>
                      </motion.div>
                    </td>
                    <td>{service.whatsIncluded}</td>
                    <td>{service.tools}</td>
                    <td>{service.clients}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </Container>
      </ServicesSection>
      <ContactSection
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  id="contact"
>
  <h2>Contact Me</h2>
  <form onSubmit={(e) => e.preventDefault()}>
    <input type="text" placeholder="Your Name" required />
    <input type="email" placeholder="Your Email" required />
    <textarea rows="5" placeholder="Your Message" required />
    <button type="submit">Send Message</button>
  </form>
</ContactSection>

    </>
  );
}

function Services() {
  return (
    <ServicesSection aria-label="Detailed bioinformatics services">
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Detailed Bioinformatics Services
        </SectionTitle>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={tableVariants}
        >
          <table>
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
              {servicesData.map((service, index) => (
                <motion.tr
                  key={index}
                  variants={rowVariants}
                  whileHover="hover"
                  initial="hidden"
                  animate="visible"
                  custom={index}
                >
                  <td>
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <strong>{service.serviceArea}</strong>
                    </motion.div>
                  </td>
                  <td>{service.whatsIncluded}</td>
                  <td>{service.tools}</td>
                  <td>{service.clients}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </Container>
    </ServicesSection>
  );
}

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Navbar
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
          role="navigation" 
          aria-label="Primary Navigation"
        >
          <NavBrand to="/" aria-label="Go to homepage">
            <LogoIcon />
            BioTecX
          </NavBrand>
          <NavLinks>
            <Link to="/" aria-current={window.location.pathname === "/" ? "page" : undefined}>
              Home
            </Link>
            <Link to="/services" aria-current={window.location.pathname === "/services" ? "page" : undefined}>
              Services
            </Link>
          </NavLinks>
        </Navbar>
        <main style={{ flex: 1 }}>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          role="contentinfo"
        >
          &copy; {new Date().getFullYear()} BioTecX - Advanced Bioinformatics Solutions
        </Footer>
      </Router>
    </>
  );
}

export default App;
