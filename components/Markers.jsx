import React from "react";
import { Marker } from "@react-google-maps/api";

export default function Markers({ position }) {
  return (
    <Marker position={position} icon={{ url: "/mapmarker" }} />
  );
}


// custom marker 