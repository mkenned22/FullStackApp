const path = require("path");
const router = require("express").Router();
const db = require("../models/trip");

const tripFunctions = {
  findAll: function (req, res) {
    db
      .find({"uid": req.params.id})
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    db
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    db
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findAllThatContain: function (req, res) {
    db
      .find({"where":{$regex:`.*${req.params.id}.*`}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
}

router.get("/api/dashboard/trips/:id", tripFunctions.findAll)

router.post("/api/dashboard", tripFunctions.create)

router.delete("/api/dashboard/:id", tripFunctions.remove)

router.get("/api/dashboard/:id", tripFunctions.findById)

router.patch("/api/dashboard/:id", tripFunctions.update)

router.get("/api/search/:id", tripFunctions.findAllThatContain)

// If no API routes are hit, send the React app
router.use(function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
