import { Autocomplete, TextField } from "@mui/material";
import useGMapAutocomplete from "../Autocomplete.hook";

export default function GMapAutocomplete() {
  const { handleSearchInput, placesResult, handleSuggestionClick } =
    useGMapAutocomplete();

  return (
    <>
      <Autocomplete
        onChange={(e, val) => handleSuggestionClick(val?.place_id || "")}
        loading={placesResult.length === 0}
        options={placesResult}
        getOptionLabel={(option) => option.description}
        renderInput={(params) => (
          <TextField
            variant="filled"
            sx={{
              position: "absolute",
              left: 100,
              top: 100,
              width: 400,
              zIndex: 1,
              bgcolor: "white",
              borderRadius: "3px",
            }}
            {...params}
            label="Search"
            onChange={(e) => handleSearchInput(e.target.value)}
          />
        )}
      />
    </>
  );
}
