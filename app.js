/************************* IMPORTS *************************** */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
/************************* end of IMPORTS *************************** */



/********************** SUB ROUTES ***********************/
var indexRouter = require('./routes/z_index');
var usersRouter = require('./routes/z_users');
var playersRouter = require('./routes/players_dynamo_aws');
var footballersRouter = require('./routes/footballers_dynamo_local');
var playersInS3Router = require('./routes/players_s3_aws');
var teamsRouter = require('./routes/teams_dynamo_aws');
var squadsRouter = require('./routes/clubSquad_postgres');
var userInputRouter = require('./routes/z_userInput');
/********************** END OF SUB ROUTES ***********************/



/****************** CORS stuff ******************************/
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9999');

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

app.use('/playersInS3', playersInS3Router);         // AWS S3 bucket = gopal612-football-backend-acl
// app.use('playersInS3', playersInS3Router);       // struggled 30min... because playersInS3 didnt have backslash... 
app.use('/squads', squadsRouter);                   // fetch squads from 'football database' --- postgres local
app.use('/players', playersRouter);                 // 'fb_playersTable' ---- AWS dynamo
app.use('/teams', teamsRouter);                     // 'fb_teamsTable' -------- AWS dynamo
app.use('/footballers', footballersRouter);         // 'footballers' table ----- dynamo local

app.use('/userInput', userInputRouter);             // submit & form... and get the response ------ WORKING
app.use('/', indexRouter);                          // check to see how 'view engine' works
app.use('/users', usersRouter);                     // just another endpoint... not much use now...
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
