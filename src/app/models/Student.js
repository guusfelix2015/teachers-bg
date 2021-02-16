const { date } = require("../../lib/utils");
const db = require("../../config/db");

module.exports = {
  all(callback) {
    db.query(`SELECT * FROM students ORDER BY name ASC`, (err, results) => {
      if (err) throw `Database Error ${err}`;
      callback(results.rows);
    });
  },

  create(data, callback) {
    const query = `INSERT INTO students(
      name,
      avatar_url,
      email,
      graduation,
      carga,
      typeclass,
      birth
    ) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id`;

    const values = [
      data.name,
      data.avatar_url,
      data.email,
      data.graduation,
      data.carga,
      data.typeclass,
      date(data.birth).iso,
    ];

    db.query(query, values, (err, results) => {
      if (err) throw `Database Error ${err}`;
      callback(results.rows[0]);
    });
  },

  find(id, callback) {
    db.query(`SELECT * FROM students WHERE id = $1`, [id], (err, results) => {
      if (err) throw `Database Error ${err}`;
      callback(results.rows[0]);
    });
  },
};
