const express = require("express");

const cors = require("cors");

const {
  createProxyMiddleware
} = require("http-proxy-middleware");

const app = express();

app.use(cors());


// AUTH SERVICE

app.use(
  "/auth",
  createProxyMiddleware({

    target: "http://auth-service:5000",

    changeOrigin: true,

    pathRewrite: {
      "^/auth": ""
    }

  })
);


// PRODUCT SERVICE

app.use(
  "/products",
  createProxyMiddleware({

    target: "http://product-service:5001",

    changeOrigin: true

  })
);


app.get("/", (req, res) => {

  res.json({

    gateway: "running"

  });

});


app.listen(8080, () => {

  console.log(
    "API Gateway running on port 8080"
  );

});
