"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePrayerById = exports.updatePrayerById = exports.getPrayerById = exports.getPrayers = exports.createPrayer = void 0;
const database_1 = require("./database");
// Create a new prayer
const createPrayer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newPrayer = req.body;
    try {
        if (!newPrayer.title || !newPrayer.description || !newPrayer.date || !newPrayer.status) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const [result] = yield database_1.pool.query('INSERT INTO Prayers (title, description, date, status) VALUES (?, ?, ?, ?)', [newPrayer.title, newPrayer.description, newPrayer.date, newPrayer.status]);
        res.status(201).json(Object.assign({ id: result.insertId }, newPrayer));
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating prayer', error });
    }
});
exports.createPrayer = createPrayer;
// Get all prayers
const getPrayers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield database_1.pool.query('SELECT * FROM Prayers');
        res.status(200).json(rows);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching prayers', error });
    }
});
exports.getPrayers = getPrayers;
// Get a prayer by ID
const getPrayerById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield database_1.pool.query('SELECT * FROM Prayers WHERE id = ?', [req.params.id]);
        if (rows.length > 0) {
            res.status(200).json(rows[0]);
        }
        else {
            res.status(404).json({ message: 'Prayer not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching prayer', error });
    }
});
exports.getPrayerById = getPrayerById;
// Update a prayer by ID
const updatePrayerById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedPrayer = req.body;
    try {
        const [result] = yield database_1.pool.query('UPDATE Prayers SET title = ?, description = ?, date = ?, status = ? WHERE id = ?', [updatedPrayer.title, updatedPrayer.description, updatedPrayer.date, updatedPrayer.status, req.params.id]);
        if (result.affectedRows > 0) {
            res.status(200).json(Object.assign({ id: req.params.id }, updatedPrayer));
        }
        else {
            res.status(404).json({ message: 'Prayer not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating prayer', error });
    }
});
exports.updatePrayerById = updatePrayerById;
// Delete a prayer by ID
const deletePrayerById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [result] = yield database_1.pool.query('DELETE FROM Prayers WHERE id = ?', [req.params.id]);
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Prayer deleted' });
        }
        else {
            res.status(404).json({ message: 'Prayer not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting prayer', error });
    }
});
exports.deletePrayerById = deletePrayerById;
