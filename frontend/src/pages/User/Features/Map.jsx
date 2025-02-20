import { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import ReactDOMServer from "react-dom/server";
import L from "leaflet";
import toast from "react-hot-toast";
import { MapPin, School, Users, UserCheck } from "lucide-react";
import "leaflet/dist/leaflet.css";

const AreaTooltip = ({ areaName, areaStats }) => (
  <div className="bg-white p-3 rounded-xl shadow-lg border border-gray-100 min-w-[220px] backdrop-blur-sm">
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-3">
        <MapPin className="w-4 h-4 text-indigo-500" />
        <span className="font-semibold text-gray-800">{areaName}</span>
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center justify-between w-full bg-indigo-50 px-2 py-1.5 rounded-lg">
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-indigo-600" />
            <span className="text-indigo-700">Population</span>
          </div>
          <span className="text-sm text-indigo-600 font-medium">
            {areaStats?.population || "N/A"}
          </span>
        </div>
        <div className="flex items-center justify-between w-full bg-emerald-50 px-2 py-1.5 rounded-lg">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-emerald-700">Area Type</span>
          </div>
          <span className="text-sm text-emerald-600 font-medium">
            {areaStats?.type || "District"}
          </span>
        </div>
      </div>
    </div>
  </div>
);

const CityTooltip = ({ cityName, courseType, cityStats }) => (
  <div className="bg-white p-3 rounded-xl shadow-lg border border-gray-100 min-w-[220px] backdrop-blur-sm">
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-3">
        <MapPin className="w-4 h-4 text-blue-500" />
        <span className="font-semibold text-gray-800">{cityName}</span>
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center justify-between w-full bg-blue-50 px-2 py-1.5 rounded-lg">
          <div className="flex items-center gap-1.5">
            <School className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-blue-700">{courseType || "All Courses"}</span>
          </div>
        </div>
        <div className="flex items-center justify-between w-full bg-violet-50 px-2 py-1.5 rounded-lg">
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-violet-600" />
            <span className="text-violet-700">Total Seats</span>
          </div>
          <span className="text-sm text-violet-600 font-medium">
            {cityStats?.total_seats || 0}
          </span>
        </div>
        <div className="flex items-center justify-between w-full bg-emerald-50 px-2 py-1.5 rounded-lg">
          <div className="flex items-center gap-1.5">
            <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-emerald-700">Adopted Seats</span>
          </div>
          <span className="text-sm text-emerald-600 font-medium">
            {cityStats?.locked_seats || 0}
          </span>
        </div>
      </div>
    </div>
  </div>
);

const StateMap = ({
  selectedCity,
  cities,
  onCitySelect,
  selectedCourseType,
  cityData = {}, // This now receives the aggregated city stats
  selectedArea = null, // Add new prop for selected area
  onAreaSelect = () => {}, // Add new prop for area selection handler
}) => {
  const [geoData, setGeoData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // MP bounds approximation
  const mpBounds = [
    [21.6, 74.0], // Southwest corner
    [26.87, 82.8], // Northeast corner
  ];

  // Course-specific color configurations
  const courseColors = {
    "M.Tech": {
      primary: "#eab308", // yellow-500
      light: "#fef9c3", // yellow-100
      hover: "#facc15", // yellow-400
    },
    "B.Tech": {
      primary: "#ef4444", // red-500
      light: "#fee2e2", // red-100
      hover: "#f87171", // red-400
    },
    Diploma: {
      primary: "#22c55e", // green-500
      light: "#dcfce7", // green-100
      hover: "#4ade80", // green-400
    },
    ITI: {
      primary: "#f97316", // orange-500
      light: "#ffedd5", // orange-100
      hover: "#fb923c", // orange-400
    },
  };

  useEffect(() => {
    fetch("/public/madhya_pradesh.geojson")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setGeoData(data))
      .catch((error) => {
        console.error("Error loading GeoJSON:", error);
        setError(error.message);
      });
  }, []);

  const getFeatureStyle = (feature) => {
    const cityName = feature.properties.NAME_2;
    const normalizedCityName = cityName?.toLowerCase();
    const isSelected = selectedCity?.toLowerCase() === normalizedCityName;
    const isAreaSelected = selectedArea === cityName;
    const hasInstitutes = cities?.some(
      (city) => city.toLowerCase() === normalizedCityName
    );

    const courseColor = courseColors[selectedCourseType] || {
      primary: "#2563eb",
      light: "#fef9c3",
      hover: "#60a5fa",
    };

    // Enhanced map styling with beautiful border
    return {
      color: isAreaSelected
        ? "#4f46e5" // indigo-600 for selected area
        : isSelected
        ? courseColor.primary
        : hasInstitutes
        ? courseColor.primary
        : "#64748b",
      weight: isAreaSelected ? 4 : isSelected ? 3 : hasInstitutes ? 2 : 1.5,
      fillColor: isAreaSelected
        ? "#e0e7ff" // indigo-100 for selected area
        : isSelected
        ? courseColor.hover
        : hasInstitutes
        ? courseColor.light
        : "#fef08a",
      fillOpacity: isAreaSelected
        ? 0.8
        : isSelected
        ? 0.7
        : hasInstitutes
        ? 0.5
        : 0.2,
      // Adding a beautiful outer glow effect
      className: "map-feature",
      dashArray: isAreaSelected
        ? ""
        : isSelected
        ? ""
        : hasInstitutes
        ? "5, 5"
        : "",
      opacity: 1,
    };
  };

  const onEachFeature = (feature, layer) => {
    const cityName = feature.properties.NAME_2;
    const normalizedCityName = cityName?.toLowerCase();
    const hasInstitutes = cities?.some(
      (city) => city.toLowerCase() === normalizedCityName
    );

    // Create area tooltip
    const areaTooltip = L.tooltip({
      permanent: false,
      direction: "top",
      className: "area-tooltip",
      opacity: 1,
    });

    areaTooltip.setContent(() => {
      const tooltipElement = document.createElement("div");
      tooltipElement.innerHTML = ReactDOMServer.renderToString(
        <AreaTooltip
          areaName={cityName}
          areaStats={{
            type: feature.properties.TYPE_2,
            population: "N/A", // You can add population data if available
          }}
        />
      );
      return tooltipElement;
    });

    // Create permanent city label
    if (hasInstitutes) {
      const labelContent = ReactDOMServer.renderToString(
        <div className="bg-white px-2 py-0.5 rounded-md shadow-sm border border-gray-100">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3 h-3 text-blue-500" />
            <span className="text-sm text-gray-800 font-medium">
              {cityName}
            </span>
          </div>
        </div>
      );

      layer.bindTooltip(labelContent, {
        permanent: true,
        direction: "center",
        className: "city-label has-courses",
      });

      // Create hover tooltip with seat information
      const courseTooltip = L.tooltip({
        permanent: false,
        direction: "top",
        className: "course-tooltip",
        opacity: 1,
      });

      courseTooltip.setContent(() => {
        const tooltipElement = document.createElement("div");
        tooltipElement.innerHTML = ReactDOMServer.renderToString(
          <CityTooltip
            cityName={cityName}
            courseType={selectedCourseType}
            cityStats={cityData[cityName]}
          />
        );
        return tooltipElement;
      });

      layer.on({
        mouseover: (e) => {
          const layer = e.target;
          layer.setStyle({
            fillOpacity: 0.7,
            weight: 2,
          });
          layer.bringToFront();
          courseTooltip.setLatLng(e.latlng).addTo(layer._map);
        },
        mousemove: (e) => {
          courseTooltip.setLatLng(e.latlng);
        },
        mouseout: (e) => {
          const layer = e.target;
          layer.setStyle(getFeatureStyle(feature));
          layer._map.removeLayer(courseTooltip);
        },
        click: () => {
          onAreaSelect(cityName);
          if (hasInstitutes) {
            if (onCitySelect) {
              onCitySelect(cityName);
            }
            const path = selectedCourseType
              ? `/course-list/${cityName}/${selectedCourseType}`
              : `/course-list/${cityName}`;
            navigate(path);
          } else {
            toast.error(`No courses available in ${cityName}`, {
              duration: 2000,
              position: "top-center",
              className: "bg-white text-gray-900 border border-gray-200",
            });
          }
        },
      });
    } else {
      layer.on("click", () => {
        toast.error(`No courses available in ${cityName}`, {
          duration: 2000,
          position: "top-center",
          className: "bg-white text-gray-900 border border-gray-200",
        });
      });
    }
  };

  if (error) {
    return (
      <div className="w-full h-[500px] rounded-lg overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">
          Failed to load map data. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-[700px] rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
      <MapContainer
        center={[23.75, 77.5]} // Centered on MP
        zoom={7}
        className="h-full w-full"
        zoomControl={true}
        maxBounds={mpBounds}
        minZoom={6.5}
        maxZoom={9}
        bounds={mpBounds}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="map-tiles"
          bounds={mpBounds}
        />
        {geoData && (
          <GeoJSON
            data={geoData}
            style={getFeatureStyle}
            onEachFeature={onEachFeature}
          />
        )}
      </MapContainer>
      <style>{`
        .map-tiles {
          filter: grayscale(1) opacity(0.6);
        }
        .city-label {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          font-size: 12px;
          padding: 0;
        }
        .city-label.has-courses {
          z-index: 500;
        }
        .course-tooltip {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          font-size: 12px;
          padding: 0;
          transition: all 0.2s ease-in-out;
          z-index: 1000;
        }
        .course-tooltip .leaflet-tooltip-content {
          transform: scale(0.95) translateY(10px);
          transition: all 0.2s ease-in-out;
          transform-origin: center bottom;
          opacity: 0;
        }
        .course-tooltip.leaflet-tooltip-visible .leaflet-tooltip-content {
          transform: scale(1) translateY(0);
          opacity: 1;
        }
        .leaflet-tooltip-top:before,
        .leaflet-tooltip-bottom:before,
        .leaflet-tooltip-left:before,
        .leaflet-tooltip-right:before {
          display: none !important;
        }
        .map-feature {
          filter: drop-shadow(0 0 6px rgba(37, 99, 235, 0.1));
          transition: all 0.3s ease;
        }
        .map-feature:hover {
          filter: drop-shadow(0 0 8px rgba(37, 99, 235, 0.2));
        }
        path {
          transition: all 0.3s ease-in-out;
        }
        .area-tooltip {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          font-size: 12px;
          padding: 0;
          transition: all 0.2s ease-in-out;
          z-index: 1000;
        }
        .area-tooltip .leaflet-tooltip-content {
          transform: scale(0.95) translateY(10px);
          transition: all 0.2s ease-in-out;
          transform-origin: center bottom;
          opacity: 0;
        }
        .area-tooltip.leaflet-tooltip-visible .leaflet-tooltip-content {
          transform: scale(1) translateY(0);
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default StateMap;
