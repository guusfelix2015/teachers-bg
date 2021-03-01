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
      birth,
      teacher_id
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`;

    const values = [
      data.name,
      data.avatar_url,
      data.email,
      data.graduation,
      data.carga,
      data.typeclass,
      date(data.birth).iso,
      data.teacher,
    ];

    db.query(query, values, (err, results) => {
      if (err) throw `Database Error ${err}`;
      callback(results.rows[0]);
    });
  },

  find(id, callback) {
    db.query(
      `SELECT students.*, teachers.name AS teacher_name
       FROM students
       LEFT JOIN teachers ON (students.teacher_id = teachers.id)
       WHERE students.id = $1`,
      [id],
      (err, results) => {
        if (err) throw `Database Error ${err}`;
        callback(results.rows[0]);
      }
    );
  },

  update(data, callback) {
    const query = `UPDATE students SET 
    avatar_url=($1),
    name=($2),
    birth=($3),
    email=($4),
    graduation=($5),
    carga=($6),
    typeclass=($7),
    teacher_id=($8)
    WHERE id = $9
    `;
    const values = [
      data.avatar_url,
      data.name,
      date(data.birth).iso,
      data.email,
      data.graduation,
      data.carga,
      data.typeclass,
      data.teacher,
      data.id,
    ];

    db.query(query, values, (err, results) => {
      if (err) throw `Database error ${err}`;
      callback();
    });
  },

  delete(id, callback) {
    db.query(`DELETE FROM students WHERE id = $1`, [id], (err, results) => {
      if (err) throw `Database Error ${err}`;
      return callback();
    });
  },

  teachersSelectOption(callback) {
    db.query(`SELECT name,id FROM teachers`, (err, results) => {
      if (err) throw `Database Error ${err}`;
      callback(results.rows);
    });
  },
};
