import { useState } from "react";
import ButtonGroup from "./ButtonGroup";

export default function PreferencesForm() {
  const [preferences, setPreferences] = useState({
    sport: "cycling",
    distance: 20,
    surface: "paved",
    routeType: "roundtrip",
    elevation: "normal",
  });

  const updatePref = (key, value) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6 p-6 bg-white  rounded-md">
      <h2 className="text-2xl font-semibold text-gray-800">
        Route Preferences
      </h2>

      <FormGroup label="Sport">
        <ButtonGroup
          options={["cycling", "running", "walking"]}
          selected={preferences.sport}
          onChange={(val) => updatePref("sport", val)}
        />
      </FormGroup>

      <FormGroup label="Desired Distance (km)">
        <input
          type="number"
          name="distance"
          value={preferences.distance}
          onChange={(e) => updatePref("distance", e.target.value)}
          className="w-full border rounded-md p-2 text-sm focus:ring-2 focus:ring-sky-400"
        />
      </FormGroup>

      <FormGroup label="Surface Type">
        <ButtonGroup
          options={["paved", "mixed", "offroad"]}
          selected={preferences.surface}
          onChange={(val) => updatePref("surface", val)}
        />
      </FormGroup>

      <FormGroup label="Route Type">
        <ButtonGroup
          options={["roundtrip", "oneway"]}
          selected={preferences.routeType}
          onChange={(val) => updatePref("routeType", val)}
        />
      </FormGroup>

      <FormGroup label="Elevation Preference">
        <ButtonGroup
          options={["normal", "more", "less"]}
          selected={preferences.elevation}
          onChange={(val) => updatePref("elevation", val)}
        />
      </FormGroup>
    </div>
  );
}

function FormGroup({ label, children }) {
  return (
    <div className="space-y-1">
      <span className="block text-sm font-medium text-gray-700">{label}</span>
      {children}
    </div>
  );
}
