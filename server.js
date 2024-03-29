const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config;
const app = express();
const cors = require("cors");
const ORIGIN = process.env.origin;
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", ORIGIN);

  next();
});

app.use(
  "/api",
  createProxyMiddleware({
    target: "https://newsapi.org",
    changeOrigin: true,
    pathRewrite: {
      "^/api": "/v2",
    },
    onProxyRes: (proxyRes, req, res) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
    },
  })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
