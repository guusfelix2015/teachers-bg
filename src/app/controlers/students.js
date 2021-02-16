const Student = require("../models/Student");
const { age, date } = require("../../lib/utils");

module.exports = {
  index(req, res) {
    Student.all((students) => {
      return res.render("students/index", { students });
    });
  },

  create(req, res) {
    return res.render("students/create");
  },

  post(req, res) {
    const keys = Object.keys(req.body);
    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("please, fill all fiels");
      }
    }
    Student.create(req.body, (student) => {
      return res.redirect(`students/${student.id}`);
    });
  },

  show(req, res) {
    return;
  },

  edit(req, res) {
    return;
  },

  put(req, res) {
    const keys = Object.keys(req.body);
    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("please, fill all fiels");
      }
    }
    return;
  },

  delete(req, res) {
    return;
  },
};
