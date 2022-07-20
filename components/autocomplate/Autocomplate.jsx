import React from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { useDispatch } from "react-redux";
import { changeTheme } from "../../store/features/creatClice.js";

export const Autocomplete = ({ isLoaded, onSelect }) => {
  const dispatch = useDispatch();

  const [counts, setCounts] = React.useState(0);

  const sum = () => {
    if (counts === 3) {
      setCounts((counts = 0));
    } else {
      setCounts(counts + 1);
    }
  };

  React.useEffect(() => {
    dispatch(changeTheme(counts));
  }, [counts]);

  const {
    ready,
    value,
    // add init
    init,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    initOnMount: false,
    debounce: 300,
  });
  const ref = useOnclickOutside(() => {
    clearSuggestions();
  });

  const handleInput = e => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }) =>
    () => {
      setValue(description, false);
      clearSuggestions();

      // Get latitude and longitude via utility functions
      getGeocode({ address: description }).then(results => {
        const { lat, lng } = getLatLng(results[0]);
        console.log("📍 Coordinates: ", { lat, lng });
        onSelect({ lat, lng });
      });
    };

  const renderSuggestions = () =>
    data.map(suggestion => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li
          key={place_id}
          onClick={handleSelect(suggestion)}
          className="bg-white pt-4 pl-5"
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  // add useEffect
  React.useEffect(() => {
    if (isLoaded) {
      init();
    }
  }, [isLoaded, init]);

  return (
    <div
      ref={ref}
      className="fixed h-10  z-10 flex   "
      style={{ justifyContent: "space-between", margin: "0 auto" }}
    >
      <div>
        {" "}
        <input
          className="text-slate-800 w-full pl-5 font-bold h-10 bg-white border-2 border-gray-200 hover:border-gray-300 items-center"
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Where are you going?"
        />
        {/* We can use the "status" to decide whether we should display the dropdown or not */}
        {status === "OK" && <ul>{renderSuggestions()}</ul>}
      </div>
      <button
        onClick={() => sum()}
        className="text-blue-500 font-bold  bg-white border-2 border-gray-200 hover:border-gray-300 cursor-pointer px-2"
      >
        Change theme
      </button>
    </div>
  );
};
