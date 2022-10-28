const express = require("express");
const router = express.Router();
const knex = require("../database");

//select all
router.get("/", async (request, response) => {
  try {
    const meals = await knex("meal").select("*");
    response.json(meals);
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
      response.json(mealSearchId);
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
