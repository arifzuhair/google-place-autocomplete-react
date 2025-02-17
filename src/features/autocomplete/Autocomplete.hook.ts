import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  setMarkerPosition,
  setSelected,
  setSuggestions,
} from "../../store/features/autocomplete/autocompleteSlice";

export default function useGMapAutocomplete() {
  const [placesService, setPlacesService] = useState<
    google.maps.places.PlacesService | undefined
  >();
  const [sessionToken, setSessionToken] = useState<
    google.maps.places.AutocompleteSessionToken | undefined
  >();
  const [autoCompleteService, setAutoCompleteService] = useState<
    google.maps.places.AutocompleteService | undefined
  >();

  const [placesResult, setPlacesResult] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);

  const map = useMap();
  const places = useMapsLibrary("places");

  const dispatch = useAppDispatch();
  const { infoWindowOpen, search, suggestions } = useAppSelector(
    (state) => state.autocomplete
  );

  const handleSearchInput = useCallback(
    async (value: string) => {
      const { predictions } = await autoCompleteService!.getPlacePredictions({
        input: value,
        sessionToken,
      });
      setPlacesResult(predictions);
      dispatch(setSuggestions(predictions));
      dispatch(setSelected(false));
    },
    [dispatch, autoCompleteService, sessionToken]
  );

  const handleSuggestionClick = useCallback(
    (placeId: string) => {
      if (!places) return;

      const detailRequestOptions = {
        placeId,
        fields: ["geometry", "name", "formatted_address"],
        sessionToken,
      };

      const detailsRequestCallback = (
        placeDetails: google.maps.places.PlaceResult | null
      ) => {
        if (!placeDetails?.geometry) return;

        const { location } = placeDetails.geometry;
        const { lng, lat } = location!;

        dispatch(setMarkerPosition({ lat: lat(), lng: lng() }));

        if (placeDetails.geometry?.viewport) {
          if (!map) return;
          map.fitBounds(placeDetails.geometry?.viewport);
        }
        dispatch(setSelected(true));
        setPlacesResult([]);
        setSessionToken(new places.AutocompleteSessionToken());
      };

      placesService?.getDetails(detailRequestOptions, detailsRequestCallback);
    },
    [dispatch, places, placesService, sessionToken, map]
  );

  const init = useCallback(() => {
    if (!places || !map) return;

    setPlacesService(new places.PlacesService(map));
    setAutoCompleteService(new places.AutocompleteService());
    setSessionToken(new places.AutocompleteSessionToken());
  }, [map, places]);

  useEffect(() => {
    init();
  }, [init]);

  return {
    placesResult,
    search,
    infoWindowOpen,
    suggestions,
    handleSuggestionClick,
    handleSearchInput,
  };
}
