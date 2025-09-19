// src/components/MoleculeBackground.jsx
import React from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim"; // lightweight bundle

export default function MoleculeBackground() {
  const particlesInit = async (engine) => {
    await loadSlim(engine); // load only basic shapes/links
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,           // ensure it stays behind content
        pointerEvents: "none" // prevent blocking clicks/text selection
      }}
      options={{
        background: { color: "transparent" },
        fullScreen: { enable: false }, // disable built-in fullscreen, we handle manually
        fpsLimit: 60,
        particles: {
          number: { value: 30, density: { enable: true, area: 800 } },
          color: { value: ["#d2f2f7ff", "#e2f4f3ff", "#eff6f7ff"] }, // teal palette
          shape: { type: "circle" },
          opacity: { value: 0.5 },
          size: {
            value: { min: 1, max: 2 }, // atoms of varied size
          },
          links: {
            enable: true,
            distance: 120,
            color: "#406e6eff",
            opacity: 0.5,
            width: 2, // thicker bonds
            triangles: { enable: true, opacity: 0.05 }, // molecule-like clusters
          },
          move: {
            enable: true,
            speed: 1,
            random: true,
            straight: false,
            outModes: "out",
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "repulse" }, // 👈 move away on hover
            onClick: { enable: true, mode: "push" },
          },
          modes: {
            repulse: { distance: 150, duration: 0.4 }, // stronger repulsion
            push: { quantity: 3 },
          },
        },
        detectRetina: true,
      }}
    />
  );
}
