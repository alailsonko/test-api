import express, { Request, Response } from "express";

interface Entity {
  id: number;
  name: string;
  description: string;
}

const entities: Entity[] = [];
let id = 0;

const app = express();
app.use(express.json());

app.get("/entities", (req: Request, res: Response) => {
  res.json(entities);
});

app.post("/entities", (req: Request, res: Response) => {
  const { name, description } = req.body;
  const entity = { id: id++, name, description };
  entities.push(entity);
  res.status(201).json(entity);
});

app.put("/entities/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const index = entities.findIndex((entity) => entity.id === +id);

  if (index === -1) {
    return res.status(404).json({ message: "Entity not found" });
  }

  const entity = { id: +id, name, description };
  entities[index] = entity;
  res.json(entity);
});

app.delete("/entities/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const index = entities.findIndex((entity) => entity.id === +id);

  if (index === -1) {
    return res.status(404).json({ message: "Entity not found" });
  }
  entities.splice(index, 1);
  res.status(204).send();
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
