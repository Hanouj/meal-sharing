const express = require("express");
const router = express.Router();
const knex = require("../database");

//select all
router.get("/", async (request, response) => {
  try {
    const reservations = await knex("reservation").select("*");
    response.json(reservations);
  } catch (error) {
    response.status(500).json({ error: "Server error" });
  }
});

//add new reservation
router.post("/", async (request, response) => {
  try {
    const addReservation = request.body;
    let today = new Date().toISOString().slice(0, 10);
    const [reservationId] = await knex("reservation").insert({
      number_of_guests: addReservation.number_of_guests,
      meal_id: addReservation.description,
      created_date: today,
      contact_phonenumber: addReservation.contact_phonenumber,
      contact_name: addReservation.contact_name,
      contact_email: addReservation.contact_email,
    });
    if (!reservationId) {
      response.status(404).json({ message: "No reservation found" });
    } else {
      response
        .status(201)
        .json({ message: "New created reservation", id: reservationId });
    }
  } catch (error) {
    response.status(500).json({ error: "Server error" });
  }
});
//returns a reservation by id
router.get("/:id", async (request, response) => {
  try {
    const reservationSearchId = await knex("reservation").where({
      id: request.params.id,
    });
    if (reservationSearchId.length > 0) {
      response.json(reservationSearchId);
    } else {
      response.status(404).send(`This Id in not found`);
    }
  } catch (error) {
    response.status(500).json({ error: "Server error" });
  }
});
//updates the reservation by id
router.put("/:id", async (request, response) => {
  try {
    const reservationUpdate = request.body;
    const reservationIdUpdate = await knex("resevration")
      .where({ id: request.params.id })
      .update({
        title: reservationUpdate.title,
        description: reservationUpdate.description,
      });
    response.json(reservationIdUpdate);
  } catch (error) {
    response.status(500).json({ error: "Server error" });
  }
});
//delete the reservation by id
router.delete("/:id", async (request, response) => {
  try {
    const reservationToDelete = await knex("reservation")
      .where({ id: request.params.id })
      .del();
    response.json(reservationToDelete);
  } catch (error) {
    response.status(500).json({ error: "Server error" });
  }
});
module.exports = router;
