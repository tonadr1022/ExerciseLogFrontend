import { formatDuration, formatPace, unformatPace } from "./formatContent";

const calcExerciseStats = (exercises) => {
  // each metric to track. Pace must come before duration because the pace
  // needs raw duration, so duration must be formatted for output after the pace is calculated.
  const metrics = {
    distance: {
      name: "Distance",
      sum: 0,
      max: -Infinity,
      min: Infinity,
      count: 0,
    },
    pace: { name: "Pace", max: -Infinity, min: Infinity, count: 0 },
    duration: {
      name: "Duration",
      sum: 0,
      max: -Infinity,
      min: Infinity,
      count: 0,
    },
    calories: {
      name: "Calories",
      sum: 0,
      max: -Infinity,
      min: Infinity,
      count: 0,
    },
    heartrate: {
      name: "Heartrate",
      sum: 0,
      max: -Infinity,
      min: Infinity,
      count: 0,
    },
    elevationGain: {
      name: "E. Gain",
      sum: 0,
      max: -Infinity,
      min: Infinity,
      count: 0,
    },
    temperature: {
      name: "Temperature",
      sum: 0,
      max: -Infinity,
      min: Infinity,
      count: 0,
    },
    feelsLike: {
      name: "Feels Like",
      sum: 0,
      max: -Infinity,
      min: Infinity,
      count: 0,
    },
    humidity: {
      name: "Humidity",
      sum: 0,
      max: -Infinity,
      min: Infinity,
      count: 0,
    },
    windSpeed: {
      name: "Wind Speed",
      sum: 0,
      max: -Infinity,
      min: Infinity,
      count: 0,
    },
  };

  // for each field, calculate sum, min, max, and increment count if they are present in the exercise
  exercises.forEach((exercise) => {
    const {
      distance,
      duration,
      calories,
      pace,
      average_heartrate,
      total_elevation_gain,
      weather,
    } = exercise;

    if (distance) {
      const curr = Math.round(parseFloat(distance) * 100) / 100;
      metrics.distance.sum += curr;
      metrics.distance.min = Math.min(metrics.distance.min, curr);
      metrics.distance.max = Math.max(metrics.distance.max, curr);
      metrics.distance.count++;
    }
    if (duration) {
      const curr = parseFloat(unformatPace(duration));
      metrics.duration.sum += curr;
      metrics.duration.min = Math.min(metrics.duration.min, curr);
      metrics.duration.max = Math.max(metrics.duration.max, curr);
      metrics.duration.count++;
    }
    if (average_heartrate) {
      const curr = parseFloat(average_heartrate);
      metrics.heartrate.sum += curr;
      metrics.heartrate.min = Math.min(metrics.heartrate.min, curr);
      metrics.heartrate.max = Math.max(metrics.heartrate.max, curr);
      metrics.heartrate.count++;
    }
    if (pace) {
      const curr = unformatPace(pace);
      metrics.pace.min = Math.min(metrics.pace.min, curr);
      metrics.pace.max = Math.max(metrics.pace.max, curr);
      metrics.pace.count++;
    }
    if (calories) {
      const curr = parseFloat(calories);
      metrics.calories.sum += curr;
      metrics.calories.min = Math.min(metrics.calories.min, curr);
      metrics.calories.max = Math.max(metrics.calories.max, curr);
      metrics.calories.count++;
    }
    if (total_elevation_gain) {
      const curr = parseFloat(total_elevation_gain);
      metrics.elevationGain.sum += curr;
      metrics.elevationGain.min = Math.min(metrics.elevationGain.min, curr);
      metrics.elevationGain.max = Math.max(metrics.elevationGain.max, curr);
      metrics.elevationGain.count++;
    }
    if (weather) {
      let curr = parseFloat(weather.temperature);
      metrics.temperature.sum += weather.temperature;
      metrics.temperature.min = Math.min(metrics.temperature.min, curr);
      metrics.temperature.max = Math.max(metrics.temperature.max, curr);
      metrics.temperature.count++;

      curr = parseFloat(weather.feels_like);
      metrics.feelsLike.sum += weather.feels_like;
      metrics.feelsLike.min = Math.min(metrics.feelsLike.min, curr);
      metrics.feelsLike.max = Math.max(metrics.feelsLike.max, curr);
      metrics.feelsLike.count++;

      curr = parseFloat(weather.humidity);
      metrics.humidity.sum += weather.humidity;
      metrics.humidity.min = Math.min(metrics.humidity.min, curr);
      metrics.humidity.max = Math.max(metrics.humidity.max, curr);
      metrics.humidity.count++;

      curr = parseFloat(weather.wind_speed);
      metrics.windSpeed.sum += weather.wind_speed;
      metrics.windSpeed.min = Math.min(metrics.windSpeed.min, curr);
      metrics.windSpeed.max = Math.max(metrics.windSpeed.max, curr);
      metrics.windSpeed.count++;
    }
  });
  // return object to hold everything
  let summary = { exerciseMetrics: {}, weatherMetrics: {} };

  // metrics where the sum field should be deleted
  const deleteSumMetrics = [
    "feelsLike",
    "heartrate",
    "humidity",
    "temperature",
    "windSpeed",
  ];

  // categorize these as weather to separate into different object
  const weatherMetrics = ["temperature", "humidity", "windSpeed", "feelsLike"];

  // unpack metric object, add averages, and add to summary object
  for (const [metric, values] of Object.entries(metrics)) {
    // set non populated fields to null
    if (values.max === -Infinity) values.max = null;
    if (values.min === Infinity) values.min = null;

    // format pace fields
    if (metric == "pace") {
      values.avg = formatPace(metrics.duration.sum / metrics.distance.sum);
      values.max = formatPace(values.max);
      values.min = formatPace(values.min);
      // format duration fields
    } else if (metric == "duration") {
      values.avg = formatDuration(values.sum / values.count);
      values.sum = formatDuration(values.sum);
      values.min = formatDuration(values.min);
      values.max = formatDuration(values.max);
    } else {
      values.avg = Math.round((values.sum / values.count) * 100) / 100;
      values.sum = Math.round(values.sum * 100) / 100;
    }
    if (deleteSumMetrics.includes(metric)) {
      delete values.sum;
    }
    // separate metrics based on group (weather or exercise based)
    if (weatherMetrics.includes(metric)) {
      summary.weatherMetrics[metric] = values;
    } else {
      summary.exerciseMetrics[metric] = values;
    }
  }
  // add quantity to the object
  summary.numExercises = exercises.length;

  return summary;
};
export default calcExerciseStats;
