This App is Rendered on localhost:5050

##This app is build on top of the last lesson in Directory <node_get_and_put_request>

##We install the following node modules.
$ npm install express-session --save
$ npm install express-validator --save

##Then, we have to create variables for the two above modules and require them in.

var expressValidator = require('express-validator')
var expressSession = require('express-session');

##Then we need to add our app.use for expressValidator after bodyParser. Its important the parsing is done first.

app.use(expressValidator());

##Then we add expressSession after express.static

app.use(expressSession({secret: 'max', saveUninitialized: false, resave: false}));

##Now we can proceed and go to work on our views/index.js file.

##We deleted most everything from our last project and start anew at res.render('index', ... )

##Than We Will Pass it a success property set by default to false and an errors property set to req.session.errors
-This will at first be empty because it refers to the express-session we just set up in app.js and there I add the errors properties which will hold all the validation errors we might have so we can output them in our views

##Now, We add a POST request to the index.js file

##Next, We, Set up a form that can be submitted

##For this we go to our index.hbs file.

#ENTER INDEX.hbs

##Add A Form
-added 3 divs
-one for email input
-one for password input
-last for password confirmation

#BACK TO index.js file

##Go Back to where it says "Ben, here we Check the Validity of the values." We match what goes into req.check with the input fields of index.hbs.

##Then, we decide what validators we want to use. We can go and choose one from here:
  https://github.com/chriso/validator.js#validators

##We choose the isEmail validator. The documentation on how to use it can be found in link about.

##Then we set another requirement for Password this time.
-we use isLength()
-then we use .equals() which allows to compare two fields or values.

##Then we set up our Validation Errors
-validationErrors() is a method set up by the validation package.
-if we do have errors then we want to set them to our session by adding a property: errors.
-after this, we redirect to the index files using
  -- res.redirect('/')

#RETURN TO INDEX.hbs

##Below {{title}} we add:

##A HandleBars Block Statement
-The first is for:

            {{# if success}}
              <section class="success">
                <h2>Successful Validation</h2>
              </section>
            {{/if}}

-The next is for if errors.
  --For this we move the form inside the {{ else }} {{/if}}:

-Then create an unordered list to handle each error.
  --we use {{ this.msg }} which is included by default in express-validator package.


#NOW WE GO TO INDEX.JS

##The errors the previous work in Index.hbs we were refering to were in index.js

        var errors = req.validateErrors();
        if (errors) {
          req.session.errors = errors;

##Now we want to add another session variable:
  -success

##Then we add an } else {
  -- so we can define if True

##Then we add success to the res.render('index', ...) where previously set to false by default by us.
  -We change to:

      router.get('/', function(req, res, next) {
        res.render('index', ({ title: 'Form Validation', success: req.session.success, errors: req.session.errors }));
        req.session.errors = null;
      });

##Now, check you local host. 
