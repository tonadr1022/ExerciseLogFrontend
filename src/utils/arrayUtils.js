/**
 * Creates a new array that is the cumulative version of the input
 *
 * @param {*} arr array to create accumulated copy of
 * @returns cumulative array
 */
export const accumulate = (arr, formatFunction) => {
  let cumulativeData = [];
  console.log(arr);
  for (let i = 0; i < arr.length; i++) {
    if (!arr[i]) {
      cumulativeData.push(i == 0 ? 0 : parseFloat(cumulativeData[i - 1]));
    } else if (i == 0) {
      cumulativeData.push(parseFloat(arr[i]));
    } else {
      cumulativeData.push(parseFloat(arr[i]) + cumulativeData[i - 1]);
    }
  }

  if (formatFunction) {
    let formattedData = [];
    for (const entry of cumulativeData) {
      formattedData.push(formatFunction(entry));
    }
    cumulativeData = formattedData;
  }
  return cumulativeData;
};
/**
 * Creates a new array that is the decumulated version of the cumulated array input
 *
 * @param {*} arr array to create decumulated copy of
 * @returns decumulated array
 */
export const decumulate = (arr, formatFunction) => {
  let decumulatedData = [];
  for (let i = 0; i < arr.length; i++) {
    if (i == 0) {
      decumulatedData.push(arr[i]);
    } else {
      decumulatedData.push(arr[i] - arr[i - 1]);
    }
  }
  if (formatFunction) {
    let formattedData = [];
    for (const entry of decumulatedData) {
      formattedData.push(formatFunction(entry));
    }
    decumulatedData = formattedData;
  }
  return decumulatedData;
};
