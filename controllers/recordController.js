import Record from "../models/Record.js";

// @desc    Create a record
// @route   POST /api/records
// @access  Private/Admin
export const createRecord = async (req, res, next) => {
  try {
    const { amount, type, category, date, notes } = req.body;

    const record = await Record.create({
      amount,
      type,
      category,
      date,
      notes,
      createdBy: req.user.id,
    });

    res.status(201).json(record);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all records (with filtering)
// @route   GET /api/records
// @access  Private/Admin, Analyst
export const getRecords = async (req, res, next) => {
  try {
    const { type, category, startDate, endDate } = req.query;
    let query = {};

    if (type) query.type = type;
    if (category) query.category = category;
    
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    // Sort by date descending
    const records = await Record.find(query).sort({ date: -1 }).populate('createdBy', 'name email');
    res.json(records);
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single record
// @route   GET /api/records/:id
// @access  Private/Admin, Analyst
export const getRecordById = async (req, res, next) => {
  try {
    const record = await Record.findById(req.params.id).populate('createdBy', 'name email');

    if (record) {
      res.json(record);
    } else {
      res.status(404);
      throw new Error("Record not found");
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Update a record
// @route   PUT /api/records/:id
// @access  Private/Admin
export const updateRecord = async (req, res, next) => {
  try {
    const record = await Record.findById(req.params.id);

    if (record) {
      record.amount = req.body.amount !== undefined ? req.body.amount : record.amount;
      record.type = req.body.type || record.type;
      record.category = req.body.category || record.category;
      record.date = req.body.date || record.date;
      record.notes = req.body.notes !== undefined ? req.body.notes : record.notes;

      const updatedRecord = await record.save();
      res.json(updatedRecord);
    } else {
      res.status(404);
      throw new Error("Record not found");
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a record
// @route   DELETE /api/records/:id
// @access  Private/Admin
export const deleteRecord = async (req, res, next) => {
  try {
    const record = await Record.findById(req.params.id);

    if (record) {
      await record.deleteOne();
      res.json({ message: "Record removed successfully" });
    } else {
      res.status(404);
      throw new Error("Record not found");
    }
  } catch (error) {
    next(error);
  }
};
