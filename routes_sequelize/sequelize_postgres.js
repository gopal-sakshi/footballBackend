// see sequelize_image_upload.txt

var express = require('express');
var sequelizeRouter = express.Router();
const tutorials = require("./controller/tutorial22.controller");

const db = require('./models/index');
db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

/********************** ROUTES ****************************/

// sequelizeRouter.get('/', (req, res) => { res.send('seq base setup'); });
sequelizeRouter.post("/create", tutorials.create);                  // Create a new Tutorial
sequelizeRouter.get("/", tutorials.findAll);                        // Retrieve all Tutorials
sequelizeRouter.get("/published", tutorials.findAllPublished);      // Retrieve all published Tutorials
sequelizeRouter.get("/:id", tutorials.findOne);                     // Retrieve a single Tutorial with id
sequelizeRouter.put("/:id", tutorials.update);                      // Update a Tutorial with id
sequelizeRouter.delete("/:id", tutorials.delete);                   // Delete a Tutorial with id
sequelizeRouter.delete("/", tutorials.deleteAll);                   

/***********************************************************************/
module.exports = sequelizeRouter;