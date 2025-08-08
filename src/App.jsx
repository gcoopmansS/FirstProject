import "./App.css";
import "leaflet/dist/leaflet.css";

import PreferencesForm from "./components/PreferencesForm";
import Map from "./components/Map";
import Header from "./components/Header";

function App() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-96 h-full border-r bg-white shadow-inner overflow-y-auto">
          <PreferencesForm />
        </div>
        <div className="flex-1">
          <Map />
        </div>
      </div>
    </div>
  );
}

export default App;
