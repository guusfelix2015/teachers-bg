const Teacher = require("../models/Teacher");
const { age, date } = require("../../lib/utils");

module.exports = {
  index(req, res) {
    let { filter, page, limit } = req.query;

    page = page || 1;
    limit = limit || 2;
    let offset = limit * (page - 1);

    const params = {
      filter,
      page,
      limit,
      offset,
      callback(teachers) {
        const pagination = {
          total: Math.ceil(teachers[0].total / limit),
          page,
        };
        return res.render("teachers/index", {
          teachers,
          pagination,
          filter,
        });
      },
    };
    Teacher.paginate(params);
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
