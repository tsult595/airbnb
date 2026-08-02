"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";

// Компонент-помощник для перемещения фокуса карты (flyTo)
function MapFlyTo({ hoveredItem }) {
  const map = useMap();

  useEffect(() => {
    if (hoveredItem?.lat && hoveredItem?.lng) {
      map.flyTo([hoveredItem.lat, hoveredItem.lng], 14, {
        duration: 1.2,
      });
    }
  }, [hoveredItem, map]);

  return null;
}

// Создаем HTML-иконку плашки с ценой
const createPriceIcon = (price, isSelected) => {
  return L.divIcon({
    className: "custom-price-marker",
    html: `
      <div class="px-2.5 py-1 rounded-full font-bold text-xs sm:text-sm shadow-md transition-all duration-200 cursor-pointer whitespace-nowrap border ${
        isSelected
          ? "bg-gray-900 text-white border-gray-900 scale-110 z-50"
          : "bg-white text-gray-900 border-gray-300 hover:scale-105 hover:bg-gray-100"
      }">
        $${Math.round(Number(price))}
      </div>
    `,
    iconSize: [60, 30],
    iconAnchor: [30, 15],
  });
};

export default function Map({ items = [], hoveredItem, onSelect }) {
  // Центр Баку по умолчанию
  const defaultCenter = [40.3783, 49.8392];

  return (
    <div className="w-full h-full min-h-[calc(100vh-100px)] rounded-3xl overflow-hidden shadow-sm border border-gray-200">
      <MapContainer
        center={defaultCenter}
        zoom={12}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Анимация перелета карты при hover */}
        <MapFlyTo hoveredItem={hoveredItem} />

        {/* Отображение маркеров с ценами */}
        {items.map((item) => {
          if (!item.lat || !item.lng) return null;
          const isSelected = hoveredItem?.id === item.id;

          return (
            <Marker
              key={item.id}
              position={[item.lat, item.lng]}
              icon={createPriceIcon(item.price, isSelected)}
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