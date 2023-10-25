import express, { Express, Request, Response } from 'express';


const app: Express = express();
const port = process.env.PORT;


app.listen(port, () => {
  console.log(`Server is running`);
});