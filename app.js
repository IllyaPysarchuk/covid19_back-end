const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectID;

const app = express();
const jsonParser = express.json();

const mongoClient = new MongoClient("mongodb+srv://admin:Bkmz3213@cluster0.8kdji.mongodb.net/test?authSource=admin&replicaSet=atlas-r0glii-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true", { useUnifiedTopology: true });

let dbClient;

app.use(express.static(__dirname + "/public"));

app.listen(3000, function(){

    console.log("Сервер ожидает подключения...");

});

mongoClient.connect(function(err, client){
    if(err) return console.log(err);
    dbClient = client;
    app.locals = client.db("covid19_statistic");

});

app.get("/api/alldynamics",jsonParser, function(req, res){
    req.app.locals.collection = req.app.locals.collection("covid19_by_area_type_hosp_dynamics");
    const collection = req.app.locals.collection;
    collection.find({}).toArray(function(err, alldynamics){
        if(err) return console.log(err);
        res.send(alldynamics);
    });
});

app.get("/api/zvit_date/:zvit_date",jsonParser, function(req, res){
    req.app.locals.collection = req.app.locals.collection("covid19_by_area_type_hosp_dynamics")
    const collection = req.app.locals.collection;
    var date = req.params.zvit_date;
    collection.find({zvit_date: date}).toArray(function(err, zvit_date){
        if(err) return console.log(err);
        res.send(zvit_date);
    });
});

app.get("/api/registration_area/:registration_area",jsonParser, function(req, res){
    req.app.locals.collection = req.app.locals.collection("covid19_by_area_type_hosp_dynamics")
    const collection = req.app.locals.collection;
    var area = req.params.registration_area;
    collection.find({registration_area: area}).toArray(function(err, registration_area){
        if(err) return console.log(err);
        res.send(registration_area);
    });
});

app.get("/api/person_gender/:person_gender",jsonParser, function(req, res){
    req.app.locals.collection = req.app.locals.collection("covid19_by_area_type_hosp_dynamics")
    const collection = req.app.locals.collection;
    var gender = req.params.person_gender;
    collection.find({person_gender: gender}).toArray(function(err, person_gender){
        if(err) return console.log(err);
        res.send(person_gender);
    });
});

app.get("/api/person_age_group/:person_age_group",jsonParser, function(req, res){
    req.app.locals.collection = req.app.locals.collection("covid19_by_area_type_hosp_dynamics")
    const collection = req.app.locals.collection;
    var age = req.params.person_age_group;
    collection.find({person_age_group: age}).toArray(function(err, person_age_group){
        if(err) return console.log(err);
        res.send(person_age_group);
    });
});

app.get("/api/all",jsonParser, function(req, res){
    req.app.locals.collection = req.app.locals.collection("covid19_by_settlement_actual");
    const collection = req.app.locals.collection;
    collection.find({}).toArray(function(err, all){
        if(err) return console.log(err);
        res.send(all);
    });
});

app.get("/api/zvitdate/:zvit_date",jsonParser, function(req, res){
    req.app.locals.collection = req.app.locals.collection("covid19_by_settlement_actual")
    const collection = req.app.locals.collection;
    var date1 = req.params.zvit_date;
    collection.find({zvit_date: date1}).toArray(function(err, date1){
        if(err) return console.log(err);
        res.send(date1);
    });
});

app.get("/api/registrationarea/:registration_area",jsonParser, function(req, res){
    req.app.locals.collection = req.app.locals.collection("covid19_by_settlement_actual")
    const collection = req.app.locals.collection;
    var area1 = req.params.registration_area;
    collection.find({registration_area: area1}).toArray(function(err, area1){
        if(err) return console.log(err);
        res.send(area1);
    });
});

app.get("/api/registration_region/:registration_region",jsonParser, function(req, res){
    req.app.locals.collection = req.app.locals.collection("covid19_by_settlement_actual")
    const collection = req.app.locals.collection;
    var region = req.params.registration_region;
    collection.find({registration_region: region}).toArray(function(err, region){
        if(err) return console.log(err);
        res.send(region);
    });
});

app.get("/api/registration_settlement/:registration_settlement",jsonParser, function(req, res){
    req.app.locals.collection = req.app.locals.collection("covid19_by_settlement_actual")
    const collection = req.app.locals.collection;
    var settlement = req.params.registration_settlement;
    collection.find({registration_settlement: settlement}).toArray(function(err, settlement){
        if(err) return console.log(err);
        res.send(settlement);
    });
});

process.on("SIGINT", () => {
    dbClient.close();
    process.exit();
});
