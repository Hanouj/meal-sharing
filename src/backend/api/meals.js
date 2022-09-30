const express = require("express");
const { request, response } = require("../app");
const router = express.Router();
const knex = require("../database");

// maxPrice
router.get("/", async (request, response) => {
  let meals = knex("meal");
  if ("maxPrice" in request.query) {
    if (!"maxPrice") {
      response.status(403).json("Please enter data");
    } else {
      meals = meals.where("price", "<=", Number(request.query.maxPrice));
    }
  }
  // availableReservations

  if ("availableReservation" in request.query) {
    const reservation = request.query.availableReservation;
    if (false(reservation) && typeof reservation == "boolean") {
      response.status("Sorry there are no reservations!");
    } else if (true(reservation) && typeof reservation == "boolean") {
      meals = meals
        .join("reservation", "meal.id", "=", "reservation.meal_id")
        .select(
          "meal.id",
          "title",
          "max_reservations",
          knex.raw("(meal.max_reservations-SUM(reservation.number_of_guests)) ")
        )
        .where("meal.max_reservations", ">", "reservation.number_of_guests")
        .groupBy("meal.id")
        .having(
          "(meal.max_reservations-SUM(reservation.number_of_guests)) > 0"
        );
    }
  }
  // title
  if ("title" in request.query) {
    const title = request.query.title;
    if (!title) {
      response.status(403).json("Please enter data");
    } else {
      meals = meals.where("title", "like", `${title}%`);
    }
  }
  // dateAfter
  if ("dateAfter" in request.query) {
    const dateAfr = new Date(request.query.dateAfter);
    if (!dateAfr) {
      res.status(403).json("Please enter Data");
    } else {
      meals = meals.where("when", ">", dateAfr);
    }
  }
  // dateBefore
  if ("dateBefore" in request.query) {
    const dateBfr = new Date(request.query.dateBefore);
    if (!dateBfr) {
      res.status(403).json("Please enter Data");
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
  try {
    const mealRecord = await meals;
    response.json(mealRecord);
  } catch (error) {
    throw error;
  }
});

module.exports = router;
