import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
} from "react-leaflet";
import { Box } from "@mui/material";

const colors = ["red", "blue", "green", "orange", "black", "purple", "yellow"];

const ExercisesMap = ({ exercises }) => {
  return (
    <Box sx={{ width: 350, height: 350 }}>
      <MapContainer
        style={{ height: 350, width: 350 }}
        //center={polyline.decode(coordsCombined[0].polyline)[0]}
        center={exercises[0]?.coords ? exercises[0].coords[0] : [44.54, -88.1]}
        zoom={12}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {exercises.map((exercise, index) => {
          if (exercise?.coords) {
            // const midpointIdx = Math.round(coords.length / 2);
            return (
              <React.Fragment key={index}>
                <Marker position={exercise.randomMapPoint}>
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
                  positions={exercise.coords}></Polyline>
              </React.Fragment>
            );
          }
        })}
      </MapContainer>
    </Box>
  );
};

export default ExercisesMap;
