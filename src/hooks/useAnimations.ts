"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register ScrollTrigger globally
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Utility to check reduced motion
const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// --- Page Level Transitions ---

export const usePageTransition = (containerRef: React.RefObject<HTMLElement | null>) => {
  useGSAP(() => {
    if (!containerRef.current) return;
    
    // Smooth fade + scale in for the entire page body
    gsap.fromTo(containerRef.current, 
      { opacity: 0, scale: 0.98 },
      { opacity: 1, scale: 1, duration: prefersReducedMotion() ? 0 : 0.8, ease: 'power3.out' }
    );
  }, { scope: containerRef });
};

// --- Global Structural Animations ---

export const useAnimateNavbar = (navbarRef: React.RefObject<HTMLElement | null>) => {
  useGSAP(() => {
    if (!navbarRef.current) return;
    
    gsap.fromTo(navbarRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: prefersReducedMotion() ? 0 : 0.6, ease: 'power3.out', delay: 0.1 }
    );
  }, { scope: navbarRef });
};

export const useAnimateSidebar = (sidebarRef: React.RefObject<HTMLElement | null>) => {
  useGSAP(() => {
    if (!sidebarRef.current) return;
    
    gsap.fromTo(sidebarRef.current,
      { x: -40, opacity: 0 },
      { x: 0, opacity: 1, duration: prefersReducedMotion() ? 0 : 0.7, ease: 'power3.out' }
    );
  }, { scope: sidebarRef });
};

// --- Dashboard Component Animations ---

export const useAnimateCards = (containerRef: React.RefObject<HTMLElement | null>, cardSelector: string = '.gsap-card') => {
  useGSAP(() => {
    if (!containerRef.current) return;
    
    const cards = containerRef.current.querySelectorAll(cardSelector);
    if (!cards.length) return;

    gsap.fromTo(cards,
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: prefersReducedMotion() ? 0 : 0.6, 
        stagger: prefersReducedMotion() ? 0 : 0.05, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        }
      }
    );
  }, { scope: containerRef });
};

export const useAnimateTables = (tableRef: React.RefObject<HTMLElement | null>, rowSelector: string = 'tr') => {
  useGSAP(() => {
    if (!tableRef.current) return;
    const rows = tableRef.current.querySelectorAll(rowSelector);
    if (!rows.length) return;

    gsap.fromTo(Array.from(rows).slice(1), // Exclude header row if possible
      { y: 15, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: prefersReducedMotion() ? 0 : 0.5,
        stagger: prefersReducedMotion() ? 0 : 0.04,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: tableRef.current,
          start: "top 90%",
        }
      }
    );
  }, { scope: tableRef });
};

// Numeric counter animation for KPIs
export const useAnimateNumbers = (numRef: React.RefObject<HTMLElement | null>, targetValue: number, suffix: string = '') => {
  useGSAP(() => {
    if (!numRef.current || prefersReducedMotion()) {
      if (numRef.current) numRef.current.innerText = `${targetValue}${suffix}`;
      return;
    }
    
    const obj = { val: 0 };
    gsap.to(obj, {
      val: targetValue,
      duration: 1.2,
      ease: 'expo.out',
      onUpdate: () => {
        if (numRef.current) {
          // Format with commas, max 1 decimal
          const formatted = obj.val % 1 !== 0 ? obj.val.toFixed(1) : Math.floor(obj.val).toLocaleString();
          numRef.current.innerText = `${formatted}${suffix}`;
        }
      },
      scrollTrigger: {
        trigger: numRef.current,
        start: "top 90%"
      }
    });
  }, { scope: numRef, dependencies: [targetValue] });
};

// --- Specialized Page Animations ---

export const useAnimateMapPins = (mapRef: React.RefObject<HTMLElement | null>, pinSelector: string = '.gsap-pin') => {
  useGSAP(() => {
    if (!mapRef.current) return;
    const pins = mapRef.current.querySelectorAll(pinSelector);
    if (!pins.length) return;

    gsap.fromTo(pins,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: prefersReducedMotion() ? 0 : 0.6,
        stagger: prefersReducedMotion() ? 0 : 0.08,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: mapRef.current,
          start: "top 80%"
        }
      }
    );
  }, { scope: mapRef });
};

export const useAnimateRouteLines = (svgRef: React.RefObject<SVGElement | null>, lineSelector: string = 'path.gsap-route') => {
  useGSAP(() => {
    if (!svgRef.current) return;
    const lines = svgRef.current.querySelectorAll<SVGPathElement>(lineSelector);
    if (!lines.length) return;

    lines.forEach((line) => {
      const length = line.getTotalLength();
      gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
      
      gsap.to(line, {
        strokeDashoffset: 0,
        duration: prefersReducedMotion() ? 0 : 1.2,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: svgRef.current,
          start: "top 75%"
        }
      });
    });
  }, { scope: svgRef });
};

export const useAnimateNotifications = (containerRef: React.RefObject<HTMLElement | null>, itemSelector: string = '.gsap-notification') => {
  useGSAP(() => {
    if (!containerRef.current) return;
    const items = containerRef.current.querySelectorAll(itemSelector);
    
    gsap.fromTo(items,
      { x: 30, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: prefersReducedMotion() ? 0 : 0.5,
        stagger: prefersReducedMotion() ? 0 : 0.05,
        ease: 'power2.out',
      }
    );
  }, { scope: containerRef });
};

export const useAnimateChatMessages = (chatRef: React.RefObject<HTMLElement | null>, messageSelector: string = '.gsap-message') => {
  // Can be triggered repeatedly as messages are added
  useGSAP(() => {
    if (!chatRef.current) return;
    const items = chatRef.current.querySelectorAll(messageSelector);
    // Usually we only want to animate the last added one, or stagger them all initially
    // For simplicity, we stagger those lacking an "animated" class
    const unAnimated = Array.from(items).filter(item => !item.classList.contains('animated'));
    
    if (!unAnimated.length) return;

    gsap.fromTo(unAnimated,
      { y: 15, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: prefersReducedMotion() ? 0 : 0.4,
        stagger: prefersReducedMotion() ? 0 : 0.05,
        ease: 'power2.out',
        onComplete: () => {
          unAnimated.forEach(el => el.classList.add('animated'));
        }
      }
    );
  }, { scope: chatRef });
};

export const useAnimateCharts = (chartRef: React.RefObject<HTMLElement | null>) => {
  useGSAP(() => {
    if (!chartRef.current) return;
    
    gsap.fromTo(chartRef.current,
      { opacity: 0, scale: 0.98 },
      {
        opacity: 1,
        scale: 1,
        duration: prefersReducedMotion() ? 0 : 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: chartRef.current,
          start: "top 85%"
        }
      }
    );
  }, { scope: chartRef });
};
