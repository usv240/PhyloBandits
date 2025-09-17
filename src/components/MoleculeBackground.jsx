// src/components/MoleculeBackground.jsx
import React from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim"; // smaller bundle for background particles

export default function MoleculeBackground() {
  const particlesInit = async (engine) => {
    await loadSlim(engine); // load only the basic shapes/links
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: { color: "transparent" },
        fullScreen: { enable: true, zIndex: -1 },
        fpsLimit: 60,
        particles: {
          number: { value: 70, density: { enable: true, area: 800 } },
          color: { value: "#056676" },
          shape: { type: "circle" },
          opacity: { value: 0.6 },
          size: { value: 4, random: true },
          links: {
            enable: true,
            distance: 150,
            color: "#60c0b8",
            opacity: 0.4,
            width: 1.5,
          },
          move: {
            enable: true,
            speed: 1.2,
            outModes: "out",
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "grab" },
            onClick: { enable: true, mode: "push" },
          },
          modes: {
            grab: { distance: 200, links: { opacity: 0.8 } },
            push: { quantity: 4 },
          },
        },
        detectRetina: true,
      }}
    />
  );
}
