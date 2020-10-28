const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  const{ title } = request.query;

  const result = title 
  ? repositories.filter((repository) => repository.title.includes(title))
  : repositories;

  return response.json(result);
});

app.post("/repositories", (request, response) => {
  const { 
    title, 
    url, 
    techs
   } = request.body;
  
  const repository = {
    id: uuid(), 
    title, 
    url,
    techs,
    likes: 0
  };

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repo = repositories.find(repository => repository.id === id)


  repo.likes += 1;

  return response.json(repo);
});

module.exports = app;
