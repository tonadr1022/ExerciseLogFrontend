import axiosInstance from "../axios";

export const importStravaActivities = async () => {
  try {
    const response = await axiosInstance.get("import-strava/");
    console.log(response.data);
  } catch (err) {
    console.error(err);
    throw new Error("Could not import Strava activities");
  }
};
