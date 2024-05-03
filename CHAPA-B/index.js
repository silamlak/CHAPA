import { config } from "dotenv";
import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
const PORT = 9000;

// Load environment variables from .env file
config();
app.use(express.json());
// Enable CORS
app.use(cors());
const CHAPA_AUTH_KEY = process.env.CHAPA_AUTH_KEY 

// Your routes and API implementations go here

app.get("/", (req, res) => {
  res.send("Hello from Express with dotenv and cors!");
});

app.post("/accept-payment", async (req, res) => {
  const {
    amount,
    currency,
    email,
    first_name,
    last_name,
    phone_number,
    tx_ref,
  } = req.body;
  console.log(CHAPA_AUTH_KEY);
  try {
    const header = {
      headers: {
        Authorization: `Bearer CHASECK_TEST-5HEUW4Qtdz1yun1v6skzeD6F2iknUotl`,
        "Content-Type": "application/json",
      },
    };
    const body = {
      amount: amount,
      currency: currency,
      email: email,
      first_name: first_name,
      last_name: last_name,
      phone_number: phone_number,
      tx_ref: tx_ref,
      return_url: "http://localhost:5173/", // Set your return URL
    };
    let resp = "";
    await axios
      .post("https://api.chapa.co/v1/transaction/initialize", body, header)
      .then((response) => {
        resp = response;
      })
      .catch((error) => {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        res.status(400).json({
          message: error,
        });
      });
    res.status(200).json(resp.data);
  } catch (e) {
    res.status(400).json({
      error_code: e.code,
      message: e.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
