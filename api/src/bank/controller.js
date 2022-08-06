
const express = require("express");
const serverless = require("serverless-http");
const BankService = require("./service");
const app = express();
app.use(express.json());

app.get("/bank/:bankId", async function (req, res) {
  try {
    console.log(JSON.stringify(req.header))
    let data = await BankService.getById(req.params.bankId, req.headers['user-id']);
    res.json(data.Item);
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Error in server", detail: err });
  }
});

app.get("/bank/", async function (req, res) {
  try {
    let data = await BankService.getAllByUserId(req.headers['user-id']);
    res.json(data);
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Error in server", detail: err });
  }
});

app.post("/bank/", async function (req, res) {
  try {
    let data = await BankService.add(req.body)
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.put('/bank/:bankId', async function (req, res) {
  try {
    let account = await BankService.update( req.params.bankId, req.headers['user-id'], req.body);
    res.status(200).json(account);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.delete('/bank/:bankId', async function (req, res) {
  try {
    await BankService.delete( req.params.bankId, req.headers['user-id']);
    res.status(200).json({ message: `bank id : ${req.params.bankId} deleted successfully` });
  }
  catch (err) {
    res.json({ message: err });
  }
});

const handler = serverless(app);


module.exports.handler = async (event, context) => {
  const result = await handler(event, context);
  // const data = JSON.parse(result.body);
  // if (data.status) {
  //   result.statusCode = data.status;
  // }
  return result;
};
