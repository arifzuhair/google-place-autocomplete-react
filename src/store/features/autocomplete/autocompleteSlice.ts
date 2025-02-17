import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AutoCompleteState {
  search: string;
  markerPosition: google.maps.LatLngLiteral;
  suggestions: Array<google.maps.places.AutocompletePrediction>;
  selected: boolean;
  selectedPlaces: Array<google.maps.places.PlaceResult>;
  infoWindowOpen: boolean;
  isLoading: boolean;
}

const initialState: AutoCompleteState = {
  search: "",
  markerPosition: { lat: 37.7749, lng: -122.4194 },
  suggestions: [],
  selected: false,
  selectedPlaces: [],
  infoWindowOpen: false,
  isLoading: false,
};

export const autocompleteSlice = createSlice({
  name: "autocomplete",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setMarkerPosition: (
      state,
      action: PayloadAction<google.maps.LatLngLiteral>
    ) => {
      state.markerPosition = action.payload;
    },
    setSelectedPlaces: (
      state,
      action: PayloadAction<google.maps.places.PlaceResult>
    ) => {
      state.selectedPlaces = [action.payload, ...state.selectedPlaces];
    },
    setSelected: (state, action: PayloadAction<boolean>) => {
      state.selected = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setSuggestions: (
      state,
      action: PayloadAction<Array<google.maps.places.AutocompletePrediction>>
    ) => {
      state.suggestions = action.payload;
    },
  },
});

export const {
  setSearch,
  setSelected,
  setIsLoading,
  setSuggestions,
  setMarkerPosition,
} = autocompleteSlice.actions;

export default autocompleteSlice.reducer;
