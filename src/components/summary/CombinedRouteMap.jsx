import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
} from "react-leaflet";
import { Box } from "@mui/material";
import polyline from "@mapbox/polyline";
import React from "react";

const colors = ["red", "blue", "green", "orange", "black", "purple", "yellow"];

const CombinedRouteMap = ({ exercises }) => {
  const coordsCombined = exercises.reduce((acc, exercise) => {
    let curr = exercise?.map;
    if (curr) {
      acc.push(curr);
    }
    return acc;
  }, []);
  let coord = null;
  for (const coordSet of coordsCombined) {
    if (coordSet?.polyline) {
      coord = polyline.decode(coordSet.polyline)[0];
      break;
    } else if (coordSet?.summary_polyline) {
      coord = polyline.decode(coordSet.summary_polyline)[0];
      break;
    }
  }

  return (
    coordsCombined.length > 0 && (
      <Box sx={{ width: 350, height: 350 }}>
        <MapContainer
          style={{ height: 350, width: 350 }}
          //center={polyline.decode(coordsCombined[0].polyline)[0]}
          center={coord ? coord : [44.54, -88.1]}
          zoom={12}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {exercises.map((exercise, index) => {
            let coords;
            if (exercise?.map?.polyline) {
              coords = polyline.decode(exercise.map.polyline);
            } else if (exercise?.map?.summary_polyline) {
              coords = polyline.decode(exercise.map.summary_polyline);
            }
            if (coords) {
              // const midpointIdx = Math.round(coords.length / 2);
              const idx = Math.round(Math.random() * coords.length);
              return (
                <React.Fragment key={index}>
                  <Marker position={coords[idx]}>
                    <Popup>
                      {exercise?.name}
                      {<br />}
                      {exercise?.formatted_date}
                      {<br />}
                      {exercise?.formatted_time}
                      {<br />}
                      {exercise?.pace + " /mi"}
                      {<br />}
                      {exercise?.distance + " mi"}
                      {<br />}
                      {exercise?.duration + " min"}
                    </Popup>
                  </Marker>
                  <Polyline
                    color={colors[index % 7]}
                    positions={coords}></Polyline>
                </React.Fragment>
              );
            }
          })}
        </MapContainer>
      </Box>
    )
  );
};

export default CombinedRouteMap;
