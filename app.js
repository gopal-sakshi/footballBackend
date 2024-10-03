/************************* IMPORTS *************************** */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
const sum12 = require('./routes/maths11');
/************************* end of IMPORTS *************************** */



/********************** SUB ROUTES ***********************/
var todosRouter = require('./routes/todos');
var squadsRouter = require('./routes/clubSquad_postgres');
var userInputRouter = require('./routes/z_userInput');
var firebaseRouter = require('./routes/firebaseRouter');
var triggerRouter = require('./routes_trigger23/blah1');
// var redisRouter = require('./routes/email23_redis');
/********************** END OF SUB ROUTES ***********************/



/****************** CORS stuff ******************************/
app.use(function (req, res, next) {

    // Allow multiple origins
    const allowedOrigins = ['http://127.0.0.1:9988', 'http://localhost:9999', 'http://localhost:9988'];
    const origin = req.headers.origin;
    // console.log('origin ===> ', origin);
        // browser URL can be http:localhost:9988 (or) http:127.0.0.1:9988
    if (allowedOrigins.includes(origin)) {
        console.log('jc');
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9999');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
/****************** end of CORS stuff ******************************/



/************************* CONFIG Express APP ***************************/
app.set('views', path.join(__dirname, 'views'));            // If you comment this.... res.render() wont work
app.set('view engine', 'jade');

// app.use(logger('dev'));                                  // Use morgan for logging errors
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
/************************* end of CONFIG Express APP ***************************/




/*************************** register sub routes ******************************/
app.use('/squads', squadsRouter);
app.use('/userInput', (req, res, next) => { req['sumResult'] = sum12(3,4); next(); }, userInputRouter);
app.use('/todos23', todosRouter);
app.use('/firebase', firebaseRouter);
app.use('/trigger23', triggerRouter);
app.use('/', (req, res, next) => { res.render('index', { title: 'Express' }); });       // see index.jade
// app.use('/redis23', redisRouter);
/*************************** end of register sub routes ******************************/



/************************* EXPLORE LATER ******************************* */
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
/************************* end of EXPLORE LATER ******************************* */

module.exports = app;
