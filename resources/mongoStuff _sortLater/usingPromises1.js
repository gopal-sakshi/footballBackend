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
var Model = mongoose23.model('Model', 'movies');
/**************************** END OF CONFIG *************************************** */
class Database {

  mongoClient;
  dbClient;

  constructor() {
    this._connectWithPromise();    
  }


_connectWithPromise() {
    mongoose23.connect(mongoUrl, mongoOptions23)
      .then(data => {
        console.log('Database connection successful');
        // console.log(data);
        // this.mongoClient = data;
        // this.query23();


        const query = Model.find(); // `query` is an instance of `Query`
        query.setOptions({ lean : true });
        query.collection('telugu');
        query.where('Box_office').gte(30).exec((err, data)=> {
          console.log(data);
        });
        // query.where('request').

        // var dbName = 'movies';
        // var db = data.db(dbName);
        // var query = { heroine: "nayanthara" };
        // db.collection('tamil').find(query);
      })
      .catch(err => {
        console.error('Database connection error');
        console.log(err);
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