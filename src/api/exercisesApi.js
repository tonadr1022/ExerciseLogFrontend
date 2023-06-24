import axiosInstance from "../axios";
import { formatPace } from "../utils/formatContent";
import { formatDuration } from "../utils/formatContent";

const formatExercises = (exercises) => {
  const formattedExercises = exercises.map((exercise) => {
    exercise.formatted_date = new Date(
      exercise.datetime_started
    ).toLocaleDateString();
    exercise.formatted_time = new Date(
      exercise.datetime_started
    ).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    exercise.pace = formatPace(exercise.pace);
    exercise.duration = formatDuration(exercise.duration);
    exercise.datetime_started;
    return exercise;
  });
  return formattedExercises;
};

export const getTableExercises = async () => {
  const response = await axiosInstance(
    "user-exercises/?paginate=false&summary"
  );
  return formatExercises(response.data);
};

export const getAllExercises = async ({ pageParam = 1 }) => {
  const response = await axiosInstance.get(`exercises/?page=${pageParam}`);
  response.data.results = formatExercises(response.data.results);
  return response.data;
};

export const getUserExercises = async () => {
  const response = await axiosInstance.get("user-exercises/");
  response.data.results = formatExercises(response.data.results);
  return response.data;
};

export const getStatsExercises = async (
  startDatetime,
  endDatetime,
  activityType
) => {
  const response = await axiosInstance.get(
    `summary/?datetime_start=${startDatetime}&datetime_end=${endDatetime}&act_type=${activityType}`
  );
  response.data = formatExercises(response.data);
  return response.data;
};

export const addExercise = async (exercise) => {
  return await axiosInstance.post("user-exercises/", exercise);
};

export const updateExercise = async ({ exercise, id }) => {
  return await axiosInstance.put(`user-exercises/${id}`, exercise);
};

export const deleteExercise = async (id) => {
  return await axiosInstance.delete(`user-exercises/${id}`, id);
};
