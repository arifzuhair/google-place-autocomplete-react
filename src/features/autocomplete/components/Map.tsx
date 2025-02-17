import {
  AdvancedMarker,
  APIProvider,
  Map,
  Pin,
} from "@vis.gl/react-google-maps";
import { useAppSelector } from "../../../hooks";
import GMapAutocomplete from "./Autocomplete";

const apiKey = import.meta.env.VITE_APP_GOOGLE_MAP_API_KEY;
const mapId = import.meta.env.VITE_APP_GOOGLE_MAP_ID;

export const GoogleMap = () => {
  const { selected, markerPosition } = useAppSelector(
    (state) => state.autocomplete
  );

  return (
    <APIProvider apiKey={apiKey}>
      <GMapAutocomplete />
      <Map defaultZoom={10} defaultCenter={markerPosition} mapId={mapId}>
        {selected && markerPosition && (
          <AdvancedMarker position={markerPosition}>
            <Pin />
          </AdvancedMarker>
        )}
      </Map>
    </APIProvider>
  );
};
