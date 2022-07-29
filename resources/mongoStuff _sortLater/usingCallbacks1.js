let mongoose23 = require('mongoose');

const server = '127.0.0.1:27017';
const database = 'movies';


/**************************** START CONFIG *************************************** */
// It seems, we can connect to mongoServer (or) db... use either mongoUrl23WithoutDb (or) mongoUrl23WithDb
var useDb = false;
const mongoUrl23WithoutDb = `mongodb://${server}`;
const mongoUrl23WithDb = `mongodb://${server}/${database}`;
const mongoUrl = useDb ? mongoUrl23WithDb : mongoUrl23WithoutDb;
const mongoOptions23 = {
  useNewUrlParser: true,
  // useFindAndModify: false,       // for some reason... this is not supported ---> db connection error I got
  useUnifiedTopology: true
};
/**************************** END OF CONFIG *************************************** */
class Database {

  mongoClient;

  constructor() {
    this._connectWithCallback();
  }
  
  _connectWithCallback() {
    mongoose23.connect(mongoUrl, function(err, client) {
      if(err) throw err;
      this.mongoClient = cliet;
      this.query23();
    })
  }

  // APPROACH I ------> ONLY connected to server =========> NOW connect to database... then execute query
  query23() {
    var dbName = 'movies';
    var db = this.mongoClient.db(dbName);
    var query = { heroine: "nayanthara" };
    db.collection('tamil').find(query);
    return;
  }

}


module.exports = new Database()