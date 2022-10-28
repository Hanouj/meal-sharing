const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");

const mealsRouter = require("./api/meals");
const reservationsRouter = require("./api/reservations");
const buildPath = path.join(__dirname, "../../dist");
const port = process.env.PORT || 3000;
const cors = require("cors");

// For week4 no need to look into this!
// Serve the built client html
app.use(express.static(buildPath));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(cors());

router.use("/meals", mealsRouter);
nodejs-week2
router.use("/reservations", reservationsRouter);

app.get("/my-route", (req, res) => {
  res.send("Hi friend");
});
//future-meals
app.get("/future-meals", async (req, res) => {
  try {
    const [rows] = await knex.raw("SELECT * FROM meal WHERE when > now()");
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal server error" });
  }
});
//past-meals
app.get("/past-meals", async (req, res) => {
  try {
    const [rows] = await knex.raw("SELECT * FROM meal WHERE when < NOW() ");
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal server error" });
  }
});
//all-meals
app.get("/all-meals", async (req, res) => {
  try {
    const [rows] = await knex.raw("SELECT * FROM meal ORDER BY id");
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal server error" });
  }
});
//first-meal
app.get("/first-meal", async (req, res) => {
  try {
    const [rows] = await knex.raw("SELECT * FROM meal ORDER BY id limit 1");
    if (rows.length > 0) {
      res.json(rows);
    } else {
      res.status(404).json({ error: "No meals found" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal server error" });
  }
});
//last-meal
app.get("/last-meal", async (req, res) => {
  try {
    const [rows] = await knex.raw(
      "SELECT * FROM meal ORDER BY id DESC limit 1"
    );
    if (rows.length > 0) {
      res.json(rows);
    } else {
      res.status(404).json({ error: "No meals found" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal server error" });
  }
});
 main

if (process.env.API_PATH) {
  app.use(process.env.API_PATH, router);
} else {
  throw "API_PATH is not set. Remember to set it in your .env file";
}

// for the frontend. Will first be covered in the react class
app.use("*", (req, res) => {
  res.sendFile(path.join(`${buildPath}/index.html`));
});

module.exports = app;
