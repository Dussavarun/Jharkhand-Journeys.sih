// "use client";

// import { GoogleMap, DirectionsRenderer, useJsApiLoader } from "@react-google-maps/api";
// import { useState, useEffect } from "react";

// const containerStyle = {
//   width: "100vw",
//   height: "100vh",
// };

// // Start point
// const start = { lat: 23.88579572803061, lng: 84.19238746705662 };
// // Middle point
// const middle = { lat: 23.992646106179027, lng: 85.36359952473276 };
// // End point
// const end = { lat: 22.804352105281577, lng: 86.15597106887685 };

// export default function RouteMap() {
//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
//   });

//   const [directions, setDirections] = useState(null);

//   useEffect(() => {
//     if (!isLoaded) return;
//     if (!window.google) return;

//     const directionsService = new window.google.maps.DirectionsService();

//     directionsService.route(
//       {
//         origin: start,
//         destination: end,
//         waypoints: [
//           { location: middle, stopover: true },
//         ],
//         travelMode: window.google.maps.TravelMode.DRIVING,
//         optimizeWaypoints: false,
//       },
//       (result, status) => {
//         if (status === "OK") {
//           setDirections(result);
//         } else {
//           console.error("Error fetching directions:", result);
//         }
//       }
//     );
//   }, [isLoaded]);

//   if (!isLoaded) return <div>Loading Map...</div>;

//   return (
//     <GoogleMap
//       mapContainerStyle={containerStyle}
//       center={start}
//       zoom={7}
//     >
//       {directions && <DirectionsRenderer directions={directions} />}
//     </GoogleMap>
//   );
// }
// components/MapRoute.js
"use client"; // required for Next.js 13+ app directory

import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";

export default function page(){
  useEffect(() => {
    // Initialize map
    const map = L.map("map").setView([23.6102, 85.2799], 7);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    // Routing control
    L.Routing.control({
      waypoints: [
        L.latLng(23.88579572803061, 84.19238746705662), // Ranchi
        L.latLng(23.992646106179027, 85.36359952473276), // Jamshedpur
      ],
      routeWhileDragging: true,
      showAlternatives: true,
      lineOptions: {
        styles: [{ color: "blue", opacity: 0.8, weight: 5 }],
      },
      router: L.Routing.osrmv1({
        serviceUrl: "https://router.project-osrm.org/route/v1",
      }),
    }).addTo(map);

    return () => {
      map.remove(); // Clean up map on unmount
    };
  }, []);

  return (
    <div>
      <h2>Route: Ranchi → Jamshedpur</h2>
      <div id="map" style={{ height: "500px", width: "100%" }}></div>
    </div>
  );
};

