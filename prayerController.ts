import { Request, Response } from 'express';
import { pool } from './database';
import { Prayer } from './prayerModel';
import { RowDataPacket, OkPacket } from 'mysql2';

// Create a new prayer
export const createPrayer = async (req: Request, res: Response) => {
  const newPrayer: Prayer = req.body;
  try {
    if (!newPrayer.title || !newPrayer.description || !newPrayer.date || !newPrayer.status) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const [result] = await pool.query<OkPacket>('INSERT INTO Prayers (title, description, date, status) VALUES (?, ?, ?, ?)', [newPrayer.title, newPrayer.description, newPrayer.date, newPrayer.status]);
    res.status(201).json({ id: result.insertId, ...newPrayer });
  } catch (error) {
    res.status(500).json({ message: 'Error creating prayer', error });
  }
};

// Get all prayers
export const getPrayers = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM Prayers');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching prayers', error });
  }
};

// Get a prayer by ID
export const getPrayerById = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM Prayers WHERE id = ?', [req.params.id]);
    if (rows.length > 0) {
      res.status(200).json(rows[0]);
    } else {
      res.status(404).json({ message: 'Prayer not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching prayer', error });
  }
};

// Update a prayer by ID
export const updatePrayerById = async (req: Request, res: Response) => {
  const updatedPrayer: Prayer = req.body;
  try {
    const [result] = await pool.query<OkPacket>('UPDATE Prayers SET title = ?, description = ?, date = ?, status = ? WHERE id = ?', [updatedPrayer.title, updatedPrayer.description, updatedPrayer.date, updatedPrayer.status, req.params.id]);
    if (result.affectedRows > 0) {
      res.status(200).json({ id: req.params.id, ...updatedPrayer });
    } else {
      res.status(404).json({ message: 'Prayer not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating prayer', error });
  }
};

// Delete a prayer by ID
export const deletePrayerById = async (req: Request, res: Response) => {
  try {
    const [result] = await pool.query<OkPacket>('DELETE FROM Prayers WHERE id = ?', [req.params.id]);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Prayer deleted' });
    } else {
      res.status(404).json({ message: 'Prayer not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting prayer', error });
  }
};



