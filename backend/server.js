require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./db");
// Import the required dependencies


const bodyParser = require("body-parser");

// Use the body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
const port = process.env.PORT || 3000;

app.get("/api/v1/electronics-store", async (req, res) => {
    try{
        const { query } = req.query;
        const keywords = query.split(" ");
        keywords.splice(3)
        keywords.forEach((keyword, i) => keywords[i] = "%" + keyword + "%");
        let devices = {};
        if(keywords.length === 3){
            devices = await db.query("SELECT * FROM device WHERE (model ILIKE $3 AND model ILIKE $2 AND name ILIKE $1) OR (model ILIKE $1 AND model ILIKE $3 AND model ILIKE $2) OR (name ILIKE $1 AND name ILIKE $2 AND model ILIKE $3) OR (name ILIKE $2 AND name ILIKE $1 AND name ILIKE $3)", keywords);
            keywords.splice(2);
        }
        if(keywords.length === 2 && (devices.rowCount === 0 || Object.keys(devices).length === 0)){
            devices = await db.query("SELECT * FROM device WHERE name || ' ' || model ILIKE $1 || $2 OR (model ILIKE $2 AND name ILIKE $1) OR (name ILIKE $2 AND model ILIKE $1) OR (model ILIKE $2 AND model ILIKE $1)", keywords);
            keywords.splice(1);
        }
        if(devices.rowCount === 0 || Object.keys(devices).length === 0){
            devices = await db.query("SELECT * FROM device WHERE name || ' ' || model ILIKE $1 OR model ILIKE $1 OR name ILIKE $1", keywords);
        }
        getPrice(devices).then(devices => {
            res.json({
                data: devices
            })
        }).catch(e => {
            console.error(e);
        });
    } catch (e) {
        console.error(e);
    }
});

app.get("/api/v1/electronics-store/category/:category", async (req, res) => {
    try{
        let devices = await db.query("SELECT * FROM device WHERE category_id = (SELECT id FROM category WHERE name = $1)", [req.params.category]);
        getPrice(devices).then(devices => {
            res.json({
                data: devices
            })
        }).catch(e => {
            console.error(e);
        });

    } catch(e) {
        console.error(e)
    }
})
// this code sets up a route that accepts a device name as a parameter in the URL. It queries the database for the device information based on the provided name, retrieves the price asynchronously,
app.get("/api/v1/electronics-store/device/:name", async (req, res) => {
    try{
        let device = await db.query("SELECT * FROM device WHERE name || ' ' || model = $1", [req.params.name]);
        getPrice(device).then(device => {
            res.json({
                data: device
            })
        }).catch(e => {
            console.error(e);
        });
    } catch (e) {
        console.error(e);
    }
})

function getPrice(devices){
    return Promise.all(devices.rows.map(async device => {
        const price = await db.query("SELECT price FROM price WHERE id = (SELECT price_id FROM pricehistory WHERE device_id = $1 AND date = (SELECT MAX(date) FROM pricehistory WHERE device_id = $1))", [device.id]);
        device.price = price.rows[0].price;
        return device;
    }));
}




app.post("/api/v1/electronics-store/users", async (req, res) => {
    console.log(req.body);
  
    try {
      const results = await db.query(
        "INSERT INTO users (username, email, password, address) values ($1, $2, $3, $4) returning *",
        [req.body.username, req.body.email, req.body.password,req.body.address]
      );
      console.log(results);
      res.status(201).json({
        status: "success",
        data: {
          user: results.rows[0],
        },
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: "error",
        message: "An error occurred while creating the user.",
      });
    }
  });
  
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})