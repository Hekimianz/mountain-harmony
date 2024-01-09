const pool = require("../models/db");

module.exports = {
  getAll: async (req, res) => {
    try {
      if (req.query.category) {
        const query = await pool.query(
          "SELECT * FROM products WHERE category = $1 ORDER BY id",
          [req.query.category]
        );
        if (query.rows.length === 0) {
          return res
            .status(404)
            .json({ message: "No products with given category found" });
        }
        return res.send(query.rows);
      }
      const query = await pool.query("SELECT * FROM products ORDER BY id");
      res.send(query.rows);
    } catch (error) {
      res.send(error).status(404);
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;
      const query = await pool.query("SELECT * FROM products WHERE id = $1", [
        id,
      ]);
      if (query.rows.length === 0) {
        return res
          .status(404)
          .json({ message: "No product with given id found" });
      }
      res.send(query.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
