const Teacher = require("../models/Teacher");
const { age, date } = require("../../lib/utils");

module.exports = {
  index(req, res) {
    const { filter } = req.query;

    if (filter) {
      Teacher.findby(filter, (teachers) => {
        return res.render("teachers/index", { teachers, filter });
      });
    } else {
      Teacher.all((teachers) => {
        return res.render("teachers/index", { teachers });
      });
    }
  },

  create(req, res) {
    return res.render("teachers/create");
  },

  post(req, res) {
    const keys = Object.keys(req.body);
    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("please, fill all fiels");
      }
    }
    Teacher.create(req.body, (teacher) => {
      return res.redirect(`teachers/${teacher.id}`);
    });
  },

  show(req, res) {
    Teacher.find(req.params.id, (teacher) => {
      if (!teacher) return res.send("Teacher not found");
      teacher.age = age(teacher.birth);
      teacher.created_at = date(teacher.created_at).format;
      teacher.services = teacher.services.split(",");
      return res.render("teachers/show", { teacher });
    });
  },

  edit(req, res) {
    Teacher.find(req.params.id, (teacher) => {
      if (!teacher) return res.send("Teacher not found");

      teacher.birth = date(teacher.birth).iso;

      return res.render("teachers/edit", { teacher });
    });
  },

  put(req, res) {
    const keys = Object.keys(req.body);
    for (key of keys) {
      if (req.body[key] == "") return res.send("please, fill all fiels");
    }

    Teacher.update(req.body, () => {
      return res.redirect(`teachers/${req.body.id}`);
    });
  },

  delete(req, res) {
    Teacher.delete(req.body.id, () => {
      return res.redirect("/teachers");
    });
  },
};
