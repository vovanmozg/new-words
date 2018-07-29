const main = async () => {
    var RTM = require("satori-rtm-sdk");

    var endpoint = "wss://open-data.api.satori.com";
    var appKey = "bFDed694E964F7427b8fCa01aaD8df0a";
    var channel = "github-events";

    const MongoClient = require('mongodb').MongoClient;
    const assert = require('assert');

    // Connection URL
    const url = 'mongodb://localhost:27017';

    // Database Name
    const dbName = 'new_words';

    let db;


    const mClient = await MongoClient.connect(url)

    console.log("Connected successfully to server");

    db = mClient.db(dbName);

    // client.close();

    const collection = db.collection('words');

    const all = {};

    subscription.on('rtm/subscription/data', function (pdu) {
        pdu.body.messages.forEach(function (msg) {

            const str = JSON.stringify(msg);
            const words = str.split(/[^a-zA-Z]+/);
            words.forEach(word => {
                all[word] = 1;
                collection.updateOne(
                    { word: word },
                    { $set: { word: word } },
                    { upsert: true }
                );
            })

            console.log(Object.keys(all).length);
            

            // process.stdout.write(".");


            // Insert some documents
            // collection.insertMany([
            //  	{word : 1}
            // ]

        });
    });

    rtmClient.start();


}


main();