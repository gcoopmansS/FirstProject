import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  GeoJSON,
  Popup,
} from "react-leaflet";
import { FiRotateCw } from "react-icons/fi";
import { fetchRoute } from "../utils/fetchRoute";
import GoToLocationButton from "./GoToLocationButton";
import L from "leaflet";

const BRUSSELS = [50.8503, 4.3517];

export default function Map() {
  const [userLocation, setUserLocation] = useState(null);
  const [waypoints, setWaypoints] = useState([]);
  const [routeGeoJson, setRouteGeoJson] = useState(null);

  // Get current location on mount
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserLocation([latitude, longitude]);
      },
      () => {
        console.warn("Geolocation failed, falling back to Brussels.");
        setUserLocation(BRUSSELS);
      }
    );
  }, []);

  // Add waypoint on map click
  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;

        setWaypoints((prev) => {
          const updated = [...prev, [lat, lng]];

          if (updated.length > 1) {
            fetchRoute(updated).then((geojson) => {
              setRouteGeoJson(geojson);
            });
          }

          return updated;
        });
      },
    });
    return null;
  };

  const handleUndo = () => {
    setWaypoints((prev) => {
      const updated = prev.slice(0, -1);
      if (updated.length > 1) {
        fetchRoute(updated).then((geojson) => setRouteGeoJson(geojson));
      } else {
        setRouteGeoJson(null);
      }
      return updated;
    });
  };

  // Wait for userLocation to be set
  if (!userLocation) {
    return <div className="p-4">Locating you…</div>;
  }

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={userLocation}
        zoom={13}
        scrollWheelZoom
        className="w-full h-full z-0 rounded-none"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapClickHandler />

        {/* Route from ORS */}
        {routeGeoJson && (
          <GeoJSON
            key={JSON.stringify(routeGeoJson)} // 🔥 Force re-render
            data={routeGeoJson}
            pathOptions={{ color: "blue" }}
          />
        )}

        {/* Markers for waypoints */}
        {waypoints.map((point, idx) => (
          <Marker key={idx} position={point}>
            <Popup>Waypoint {idx + 1}</Popup>
          </Marker>
        ))}

        {/* Floating buttons */}
        <div className="absolute top-4 right-4 z-[1000] flex flex-col space-y-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              L.DomEvent.stopPropagation(e.nativeEvent);
              handleUndo();
            }}
            disabled={waypoints.length === 0}
            className="bg-white border border-gray-300 shadow-md rounded-full p-2 hover:bg-gray-100 transition disabled:opacity-50"
            title="Undo last waypoint"
            ref={(el) => {
              if (el) L.DomEvent.disableClickPropagation(el);
            }}
          >
            <FiRotateCw size={18} className="text-gray-600" />
          </button>

          <GoToLocationButton />
        </div>
      </MapContainer>
    </div>
  );
}
