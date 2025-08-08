import axios from "axios";

const ORS_API_KEY =
  "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6Ijg0Y2FhZDVkYTdjNzMxZWNkNDFhZTY4Yjg5MGU1NzgxNDYwMGU3MTA3MjdjM2E4Zjg4ZWQ2YzNlIiwiaCI6Im11cm11cjY0In0=";

export async function fetchRoute(waypoints, profile = "cycling-regular") {
  const url = `https://api.openrouteservice.org/v2/directions/${profile}/geojson`;

  const coordinates = waypoints.map(([lat, lng]) => [lng, lat]); // [lon, lat] for ORS

  const body = {
    coordinates: coordinates,
  };

  const headers = {
    Authorization: ORS_API_KEY,
    "Content-Type": "application/json",
  };

  try {
    const res = await axios.post(url, body, { headers });
    return res.data;
  } catch (err) {
    console.error("ORS error:", err.response?.data || err.message);
    return null;
  }
}
