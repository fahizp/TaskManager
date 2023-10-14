import { db } from "../model/db.js";
import moment from 'moment';

export const getAllTask = (req, res) => {

  const q = "SELECT * FROM tasks";

  db.query(q, (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};

export const getTask = (req, res) => {
  const q = "SELECT * FROM tasks WHERE id = ?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};

export const addTask = (req, res) => {
  const { heading, description, date, image, priority } = req.body;
  if (!heading || !description || !date || !image || !priority) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const formattedDate = moment(date).format('YYYY-MM-DD HH:mm:ss');

  const q =
    "INSERT INTO tasks (`heading`, `description`, `date`, `image`, `priority`) VALUES (?, ?, ?, ?, ?)";

  const values = [heading, description, formattedDate, image, priority];

  db.query(q, values, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    } 

    return res.json("Task has been created.");
  });
};

export const deleteTask = (req, res) => {
  const taskId = req.params.id;
  const q = "DELETE FROM tasks WHERE `id` = ?";

  db.query(q, [taskId], (err, data) => {
    if (err) return res.status(403).json(err);

    return res.json("Task has been deleted!");
  });
};

export const updateTask = (req, res) => {
  const taskId = req.params.id;
  const { heading, description, image, priority } = req.body;

  if (!heading || !description || !image || !priority) {
    return res.status(400).json({ error: "All fields are required." });
  }
  const q =
    "UPDATE tasks SET `heading`=?,`description`=?,`image`=?, `priority`=? WHERE `id` = ? ";

  const values = [heading, description, image, priority, taskId];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Task has been updated.");
  });
};
