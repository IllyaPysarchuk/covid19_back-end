const mongodb = require("mongodb").MongoClient;
const csvtojson = require("csvtojson");

let url = "mongodb+srv://admin:Bkmz3213@cluster0.8kdji.mongodb.net/test?authSource=admin&replicaSet=atlas-r0glii-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";

    function uploadFile(pathName) {
        csvtojson()
            .fromFile(pathName)
            .then(csvData => {
                //console.log(csvData);
                let client
                mongodb.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
                    .then(c => {
                        client = c;
                        const name = pathName.slice(6, -4);
                        let collection = client.db('covid19_statistic').collection(name)
                        collection.deleteMany({})
                            .then(() =>

                                collection.insertMany(csvData)
                            )
                            .then(() => {
                                console.log("Data " + name + ".csv" +" updated");
                                client.close()
                            })
                            .catch(() => {
                                client.close()
                            })
                    })
                    .catch(() => {
                        if (client) client.close()

                    })
            });
    }
    uploadFile("files/covid19_by_area_type_hosp_dynamics.csv")
    uploadFile("files/covid19_by_settlement_actual.csv")
    //uploadFile("files/covid19_by_settlement_dynamics.csv")
