const RTM = require("satori-rtm-sdk");
const MongoClient = require('mongodb').MongoClient;
let mCollection;

const createCollector = () => (msg) => {

            if(msg['text'] === undefined) {
                return
            }

            let text = msg.text;
            //text = text.replace(/https/,'')
            //console.log(text)

            const words = text.split(/[ ]+/);
            console.log(words.join(' '));
            // const words = str.split(/[^а-яА-ЯёЁ]+/);
            // console.log(words.join(' '))
            words.forEach(word => {
                // all[word] = 1;
                mCollection.updateOne(
                    { word: word },
                    { $set: { word: word }, $inc: { count: 1 } },
                    { upsert: true }
                );
            })

            //console.log(Object.keys(all).length);


            // process.stdout.write(".");


            // Insert some documents
            // collection.insertMany([
            //      {word : 1}
            // ]
}

const createListener = (collector) => {
    var endpoint = "wss://open-data.api.satori.com";
    var appKey = "bFDed694E964F7427b8fCa01aaD8df0a";
    // var channel = "github-events";
    var channel = "world";

    var rtmClient = new RTM(endpoint, appKey);
    rtmClient.on('enter-connected', () => console.log('Connected to Satori RTM!'));

    var subscription = rtmClient.subscribe(channel, RTM.SubscriptionMode.SIMPLE);

    const all = {};

    subscription.on('rtm/subscription/data', function (pdu) {
        console.log(`messages: ${pdu.body.messages.length}`);
        pdu.body.messages.forEach(function (msg) {


            collector(msg);


        });
    });

    rtmClient.start();

}

const connectCollection = async () => {
    const mClient = await MongoClient.connect('mongodb://localhost:27017')
    const db = mClient.db('new_words');
    mCollection = db.collection('words');
}

const main = async () => {

    
    await connectCollection();
    
    const collector = createCollector();

    const listener1 = createListener(collector); 
    //const listener2 = createListener(collector);

    

    // setInterval( () => {
    //     console.log('rtmClient.isConnected(): ', rtmClient.isConnected());
    // }, 5000)

    


    // client.close();


}




main();