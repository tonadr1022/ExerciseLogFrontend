/* eslint-disable react/prop-types */
// import React from "react";
import { useMemo } from "react";
import MaterialReactTable from "material-react-table";
import { Box } from "@mui/material";
import Loading from "../headerfooter/Loading";
// name: exerciseRow.name,
// act_type: exerciseRow.act_type,
// workout_type: exerciseRow.workout_type,
// formatted_date: formattedDate,
// formatted_time: formattedTime,
// duration: formattedDuration,
// distance: exerciseRow.distance,
// pace: formattedPace,

const ExerciseTable = ({ exerciseData, loading, error }) => {
  const tableColumns = useMemo(
    () => [
      { accessorKey: "name", header: "Name" },
      { accessorKey: "act_type", header: "Form", minSize: 10 },
      { accessorKey: "workout_type", header: "Type", size: 5, minSize: 75 },
      { accessorKey: "formatted_date", header: "Date", minSize: 60 },
      { accessorKey: "formatted_time", header: "Time", minSize: 40 },
      { accessorKey: "duration", header: "Duration (min)" },
      { accessorKey: "distance", header: "Distance (mi)" },
      { accessorKey: "pace", header: "Pace (min/mi)" },
      { accessorKey: "rating", header: "Rating" },
      { accessorKey: "location", header: "Location" },
      { accessorKey: "shoe", header: "Shoe" },
    ],
    []
  );

  return (
    <Box>
      {loading ? (
        <Loading contentType={"Exercises"} />
      ) : error ? (
        <div>
          <Loading contentType={"Exercises"} />
          Error: {error.message}
        </div>
      ) : (
        <MaterialReactTable
          columns={tableColumns}
          data={exerciseData}
          enableEditing
          editingMode="modal"
          onEditingRowSave={handleSaveRow}
          defaultColumn={{ minSize: 10, maxSize: 100 }}
        />
      )}
    </Box>
  );
};
export default ExerciseTable;
