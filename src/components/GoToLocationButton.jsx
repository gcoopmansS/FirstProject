import L from "leaflet"; // 👈 Leaflet must be imported
import { useMap } from "react-leaflet";
import { FaCrosshairs } from "react-icons/fa";

export default function GoToLocationButton() {
  const map = useMap();

  const handleClick = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        map.setView([latitude, longitude], 15);
      },
      (err) => {
        console.error("Geolocation error:", err);
        alert("Could not access location.");
      }
    );
  };

  return (
    <div
      className="bg-white border border-gray-300 shadow-md rounded-full p-2 hover:bg-gray-100 transition disabled:opacity-50"
      title="Go to my location"
      ref={(el) => {
        if (el) {
          // prevent clicks on this element from triggering map events
          L.DomEvent.disableClickPropagation(el);
        }
      }}
      onClick={handleClick}
    >
      <FaCrosshairs size={16} />
    </div>
  );
}
