import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 22.3964, // Replace with your desired latitude
  lng: 114.1095, // Replace with your desired longitude
};

const Map = () => {
  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}></GoogleMap>
    </LoadScript>
  );
};

export default Map;
