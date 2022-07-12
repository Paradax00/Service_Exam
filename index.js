const express = require("express");
const app = express();

const PORT = 9090;
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/examen_flutter_sim_janvier_2022")
    .then(()=>{
        console.log("Database conncted");
    })
    .catch((ex)=>{
        console.log(ex);
        console.log("Unable to connect to database");
    })

app.use(express.json());
app.use(require("cors")());
app.use(express.static("images"))
app.use("/api/users", require("./routes/user.route"));
app.use("/api/pharmacies", require("./routes/pharmacie.route"));
app.use("/api/certificate", require("./routes/certificate.route"));


const pharmacieController = require("./controllers/pharmacie.controller");
const usersController = require("./controllers/user.controller");

app.listen(PORT, ()=>{
    pharmacieController.createPharamcies().then(()=>{}).catch(ex=>{ console.log(ex); })
    usersController.createUsers().then(()=>{}).catch(ex=>{ console.log(ex); })
    console.log("Server is running on port ", 9090);
})