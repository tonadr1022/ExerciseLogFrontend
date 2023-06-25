import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { importStravaActivities } from "../api/stravaApi";
import { Button } from "@mui/material";

const StravaPage = () => {
  const { user } = useContext(AuthContext);
  const [importButtonVisible, setImportButtonVisible] = useState(true);
  console.log(user.strava_authorized);

  const { data, isLoading, isSuccess, refetch } = useQuery(
    ["importStrava"],
    importStravaActivities,
    { enabled: false }
  );
  const onImportClick = () => {
    refetch();
    setImportButtonVisible(false);
  };
  return (
    <>
      {user.strava_authorized === true ? (
        <div>You are Strava authorized</div>
      ) : (
        <div>Auth with strava</div>
      )}
      {importButtonVisible && (
        <Button onClick={onImportClick}>Import Strava Activities</Button>
      )}
      {data && <div>data</div>}
    </>
  );
};

export default StravaPage;
