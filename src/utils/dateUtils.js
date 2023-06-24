export const getMostRecentMonday = () => {
  const dateObj = new Date();
  dateObj.setDate(dateObj.getDate() - ((dateObj.getDay() + 6) % 7));
  dateObj.setHours(0, 0, 0, 0);
  return dateObj;
};

export const getMonthStart = () => {
  const dateObj = new Date();
  dateObj.setDate(1);
  dateObj.setHours(0, 0, 0, 0);
  return dateObj;
};

export const changeDatetimeByMonths = (datetime, numMonths) => {
  const newDatetime = new Date(datetime);
  newDatetime.setMonth(datetime.getMonth() + numMonths);
  return newDatetime;
};

export const changeDatetimeByDays = (datetime, numDays) => {
  const newDatetime = new Date(datetime);
  newDatetime.setDate(newDatetime.getDate() + numDays);
  return newDatetime;
};
