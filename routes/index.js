// Express Router
const express = require("express");
const router = express.Router();

// Utilities
const {
  readFromFile,
  writeToFile,
  filterArrayById,
  filterArrayByIdAndReturnIndex,
  filterArray,
  sortArray,
} = require("../helpers/utils");

/**
 * @route: GET /api/:entity
 * @desc: Fetch all the records of the requested entity (filters can also be there)
 * @param {string} [optional] Query params - for sorting and searching (such as _sort, _order, title etc)
 * @return {array} records - All the filtered and sorted records of the entity with their length
 */
router.get("/:entity", async (req, res) => {
  try {
    // Fetch the data from the file
    const data = await readFromFile();

    // If file data not found
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "No File Data found!",
      });
    }

    // Get all the entities from the DB
    const entity = req.params.entity;
    let records = data[entity];

    // If data not found
    if (!records || records.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No ${entity} found!`,
      });
    }

    const queryObj = req.query;

    // Filtering the records (if any)
    if (JSON.stringify(queryObj) !== JSON.stringify({})) {
      records = await filterArray(records, queryObj);
    }

    // Sorting the records, by default in ascending order
    let order = "asc";
    if ("_sort" in queryObj) {
      if (queryObj._order === "desc") {
        order = "desc";
      }

      records = await sortArray(records, queryObj._sort, order);
    }

    // Return the final result
    return res
      .status(200)
      .json({ success: true, length: records.length, data: records });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error!" });
  }
});

/**
 * @route: GET /api/:entity/:id
 * @desc: Fetch a single record (by id) of the requested entity
 * @param {string} entity - the name of the parent container
 * @param {number} id - the id of the record of the requested entity
 * @return {object} entityRecord- The record in the requested entity. Return 404 if not found.
 */
router.get("/:entity/:id", async (req, res) => {
  try {
    // Fetch the data from the file
    const data = await readFromFile();

    // If file data not found
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "No File Data found!",
      });
    }

    // Get all the entities from the entire DB
    const entity = req.params.entity;
    const records = data[entity];

    // request parameters are strings whereas our ids are numbers
    const entityId = parseInt(req.params.id);

    // Take out the specific entity record with the mentioned id
    const entityRecord = await filterArrayById(records, entityId);

    // Entity record not found
    if (!entityRecord) {
      return res.status(404).json({
        success: false,
        message: `${entity} with id ${entityId} not found!`,
      });
    }

    // Return
    return res.status(200).json({ success: true, data: entityRecord });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error!" });
  }
});

/**
 * @route: POST /api/:entity
 * @desc: Add a new record to the entity. Or create a new entity if no previous records found
 * @param {string} entity - The name of the parent container
 * @return {array} records - All the records of the entity (including the new record that was inserted)
 */
router.post("/:entity", async (req, res) => {
  try {
    if (!req.body.id) {
      return res.status(400).json({
        success: false,
        message: "Every record entered must have an id associated with it!",
      });
    }

    // Fetch the data from the file
    const data = await readFromFile();

    // If file data not found
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "No File Data found!",
      });
    }

    // Get all the records from the entire DB
    const entity = req.params.entity;
    let records = data[entity];

    // If posts not found
    if (!records || records.length === 0) {
      records = [];
    }

    // Id sent in the request
    const id = req.body.id;

    // Validate for unique id
    const uniqueRecord = await filterArrayById(records, id);

    // In case a record with the same id in that entity is found
    if (uniqueRecord) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a unique ID" });
    }

    // Push the new object into the array
    records.push(req.body);

    // Reassign the data to be written to the file
    data[entity] = records;

    // Write the data back into the file
    await writeToFile(data);

    // Return
    return res
      .status(201)
      .json({ success: true, length: records.length, data: records });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error!" });
  }
});

/**
 * @route: PUT /api/:entity/:id
 * @desc: Edit an existing record of the entity identitfied by a unique id.
 * @param {string} entity - the name of the parent container
 * @param {number} id - the id of the record of the requested entity
 * @return {object} updatedRecord - The updated record
 */
router.put("/:entity/:id", async (req, res) => {
  try {
    // Fetch the data from the file
    const data = await readFromFile();

    // If file data not found
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "No File Data found!",
      });
    }

    // Make sure that the id cannot be mutated
    const id = req.body.id;

    if (id) {
      return res.status(403).json({
        success: false,
        message: "You cannot change the id of the record",
      });
    }

    // Record id
    const recordId = parseInt(req.params.id);

    // Get all the records from the entire DB
    const entity = req.params.entity;
    let records = data[entity];

    // If records not found
    if (!records || records.length === 0) {
      return res.status(404).json({
        success: false,
        message: `${entity} with id ${recordId} not found`,
      });
    }

    // Check if the record with the given id exists
    const recordExists = await filterArrayById(records, recordId);
    const index = await filterArrayByIdAndReturnIndex(records, recordId);

    // Records does not exist
    if (!recordExists) {
      return res.status(400).json({
        success: false,
        message: `${entity} with id ${recordId} not found`,
      });
    }

    // This will be our updated record
    let updatedRecord = recordExists;

    // Loop through the request body and update the necessary fields
    for (const key in req.body) {
      if (updatedRecord[key] !== undefined) {
        updatedRecord[key] = req.body[key];
      }
    }

    // Update the records array for the updated record
    records[index] = updatedRecord;

    // Reassign the data to be written to the file
    data[entity] = records;

    // Write the data back into the file
    await writeToFile(data);

    // Return
    return res.status(201).json({ success: true, data: updatedRecord });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error!" });
  }
});

/**
 * @route: DELETE /api/:entity/:id
 * @desc: Delete an existing record of the entity identitfied by a unique id.
 * @param {string} entity - the name of the parent container
 * @param {number} id - the id of the record of the requested entity
 * @return {string} message - Success or error message
 */
router.delete("/:entity/:id", async (req, res) => {
  try {
    // Fetch the data from the file
    const data = await readFromFile();

    // If file data not found
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "No File Data found!",
      });
    }

    // Record id
    const recordId = parseInt(req.params.id);

    // Get all the records from the entire DB
    const entity = req.params.entity;
    let records = data[entity];

    // If records not found
    if (!records || records.length === 0) {
      return res.status(404).json({
        success: false,
        message: `${entity} with id ${recordId} not found`,
      });
    }

    // Check if the record with the given id exists
    const index = await filterArrayByIdAndReturnIndex(records, recordId);

    // Records does not exist
    if (index === -1) {
      return res.status(400).json({
        success: false,
        message: `${entity} with id ${recordId} not found`,
      });
    }

    // Delete the corresponding record from the array
    records.splice(index, 1);

    // Reassign the data to be written to the file
    data[entity] = records;

    // Write the data back into the file
    await writeToFile(data);

    // Return
    return res
      .status(200)
      .json({ success: true, message: "Record deleted successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error!" });
  }
});

module.exports = router;
