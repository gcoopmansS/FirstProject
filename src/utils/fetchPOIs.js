import axios from "axios";

const GEOAPIFY_API_KEY = "03250376802a402b9c6692bfdd730018";

export async function fetchPOIs({ lat, lon, radius = 5000 }) {
  const categories = "catering.bar, catering.pub, catering.cafe";
  const url = `https://api.geoapify.com/v2/places?categories=${categories}&filter=circle:${lon},${lat},${radius}&limit=50&apiKey=${GEOAPIFY_API_KEY}`;

  const response = await axios.get(url);
  return response.data.features.map((place) => ({
    id: place.properties.place_id,
    name: place.properties.name,
    lat: place.geometry.coordinates[1],
    lon: place.geometry.coordinates[0],
  }));
}
