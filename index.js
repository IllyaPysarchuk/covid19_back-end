const MongoClient = require("mongodb").MongoClient;

const url = "mongodb+srv://admin:Bkmz3213@cluster0.8kdji.mongodb.net/test?authSource=admin&replicaSet=atlas-r0glii-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";
const mongoClient = new MongoClient(url);

mongoClient.connect(function(err, client){

    const db = client.db("covid19_statistic");
    const collection = db.collection("covid19_by_area_type_hosp_dynamics");

    if(err) return console.log(err);

    collection.find({registration_area: "Вінницька"}).toArray(function(err, results){

        console.log(results);
        client.close();
    });
});