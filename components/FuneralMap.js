"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useAccessibility } from "./AccessibilityProvider";
import "leaflet/dist/leaflet.css";

// Fix Leaflet marker icon issue in Next.js
const initLeaflet = () => {
  const L = require("leaflet");
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  });
};

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

export default function FuneralMap({ fallbackData }) {
  const [mounted, setMounted] = useState(false);
  const { language } = useAccessibility();

  useEffect(() => {
    initLeaflet();
    setMounted(true);
  }, []);

  const locations = [
    { name: { en: "Tehran", fa: "تهران" }, coords: [35.6892, 51.3890], desc: { en: "Public mourning & main state procession", fa: "عزاداری عمومی و تشییع اصلی دولتی" } },
    { name: { en: "Qom", fa: "قم" }, coords: [34.6416, 50.8746], desc: { en: "Religious ceremonies", fa: "مراسم مذهبی" } },
    { name: { en: "Mashhad", fa: "مشهد" }, coords: [36.2972, 59.6067], desc: { en: "Final burial ceremony", fa: "مراسم خاکسپاری" } }
  ];

  if (!mounted) {
    return (
      <div className="w-full h-64 md:h-96 bg-charcoal border border-brass/20 rounded flex items-center justify-center p-6 text-center">
        <noscript>
          <div className="space-y-4">
            <h4 className="text-brass font-amiri text-xl">Funeral Locations</h4>
            <ul className="text-parchment/80 space-y-2">
              {locations.map((loc, i) => (
                <li key={i}><strong>{loc.name.en}</strong>: {loc.desc.en}</li>
              ))}
            </ul>
          </div>
        </noscript>
        {!fallbackData && <p className="text-parchment/50 font-mono text-sm animate-pulse">Loading Map...</p>}
      </div>
    );
  }

  return (
    <div className="w-full h-64 md:h-96 rounded overflow-hidden border border-brass/20 relative z-0">
      <MapContainer 
        center={[35.6, 54]} 
        zoom={5} 
        scrollWheelZoom={false}
        className="w-full h-full bg-ink"
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {locations.map((loc, idx) => (
          <Marker key={idx} position={loc.coords}>
            <Popup className="font-inter">
              <strong className="block text-ink font-bold">{loc.name[language]}</strong>
              <span className="text-ink/70 text-sm">{loc.desc[language]}</span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
