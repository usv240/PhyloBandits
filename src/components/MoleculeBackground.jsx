// Clean Molecular Particle Background
import React from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export default function MoleculeBackground() {
  const particlesInit = async (engine) => {
    await loadSlim(engine);
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
        zIndex: -1,
        pointerEvents: "none"
      }}
      options={{
        background: { color: "transparent" },
        fullScreen: { enable: false },
        fpsLimit: 60,
        particles: {
          number: { 
            value: 45, 
            density: { enable: true, area: 800 } 
          },
          color: { 
            value: ["#A8A8A8", "#B8B8B8", "#9A9A9A", "#AAAAAA"]
          },
          shape: { 
            type: "circle"
          },
          opacity: { 
            value: 0.6,
            animation: {
              enable: true,
              speed: 0.4,
              minimumValue: 0.3,
              sync: false
            }
          },
          size: {
            value: { min: 2, max: 4 },
            animation: {
              enable: true,
              speed: 0.8,
              minimumValue: 1,
              sync: false
            }
          },
          links: {
            enable: true,
            distance: 140,
            color: "#999999",
            opacity: 0.5,
            width: 1.2,
            triangles: {
              enable: true,
              opacity: 0.05
            }
          },
          move: {
            enable: true,
            speed: 0.8,
            direction: "none",
            random: false,
            straight: false,
            outModes: "bounce"
          }
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "grab" },
            onClick: { enable: true, mode: "push" },
            resize: true
          },
          modes: {
            grab: { 
              distance: 180,
              links: {
                opacity: 0.7
              }
            },
            push: { 
              quantity: 2 
            }
          }
        },
        detectRetina: true
      }}
    />
  );
}
