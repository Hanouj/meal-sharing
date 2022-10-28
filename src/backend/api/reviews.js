const express = require("express");
const router = express.Router();
const knex = require("../database");

//all reviews
router.get("/", async (request, response) => {
  try {
    const reviews = await knex("review");
    reviews.length !== 0
      ? response.json(reviews)
      : response.status(404).send(` There are no reviews `);
  } catch (error) {
    response.status(500).json({ error: "Internal server error" });
  }
});

//review by id
router.get("/:id", async (request, response) => {
  try {
    const reviewById = await knex("review").where({ id: request.params.id });
    reviewById.length !== 0
      ? response.json(reviewById)
      : response
          .status(404)
          .json({ error: "There are no review under this id" });
  } catch (error) {
    response.status(500).json({ error: "Internal server error" });
  }
});

//new review
router.post("/", async (request, response) => {
  const newReview = request.body;
  const [reviewsId] = await knex("review").insert({
    title: newReview.title || "Untitled",
    description: newReview.description,
    meal_id: newReview.description,
    stars: newReview.stars,
    created_date: newReview.created_date,
  });
  try {
    response.status(201).json({ message: "Created reviews", id: reviewsId });
  } catch (error) {
    response.status(500).json({ error: "Internal server error" });
  }
});

//review by id
router.get("/:id", async (request, response) => {
  try {
    let reviewsQuery = await knex
      .select("*")
      .from(`review`)
      .where({ "review.id": request.params.id })
      .limit(1);
    if (reviewsQuery.length > 0) {
      response.json(reviewsQuery);
    } else {
      response.status(404).json({ error: "No reviews" });
    }
  } catch (error) {
    response.status(500).json({ error: "Internal server error" });
  }
});

//updates the review by id
router.put("/:id", async (request, response) => {
  try {
    const updateReview = request.body;
    const updateReviewById = await knex("review")
      .where({ id: request.params.id })
      .update({
        title: updateReview.title || "Untitled",
        description: updateReview.description,
        meal_id: updateReview.description,
        stars: updateReview.stars,
        created_date: updateReview.created_date,
      });
    if (updateReviewById === 0 || updateReviewById === "undefined") {
      response.status(404).json({ error: "unable to update the review" });
    } else {
      response
        .status(201)
        .json({ id: request.params.id, message: "Review has been updated" });
    }
  } catch (error) {
    response.status(500).json({ error: "Internal server error" });
  }
});

//delete review by id

router.delete("/:id", async (request, response) => {
  try {
    deleteReview = await knex("review").where({ id: request.params.id }).del();
    if (deleteReview === 0 || deleteReview === "undefined") {
      response.status(404).json({ error: "Cannot delete a review" });
    } else {
      response
        .status(201)
        .json({ id: request.params.id, message: "Review has been deleted" });
    }
  } catch (error) {
    response.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
