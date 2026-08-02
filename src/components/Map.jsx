"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";

// Компонент-помощник для плавного перелета карты (flyTo)
function MapFlyTo({ hoveredItem }) {
  const map = useMap();

  useEffect(() => {
    // В базе данные могут называться lat/lng или latitude/longitude
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

export default function Map({ items = [], hoveredItem, onSelect }) {
  const [isMounted, setIsMounted] = useState(false);

  // Ждем монтирования в браузере
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  // Функция для создания HTML-плашки с ценой
  const createPriceIcon = (price, isSelected) => {
    return L.divIcon({
      className: "custom-price-marker-wrapper", // чистим дефолтные стили leaflet
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

  // Координаты центра Баку по умолчанию
  const defaultCenter = [40.3783, 49.8392];

  return (
    <div className="w-full h-full min-h-[400px] rounded-3xl overflow-hidden shadow-sm border border-gray-200 relative z-0">
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

        {/* Плавный перелет к выбранному объекту */}
        <MapFlyTo hoveredItem={hoveredItem} />

        {/* Отрисовка маркеров с ценами */}
        {items.map((item) => {
          const lat = item.lat ?? item.latitude;
          const lng = item.lng ?? item.longitude;

          if (!lat || !lng) return null;

          const isSelected = hoveredItem?.id === item.id;

          return (
            <Marker
              key={item.id}
              position={[lat, lng]}
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