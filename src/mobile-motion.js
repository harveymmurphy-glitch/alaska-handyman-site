import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./mobile-motion.css";

gsap.registerPlugin(ScrollTrigger);

/** Mobile choreography shares the app's GSAP/Lenis clock and native touch scroll. */
export function setupMobileMotion(root) {
  if (!root) return () => {};
  const media = gsap.matchMedia();

  media.add("(max-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
    const context = gsap.context(() => {}, root);
    const select = gsap.utils.selector(root);
    const cleanups = [];
    let menuTween;
    let pressedIcon;
    let pressedControl;

    root.classList.add("mobile-motion-active");
    context.add(() => {
      const hero = root.querySelector(".hero");
      if (hero) {
        gsap.to(select(".hero-film"), {
          yPercent: 11,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 0.7,
          },
        });
        gsap.to(select(".hero-content"), {
          y: -48,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      }

      select(".intro-cross").forEach((cross) => {
        gsap.fromTo(cross, { rotation: -40 }, {
          rotation: 35,
          ease: "none",
          scrollTrigger: {
            trigger: cross.closest(".intro"),
            start: "top bottom",
            end: "bottom top",
            scrub: 0.9,
          },
        });
      });

      select(".service").forEach((service) => {
        gsap.from(service.querySelector("h3"), {
          y: 24,
          autoAlpha: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: { trigger: service, start: "top 91%", once: true },
        });
      });

      select(".project").forEach((project) => {
        const story = project.querySelector(".project-story");
        if (story) {
          gsap.from(story, {
            y: 32,
            rotationX: 7,
            transformOrigin: "50% 100%",
            autoAlpha: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: project, start: "top 89%", once: true },
          });
        }
        const image = project.querySelector(".comparison");
        if (image) {
          gsap.from(image, {
            scale: 0.955,
            rotationX: 4,
            transformOrigin: "50% 100%",
            duration: 1.15,
            ease: "power3.out",
            scrollTrigger: { trigger: image, start: "top 94%", once: true },
          });
        }
      });

      select(".steps article").forEach((step) => {
        gsap.from(step.children, {
          y: 24,
          autoAlpha: 0,
          duration: 0.85,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: { trigger: step, start: "top 87%", once: true },
        });
        gsap.fromTo(step, { "--step-progress": 0 }, {
          "--step-progress": 1,
          ease: "none",
          scrollTrigger: {
            trigger: step,
            start: "top 82%",
            end: "center 52%",
            scrub: 0.6,
          },
        });
      });

      const contact = root.querySelector(".contact-copy");
      if (contact) {
        gsap.from(contact.querySelectorAll(".contact-phone, .contact-email"), {
          y: 20,
          autoAlpha: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: contact, start: "center 87%", once: true },
        });
      }
    });

    const menu = root.querySelector("#navigation");
    if (menu) {
      const links = Array.from(menu.querySelectorAll("a"));
      const animateMenu = () => {
        menuTween?.kill();
        context.add(() => {
          if (menu.classList.contains("is-open")) {
            menuTween = gsap.fromTo(links, { y: 20, autoAlpha: 0 }, {
              y: 0,
              autoAlpha: 1,
              duration: 0.5,
              stagger: 0.055,
              ease: "power3.out",
              clearProps: "transform,opacity,visibility",
            });
          } else {
            gsap.set(links, { clearProps: "transform,opacity,visibility" });
          }
        });
      };
      const observer = new MutationObserver(animateMenu);
      observer.observe(menu, { attributes: true, attributeFilter: ["class"] });
      if (menu.classList.contains("is-open")) animateMenu();
      cleanups.push(() => observer.disconnect());
    }

    const serviceList = root.querySelector(".service-list");
    if (serviceList) {
      const observer = new MutationObserver((records) => {
        records.forEach(({ target: panel }) => {
          if (!panel.matches(".service-panel") || panel.hidden) return;
          context.add(() => {
            gsap.fromTo(panel.children, { y: 12, opacity: 0 }, {
              y: 0,
              opacity: 1,
              stagger: 0.04,
              duration: 0.55,
              ease: "power3.out",
              overwrite: true,
              clearProps: "transform,opacity",
            });
          });
        });
      });
      observer.observe(serviceList, {
        subtree: true,
        attributes: true,
        attributeFilter: ["hidden"],
      });
      cleanups.push(() => observer.disconnect());
    }

    const release = () => {
      pressedControl?.classList.remove("is-touch-pressed");
      pressedControl = null;
      const icon = pressedIcon;
      pressedIcon = null;
      if (!icon?.isConnected) return;
      context.add(() => gsap.to(icon, {
        scale: 1,
        duration: 0.38,
        ease: "power3.out",
        overwrite: true,
        clearProps: "transform",
      }));
    };
    const press = (event) => {
      if (event.pointerType === "mouse" || event.isPrimary === false) return;
      release();
      const control = event.target.closest(
        ".button, .service h3 button, .faq-item h3 button, .menu-trigger, .mobile-contact a, .comparison-tools button",
      );
      if (!control || !root.contains(control)) return;
      pressedControl = control;
      control.classList.add("is-touch-pressed");
      pressedIcon = control.querySelector("svg");
      if (pressedIcon) {
        context.add(() => gsap.to(pressedIcon, {
          scale: 0.8,
          duration: 0.15,
          ease: "power2.out",
          overwrite: true,
        }));
      }
    };
    root.addEventListener("pointerdown", press, { passive: true });
    document.addEventListener("pointerup", release, { passive: true });
    document.addEventListener("pointercancel", release, { passive: true });
    window.addEventListener("blur", release);

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      root.removeEventListener("pointerdown", press);
      document.removeEventListener("pointerup", release);
      document.removeEventListener("pointercancel", release);
      window.removeEventListener("blur", release);
      pressedControl?.classList.remove("is-touch-pressed");
      context.revert();
      root.classList.remove("mobile-motion-active");
    };
  });

  return () => media.revert();
}
