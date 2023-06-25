export const formatPace = (pace) => {
  const minutes = Math.trunc(pace);
  const seconds = Math.round((pace % 1) * 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};
export const toDurationStringFromSeconds = (duration) => {
  const days = parseFloat(duration) / 24 / 3600;
  const hours = (days % 1) * 24;
  const minutes = (hours % 1) * 60;
  let durationStr = "";
  if (days > 0) durationStr += `${Math.floor(days)} days, `;
  durationStr += `${Math.floor(hours)} hrs`;
  if (days === 0) duration += `, ${Math.floor(minutes)} min`;
  return durationStr;
};
export const formatDuration = (duration) => {
  if (duration) {
    let totalMinutes;
    let totalSeconds;
    let totalHours;
    if (typeof duration == "number") {
      let hours = Math.floor(duration / 60);
      let minutes = Math.floor(duration % 60);
      let seconds = Math.floor((duration % 1) * 60);
      const formattedHours = String(hours).padStart(2, "0");
      const formattedMinutes = String(minutes).padStart(2, "0");
      const formattedSeconds = String(seconds).padStart(2, "0");
      return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    } else {
      [totalHours, totalMinutes, totalSeconds] = duration.split(":");
    }
    totalMinutes = parseInt(totalHours) * 60 + parseInt(totalMinutes);
    return `${totalMinutes < 10 ? "0" : ""}${totalMinutes}:${totalSeconds}`;
  } else {
    return "00:00";
  }
};

export const unformatDuration = (duration) => {
  if (duration) {
    const components = duration.split(":");
    const minutes = parseFloat(components[0]);
    const seconds = parseFloat(components[1]);
    return Math.round((minutes + seconds / 60) * 100) / 100;
  } else {
    return 0;
  }
};

export const unformatPace = (pace) => {
  const paceParts = pace.split(":").map((part) => Number(part));
  return Math.round((paceParts[0] + paceParts[1] / 60) * 10000) / 10000;
};

export const capitalize = (str) => {
  firstLetter = str.charAt(0);
  restWord = str.slice(1);
  return firstLetter.toUpperCase() + restWord;
};
