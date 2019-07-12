
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://weizhou:zhouwei18@cluster0-refh1.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
console.log(err);
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
