// Centralized icon mapping for services and modal sections
// Using stable Material Design icons to avoid missing exports
import { MdOutlineInsights, MdBiotech, MdOutlineLightbulb, MdListAlt, MdWorkOutline, MdBuildCircle, MdBarChart } from 'react-icons/md';
import { GiDna1 } from 'react-icons/gi';
import { LuBrainCircuit } from 'react-icons/lu';

// Local SVG assets for service icons
import DNAIcon from '../assets/DNA_double_helix.svg';
import RNAIcon from '../assets/rna.svg';
import GutIcon from '../assets/gut_bacteria.svg';
import MagnifyIcon from '../assets/magnifying-glass.svg';
import AIIcon from '../assets/ai.svg';

// Map service area keywords to React Icon components (used in modal headers/section icons)
export function getServiceIcon(serviceArea = '') {
  const s = serviceArea.toLowerCase();

  if (s.includes('genomic') || s.includes('comparative') || s.includes('dna')) return GiDna1;
  if (s.includes('transcript') || s.includes('rna') || s.includes('functional')) return MdOutlineInsights;
  if (s.includes('microbiome') || s.includes('metagenomic') || s.includes('microbiota') || s.includes('gut')) return MdBiotech;
  if (s.includes('molecular') || s.includes('drug') || s.includes('modeling') || s.includes('magnifying')) return MdWorkOutline;
  if (s.includes('systems') || s.includes('ai')) return LuBrainCircuit;

  return MdOutlineInsights; // fallback
}

// Icons for section headers within the modal
export const sectionIcons = {
  Objective: MdOutlineLightbulb,
  Deliverables: MdListAlt,
  Project: MdWorkOutline,
  'Workflow / Tools': MdBuildCircle,
  KPIs: MdBarChart,
};

// Map service area to local SVG asset for main list and modal header image
export function getServiceIconAsset(serviceArea = '') {
  const s = serviceArea.toLowerCase();
  if (s.includes('genomic') || s.includes('comparative') || s.includes('dna')) return DNAIcon;
  if (s.includes('transcript') || s.includes('rna') || s.includes('functional')) return RNAIcon;
  if (s.includes('microbiome') || s.includes('metagenomic') || s.includes('gut')) return GutIcon;
  if (s.includes('molecular') || s.includes('drug') || s.includes('magnifying')) return MagnifyIcon;
  if (s.includes('systems') || s.includes('ai')) return AIIcon;
  return AIIcon; // default fallback
}
