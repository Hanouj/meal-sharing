const express = require("express");
const router = express.Router();
const knex = require("../database");

// maxPrice
router.get("/", async (request, response) => {
  let meals = knex("meal");
  if ("maxPrice" in request.query) {
    if (!maxPrice) {
      response.status(400).json({ status: 400, message: "You must add price" });
    } else {
      meals = meals.whereBetween("price", [0, request.query.maxPrice]);
    }
  }
  // availableReservations
  const reservation = request.query.availableReservation;
  if (
    "availableReservations" in request.query &&
    typeof reservation == "string"
  ) {
    meals = meals
      .join("reservation", "reservation.meal_id", "=", "meal.id")
      .groupBy("meal.id");
    if (reservation === "true") {
      meals = meals.having(
        "meal.max_reservations",
        ">",
        knex.raw("SUM(reservation.number_of_guests)")
      );
    } else {
      meals = meals.having(
        "meal.max_reservations",
        "=",
        knex.raw("SUM(reservation.number_of_guests)")
      );
    }
  }

  // title
  if ("title" in request.query) {
    const title = request.query.title;
    if (!title) {
      response.status(403).json("Please Add a title");
    } else {
      meals = meals.where("title", "like", `${title}%`);
    }
  }
  // dateAfter
  if ("dateAfter" in request.query) {
    const dateAfr = new Date(request.query.dateAfter);
    if (!dateAfr) {
      res.status(403).json("Please enter the date first");
    } else {
      meals = meals.where("when", ">", dateAfr);
    }
  }
  // dateBefore
  if ("dateBefore" in request.query) {
    const dateBfr = new Date(request.query.dateBefore);
    if (!dateBfr) {
      res.status(403).json("Please enter the date first");
    } else {
      meals = meals.where("when", "<", dateBfr);
    }
  }
  //limit
  if ("limit" in request.query) {
    const limit = Number(request.query.limit);
    if (!limit) {
      response.status(403).json("Please enter a limit number");
    } else {
      meals = meals.limit(limit);
    }
  }
  if (
    "sort_key" in request.query &&
    ["when", "max_reservations", "price"].includes(request.query.sort_key)
  ) {
    if (
      "sort_dir" in request.query &&
      ["asc", "desc"].includes(request.query.sort_dir)
    ) {
      meals = meals.orderBy(request.query.sort_key, request.query.sort_dir);
    } else {
      meals = meals.orderBy(request.query.sort_key);
    }
  }
  try {
    const mealRecord = await meals;
    response.json(mealRecord);
  } catch (error) {
    throw error;
  }
});

module.exports = router;
