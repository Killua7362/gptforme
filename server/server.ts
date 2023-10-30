import express, { Express, Request, Response } from 'express';
import {GoogleAuth,} from 'google-auth-library'

const app: Express = express();
const port = 5050;
async function getexternalip(){
  const auth = new GoogleAuth();
  const authClient = await auth.getClient()
}
getexternalip()
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});