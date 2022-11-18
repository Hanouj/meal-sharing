const express = require("express");
const router = express.Router();
const knex = require("../database");

// maxPrice

//select all
router.get("/", async (request, response) => {
  let meals = knex("meal");
  if ("maxPrice" in request.query) {
    if (!request.query.maxPrice) {
      response.status(400).json({ error: "You must add price" });
      return;
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
      return;
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
      response.status(400).json({ error: "Please Add a title" });
      return;
    } else {
      meals = meals.where("title", "like", `${title}%`);
    }
  }
  // dateAfter
  if ("dateAfter" in request.query) {
    const dateAfr = new Date(request.query.dateAfter);
    if (!dateAfr) {
      res.status(400).json({ error: "Please enter the date after" });
      return;
    } else {
      meals = meals.where("when", ">", dateAfr);
    }
  }
  // dateBefore
  if ("dateBefore" in request.query) {
    const dateBfr = new Date(request.query.dateBefore);
    if (!dateBfr) {
      res.status(400).json({ error: "Please enter the date before" });
      return;
    } else {
      meals = meals.where("when", "<", dateBfr);
    }
  }
  //limit
  if ("limit" in request.query) {
    const limit = Number(request.query.limit);
    if (!limit) {
      response.status(400).json({ error: "Please enter a limit number" });
      return;
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
    console.log(mealRecord);
    response.json(mealRecord);

    // const meals = await knex("meal").select("*");
    // response.json(meals);
  } catch (error) {
    response.status(500).json({ error: "Server error" });
  }
});
//new meal
router.post("/", async (request, response) => {
  try {
    const addMeal = request.body;
    let today = new Date().toISOString().slice(0, 10);
    const [mealsId] = await knex("meal").insert({
      title: addMeal.title,
      description: addMeal.description,
      location: addMeal.location,
      when: addMeal.when,
      max_reservations: addMeal.max_reservations,
      price: addMeal.price,
      created_date: today,
    });
    if (!mealsId) {
      response.status(404).json({ message: "No meals found" });
    } else {
      response.status(201).json({ message: "New created meal", id: mealsId });
    }
  } catch (error) {
    response.status(500).json({ error: "Server error" });
  }
});
// return the meal by id
router.get("/:id", async (request, response) => {
  try {
    const mealSearchId = await knex("meal").where({
      id: request.params.id,
    });
    if (mealSearchId.length > 0) {
      response.json(mealSearchId[0]);
    } else {
      response.status(404).json({ error: "No meal found" });
    }
  } catch (error) {
    response.status(500).json({ error: "Server error" });
  }
});
// update the meal by id
router.put("/:id", async (request, response) => {
  try {
    const mealToUpdate = request.body;
    const mealId = request.params.id;
    const meal = await knex("meal").where({ id: mealId });
    if (meal.length === 0) {
      response.status(400).json({ error: "There are no meals" });
    }
    if (Object.keys(mealToUpdate).length !== 0) {
      await knex("meal").where({ id: mealId }).update(mealToUpdate);
      const mealUpdated = await knex("meal").where({ id: mealId });
      response.json(mealUpdated[0]);
    } else {
      response.status(400).json({ error: "Meal does not exist" });
    }
  } catch (error) {
    response.status(500).json({ error: "Server error" });
  }
});
// delete the meal by id
router.delete("/:id", async (request, response) => {
  try {
    const meal = await knex("meal").where({ id: request.params.id });
    if (meal.length === 0) {
      response.status(400).json({ error: "No meal found" });
    }
    await knex("meal").where({ id: request.params.id }).del();
    response.json({ message: "Meal has been deleted" });
  } catch (error) {
    response.status(500).json({ error: "Server error" });
  }
});
module.exports = router;
