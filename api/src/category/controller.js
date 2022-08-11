
const express = require("express");
const serverless = require("serverless-http");
const CategoryService = require("./service");
const app = express();
app.use(express.json());

app.get("/category/:id", async function (req, res) {
  try {
    let data = await CategoryService.getById(req.params.id, req.headers['user-id']);
    res.json(data.Item);
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Error in server", detail: err });
  }
});

app.get("/category/", async function (req, res) {
  try {
    let data = await CategoryService.getAllByUserId(req.headers['user-id']);
    res.json(data);
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Error in server", detail: err });
  }
});

app.post("/category/", async function (req, res) {
  try {
    let data = await CategoryService.add(req.body)
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.put('/category/:id', async function (req, res) {
  try {
    let account = await CategoryService.update( req.params.id, req.headers['user-id'], req.body);
    res.status(200).json(account);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.delete('/category/:id', async function (req, res) {
  try {
    await CategoryService.delete( req.params.id, req.headers['user-id']);
    res.status(200).json({ message: `bank id : ${req.params.id} deleted successfully` });
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
