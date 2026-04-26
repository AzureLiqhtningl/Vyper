/**
 * Vyper Background System
 * Handles tsParticles initialization and dynamic theme switching.
 */

async function initBackground() {
    // Check if particles should be shown
    const showParticles = localStorage.getItem('showParticles') !== 'false';
    if (!showParticles) return;

    // Load tsParticles if not already loaded (via CDN in HTML, but just in case)
    if (typeof tsParticles === 'undefined') {
        console.warn('tsParticles not loaded. Background skipped.');
        return;
    }

    const getAccentColor = () => {
        return getComputedStyle(document.documentElement).getPropertyValue('--vyper-accent').trim() || '#58F00C';
    };

    const config = {
        fullScreen: { enable: false },
        fpsLimit: 120,
        particles: {
            number: {
                value: 80,
                density: { enable: true, area: 800 }
            },
            color: { value: getAccentColor() },
            shape: { type: "circle" },
            opacity: {
                value: 0.5,
                random: true,
                anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
            },
            size: {
                value: 3,
                random: true,
                anim: { enable: true, speed: 2, size_min: 0.1, sync: false }
            },
            links: {
                enable: true,
                distance: 150,
                color: getAccentColor(),
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 1.5,
                direction: "none",
                random: false,
                straight: false,
                outModes: { default: "out" },
                bounce: false
            }
        },
        interactivity: {
            detectsOn: "canvas",
            events: {
                onHover: { enable: true, mode: "grab" },
                onClick: { enable: true, mode: "push" },
                resize: true
            },
            modes: {
                grab: { distance: 140, links: { opacity: 1 } },
                push: { quantity: 4 }
            }
        },
        retina_detect: true
    };

    const container = await tsParticles.load("tsparticles", config);

    // Watch for theme changes
    const observer = new MutationObserver(() => {
        const newColor = getAccentColor();
        if (container) {
            container.options.particles.color.value = newColor;
            container.options.particles.links.color.value = newColor;
            container.refresh();
        }
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
}

// Initialize when DOM is ready
if (document.readyState === 'complete') {
    initBackground();
} else {
    window.addEventListener('DOMContentLoaded', initBackground);
}
