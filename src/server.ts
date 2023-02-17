import express, { Request, Response } from "express";

const app = express();
const PORT = 3500;

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello, world!" });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
