import express from "express";

const routes = express.Router();

routes.post("/posts", (req, res) => {
  return response.json({ message: "Hello World" });
});

export default routes;
