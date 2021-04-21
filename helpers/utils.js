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
const filterArray = async (records, id) => {
  const filteredRecords = await records.filter((record) => {
    return record.id === id;
  });

  // filteredRecord is an array, we need just the frst element
  const record = filteredRecords[0];

  return record;
};

// Filter the array and return the index of the object if found
const filterArrayAndReturnIndex = async (records, id) => {
  let index = -1;

  const filteredRecords = await records.filter((record, i) => {
    if (record.id === id) {
      index = i;
    }

    return record.id === id;
  });

  return index;
};

module.exports = {
  readFromFile,
  writeToFile,
  filterArray,
  filterArrayAndReturnIndex,
};
