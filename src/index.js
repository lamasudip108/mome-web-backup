import 'module-alias/register';

import path from 'path';
import hbs from 'express-handlebars';
import bodyParser from 'body-parser';

import app from '@config/express';
import routes from '@routes/index.route';
import swagger from '@config/swagger';

import tokenAuthentication from '@middlewares/tokenAuthentication';
import * as errorHandler from '@middlewares/errorHandler';
import joiErrorHandler from '@middlewares/joiErrorHandler';
import requestLogger from '@middlewares/requestLogger';
import jsonHandler from '@middlewares/jsonHandler';

// Swagger API documentation
app.get('/swagger.json', (req, res) => {
   res.json(swagger);
});

// Request logger
app.use(requestLogger);

// JSON body validation
app.use(jsonHandler);

// JWT authentication
app.use(tokenAuthentication);

//set handlebar

app.engine('hbs',hbs({extname:'hbs', layoutsDir:__dirname + '/views'}));
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Router
app.use('/api', routes);

// Landing page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Joi Error Handler Middleware
app.use(joiErrorHandler);

// Error Handler Middleware
app.use(errorHandler.genericErrorHandler);
app.use(errorHandler.notFound);
app.use(errorHandler.methodNotAllowed);

app.listen(app.get('port'), app.get('host'), () => {
    console.log(`Server running at http://${app.get('host')}:${app.get('port')}`);
});

export default app;
