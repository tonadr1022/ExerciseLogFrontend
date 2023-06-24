import { Typography } from "@mui/material";
import polyline from "@mapbox/polyline";
import React, { useEffect, useState } from "react";
import ExercisesMap from "./ExercisesMap";
const getRandomCoordinatePair = (coords) =>
  coords[Math.round(Math.random(1) * coords.length - 1)];
const CombinedRouteMap = ({ exercises }) => {
  // coordinate decode and add to exercise objects
  // track whether coords are available to only render map if coords exist
  const [coordinatesAvailable, setCoordinatesAvailable] = useState(false);

  /**
   * If loop through exercises, checking if each has any polyline type.
   * if so, add decoded coords to it, get a random point, and set hasCoords
   * to true to render the map
   */
  useEffect(() => {
    let hasCoordinates = false;
    for (const exercise of exercises) {
      let coords;
      if (exercise?.map?.polyline) {
        coords = polyline.decode(exercise.map.polyline);
        exercise.coords = coords;
        exercise.randomMapPoint = getRandomCoordinatePair(coords);
        hasCoordinates = true;
      } else if (exercise?.map?.summary_polyline) {
        coords = polyline.decode(exercise.map.summary_polyline);
        exercise.coords = coords;
        exercise.randomMapPoint = getRandomCoordinatePair(coords);
        hasCoordinates = true;
      }
    }
    setCoordinatesAvailable(hasCoordinates);
  }, [exercises]);

  if (coordinatesAvailable) {
    return <ExercisesMap exercises={exercises} />;
  } else {
    return <Typography variant="h6">No maps for this timeframe</Typography>;
  }
};

export default CombinedRouteMap;
