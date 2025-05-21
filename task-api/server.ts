//import jsonServer from 'json-server';
const jsonServer = require('json-server');
import path from 'path';
import { Request, Response } from 'express';

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Fully typed PATCH route
server.patch('/tasks/:id', (req: Request, res: Response) => {
  const db = router.db; // Lowdb instance
  const { id } = req.params;  // This should now work correctly
  const task = db.get('tasks').find({ id }).value();

  if (task) {
    const updated = { ...task, ...req.body };
    db.get('tasks').find({ id }).assign(updated).write();
    res.status(200).json(updated);
  } else {
    res.sendStatus(404);
  }
});

server.use(router);
server.listen(3001, () => {
  console.log('Mock API running at http://localhost:3001');
});