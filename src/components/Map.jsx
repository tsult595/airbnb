"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";

function MapFlyTo({ hoveredItem }) {
  const map = useMap();

  useEffect(() => {
    const lat = hoveredItem?.lat ?? hoveredItem?.latitude;
    const lng = hoveredItem?.lng ?? hoveredItem?.longitude;

    if (lat && lng) {
      map.flyTo([lat, lng], 14, {
        duration: 1.2,
        easeLinearity: 0.25,
      });
    }
  }, [hoveredItem, map]);

  return null;
}

export default function Map({ items = [], hoveredItem, onSelect, isDetailView = false }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  // 🟢 Иконка дома для детальной страницы
  const createHomeIcon = () => {
    return L.divIcon({
      className: "custom-home-marker-wrapper",
      html: `
        <div class="flex items-center justify-center w-12 h-12 rounded-full bg-gray-900 text-white shadow-xl border-2 border-white transform transition-transform hover:scale-110">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1">
            <path d="M10.707 2.293a1 1 0 0 1 1.414 0l9 9a1 1 0 0 1-1.414 1.414L20 12.086V20a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-4h-2v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-7.914l-.707.707a1 1 0 0 1-1.414-1.414l9-9z"/>
          </svg>
        </div>
      `,
      iconSize: [48, 48],
      iconAnchor: [24, 24],
    });
  };

  // 🟢 Обычная иконка с ценой для главной страницы
  const createPriceIcon = (price, isSelected) => {
    return L.divIcon({
      className: "custom-price-marker-wrapper",
      html: `
        <div class="px-2.5 py-1 rounded-full font-bold text-xs sm:text-sm shadow-md transition-all duration-200 cursor-pointer whitespace-nowrap border ${
          isSelected
            ? "bg-gray-900 text-white border-gray-900 scale-110 z-50 shadow-xl"
            : "bg-white text-gray-900 border-gray-300 hover:scale-105 hover:bg-gray-100"
        }">
          $${Math.round(Number(price || 0))}
        </div>
      `,
      iconSize: [60, 30],
      iconAnchor: [30, 15],
    });
  };

  const defaultLat = hoveredItem?.lat ?? hoveredItem?.latitude ?? 40.3783;
  const defaultLng = hoveredItem?.lng ?? hoveredItem?.longitude ?? 49.8392;

  return (
    <div className="w-full h-full relative z-0">
      <MapContainer
        center={[defaultLat, defaultLng]}
        zoom={isDetailView ? 14 : 12}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapFlyTo hoveredItem={hoveredItem} />

        {items.map((item) => {
          const lat = item.lat ?? item.latitude;
          const lng = item.lng ?? item.longitude;

          if (!lat || !lng) return null;

          const isSelected = hoveredItem?.id === item.id;

          return (
            <Marker
              key={item.id}
              position={[lat, lng]}
              icon={isDetailView ? createHomeIcon() : createPriceIcon(item.price, isSelected)}
              eventHandlers={{
                click: () => onSelect?.(item),
              }}
            />
          );
        })}
      </MapContainer>
    </div>
  );
}