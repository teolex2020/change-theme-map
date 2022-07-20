import React from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

import { useSelector } from "react-redux";
import { defTheme } from "../components/Theme.js";
import { defTheme1 } from "../components/Theme1.js";
import { defTheme2 } from "../components/Theme2.js";

const Map = ({ center }) => {
  const th = useSelector(state => state.them.them);
  console.log(th)

  const arr = [defTheme, " ", defTheme1, defTheme2];
  const rez = arr.find((e, index) => index === th);

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const defaultOptions = {
    panControl: true,
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    clickableIcons: false,
    keyboardShortcuts: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    fullscreenControl: false,
    styles:rez,
  };

  const mapRef = React.useRef(undefined);

  const onLoad = React.useCallback(function callback(map) {
    mapRef.current = map;
  }, []);

  const onUnmount = React.useCallback(function callback(undefined) {
    mapRef.current = undefined;
  }, []);

  return (
    <div className="w-full h-screen ">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={defaultOptions}
      >
  <Marker position={center}/>
      </GoogleMap>
    </div>
  );
};
export default Map;
