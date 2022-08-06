
const express = require("express");
const serverless = require("serverless-http");
const AccountService = require("./service");
const app = express();
app.use(express.json());

app.get("/account/:bankId", async function (req, res) {
  try {
    let data = await AccountService.getByBankId(req.params.bankId)
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error in server", detail: err.message });
  }
});

app.get("/account/:accountId/:bankId", async function (req, res) {
  try {
    let data = await AccountService.getById(req.params.accountId, req.params.bankId);
    res.json(data.Item);
  } catch (err) {
    res.status(500).json({ message: "Error in server", detail: err.message });
  }
});

app.post("/account/", async function (req, res) {
  try {
    let data = await AccountService.addAccount(req.body, req.headers['user-id'])
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error in server", detail: error.message });
  }
});

app.put('/account/:accountId/:bankId', async function (req, res) {
  try {
    let account = await AccountService.update(req.params.id, req.params.bankId, req.body);
    res.status(200).json(account);
  } catch (err) {
    res.status(500).json({ message: "Error in server", detail: err.message });
  }
});

app.delete('/account/:accountId/:bankId', async function (req, res) {
  try {
    await AccountService.delete(req.params.accountId, req.params.bankId);
    res.status(200).json({ message: `Account id : ${req.params.accountId} deleted successfully` });
  }
  catch (err) {
    res.status(500).json({ message: "Error in server", detail: err.message });
  }
});

const handler = serverless(app);


module.exports.handler = async (event, context) => {
  const result = await handler(event, context);
  return result;
};
