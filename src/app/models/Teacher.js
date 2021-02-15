const { date } = require("../../lib/utils");
const db = require("../../config/db");

module.exports = {
  all(callback) {
    db.query(`SELECT * FROM teachers ORDER BY name ASC`, (err, results) => {
      if (err) throw `Database Error ${err}`;
      callback(results.rows);
    });
  },

  create(data, callback) {
    const query = `INSERT INTO teachers(
      name,
      avatar_url,
      graduation,
      typeclass,
      services,
      birth,
      created_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`;

    const values = [
      data.name,
      data.avatar_url,
      data.graduation,
      data.typeclass,
      data.services,
      date(data.birth).iso,
      date(Date.now()).iso,
    ];

    db.query(query, values, (err, results) => {
      if (err) throw `Database Error ${err}`;
      callback(results.rows[0]);
    });
  },

  find(id, callback) {
    db.query(`SELECT * FROM teachers WHERE id = $1`, [id], (err, results) => {
      if (err) throw `Database Error ${err}`;
      callback(results.rows[0]);
    });
  },

  update(data, callback) {
    const query = `UPDATE teachers SET
        avatar_url=($1),
        name=($2),
        birth=($3),
        graduation=($4),
        typeclass=($5),
        services=($6)
        WHERE id = $7
    `;

    const values = [
      data.avatar_url,
      data.name,
      date(data.birth).iso,
      data.graduation,
      data.typeclass,
      data.services,
      data.id,
    ];
    db.query(query, values, (err, results) => {
      if (err) throw `Database error ${err}`;
      callback();
    });
  },

  delete(id, callback) {
    db.query(`DELETE FROM teachers WHERE id = $1`, [id], (err, results) => {
      if (err) throw `Database Error ${err}`;
      return callback();
    });
  },
};