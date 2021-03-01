const Student = require("../models/Student");
const { age, date } = require("../../lib/utils");

module.exports = {
  index(req, res) {
    Student.all((students) => {
      return res.render("students/index", { students });
    });
  },

  create(req, res) {
    Student.teachersSelectOption((options) => {
      return res.render("students/create", { teachersSelectOption: options });
    });
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
    Student.find(req.params.id, (student) => {
      if (!student) return res.send("Student not found");
      student.birth = date(student.birth).birthDay;
      return res.render("students/show", { student });
    });
  },

  edit(req, res) {
    Student.find(req.params.id, (student) => {
      if (!student) return res.send("Student not found");

      student.birth = date(student.birth).iso;

      Student.teachersSelectOption((options) => {
        return res.render("students/edit", {
          student,
          teachersSelectOption: options,
        });
      });
    });
  },

  put(req, res) {
    const keys = Object.keys(req.body);
    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("please, fill all fiels");
      }
    }
    Student.update(req.body, () => {
      return res.redirect(`students/${req.body.id}`);
    });
  },

  delete(req, res) {
    Student.delete(req.body.id, () => {
      return res.redirect("/students");
    });
  },
};
