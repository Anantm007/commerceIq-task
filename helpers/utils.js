// Utilities
const fs = require("fs");
const path = require("path");

// File location where the JSON Database (file) is stored
const filePath = path.join(process.cwd(), "db", "store.json");

// Read data from the file asynchronously and return the parsed JSON
const readFromFile = async () => {
  let jsonData = await fs.readFileSync(filePath, "utf-8");

  // If the file is completely empty, initialise an empty JSON object in the file
  if (!jsonData) {
    const data = {};
    await fs.writeFileSync(filePath, JSON.stringify(data));

    jsonData = await fs.readFileSync(filePath);
  }

  // Parse the data
  const data = JSON.parse(jsonData);

  // Return the parsed data
  return data;
};

// Write data to the file asynchronously
const writeToFile = async (data) => {
  await fs.writeFileSync(filePath, JSON.stringify(data));
};

// Filter the array and return the required object
const filterArrayById = async (records, id) => {
  const filteredRecords = await records.filter((record) => {
    return record.id === id;
  });

  // filteredRecord is an array, we need just the frst element
  const record = filteredRecords[0];

  return record;
};

// Filter the array and return the index of the object if found
const filterArrayByIdAndReturnIndex = async (records, id) => {
  let index = -1;

  const filteredRecords = await records.filter((record, i) => {
    if (record.id === id) {
      index = i;
    }

    return record.id === id;
  });

  return index;
};

/**
 * Filter an Array
 * @param {array} records - The array to be sorted
 * @param {string} filteringObj - The attributes using which we have to filter the records
 * @return {array} filteredRecords - The filtered array
 */
const filterArray = async (records, filteringObj) => {
  // Ignore _sort and _order while filtering
  if (filteringObj._sort) {
    delete filteringObj._sort;
  }

  if (filteringObj._order) {
    delete filteringObj._order;
  }

  const filteredRecords = records.filter((record) => {
    let counter = 0;

    for (const key in filteringObj) {
      counter++;

      if (record[key].toString() !== filteringObj[key]) {
        return false;
      }

      if (counter === Object.keys(filteringObj).length) {
        return true;
      } else {
        continue;
      }
    }
  });

  return filteredRecords;
};

/**
 * Sort an Array
 * @param {array} records - The array to be sorted
 * @param {string} key - The key attribute on whose basis the array should be sorted
 * @param {string} order - The order in which the array should be sorted
 * @return {array} sortedRecords - The sorted array
 */
const sortArray = async (records, key, order) => {
  const sortedRecords = records.sort(function (a, b) {
    if (order === "asc") {
      if (a[key] > b[key]) {
        return 1;
      } else {
        return -1;
      }
    }

    if (order === "desc") {
      if (a[key] < b[key]) {
        return 1;
      } else {
        return -1;
      }
    }

    return 0;
  });

  return sortedRecords;
};

module.exports = {
  readFromFile,
  writeToFile,
  filterArrayById,
  filterArrayByIdAndReturnIndex,
  filterArray,
  sortArray,
};
