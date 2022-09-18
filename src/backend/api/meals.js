const express = require("express");
const router = express.Router();
const knex = require("../database");

//select all
router.get("/", async (request, response) => {
  try {
    const meals = await knex("meal").select("*");
    response.json(meals);
  } catch (error) {
    throw error;
  }
});
//new meal
router.post("/", async (request, response) => {
  const addmeal = request.body;
  const [mealsId] = await knex("meal").insert({
    title: addmeal.title,
    description: addmeal.description,
    location: addmeal.location,
    when: addmeal.when,
    max_reservations: addmeal.max_reservations,
    price: addmeal.price,
    created_date: addmeal.created_date,
  });
  if (mealsId === 0) {
    response.status(404).json({ message: "No meals found" });
  } else {
    response.status(201).json({ message: "New created meal", id: mealsId });
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
      response.status(404).send(`This Id in not found`);
    }
  } catch (error) {
    throw error;
  }
});
// update the meal by id
router.put("/:id", async (request, response) => {
  try {
    const mealUpdate = request.body;
    const mealIdUpdate = await knex("meal")
      .where({ id: request.params.id })
      .update({
        title: mealUpdate.title,
        description: mealUpdate.description,
      });
    response.json(mealIdUpdate);
  } catch (error) {
    throw error;
  }
});
// delete the meal by id
router.delete("/:id", async (request, response) => {
  try {
    const mealToDelete = await knex("meal")
      .where({ id: request.params.id })
      .del();
    response.json(mealToDelete);
  } catch (error) {
    throw error;
  }
});
module.exports = router;
