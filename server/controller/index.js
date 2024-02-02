let express = require('express');
let router = express.Router();

const passport = require("passport");
const userModel = require("../models/user");
let User = userModel.User;

// Home page 
module.exports.displayHomePage = (req, res, next) => {
    res.render('index', { 
      title: 'Class Project',
      section: 'First practice WebDev',
      displayName: req.user ? req.user.displayName: '' 
    });
  };

// About Page
module.exports.displayAboutPage = (req, res, next) => {
    res.render('index', { 
      title: 'About',
      section: 'The story of MT Solutions', 
      displayName: req.user ? req.user.displayName: '' 
    });
  };

  // Contact Me Page
  module.exports.displayContactmePage = (req, res, next) => {
    res.render('index', { 
      title: 'Contact Me',
      section: 'Get in touch with MT Solutions', 
      displayName: req.user ? req.user.displayName: '' 
    });
  };

    // Projects Page
    module.exports.displayProjectsPage = (req, res, next) => {
        res.render('index', { 
          title: 'Projects',
          section: 'All the past, present and developing projects that MT Solutions has touched',
          displayName: req.user ? req.user.displayName: ''  
        });
      };

      // Services Page
      module.exports.displayServicesPage = (req, res, next) => {
        res.render('index', { 
          title: 'Services',
          section: 'What MT Solutions currently has to offer',
          displayName: req.user ? req.user.displayName: ''  
        });
      };

        // Users Page
        module.exports.displayUsersPage = (req, res, next) => {
            res.render('index', { 
              title: 'Users',
              section: 'Welcome dear user', 
            });
          };

          // Login Page
          module.exports.displayLoginPage = (req, res, next) => {
              if(!req.user)
              {
                res.render('auth/login',
                {
                  title: 'Login',
                  message : req.flash('loginMessage'),
                  displayName: req.user ? req.user.displayName: ''
                })
              }
              else
              {
                return res.redirect('/')
              }
            }

            // Post Login
            module.exports.postLogin = (req, res, next) => {
                passport.authenticate('local', (err, user, info) =>
                {
                  // server error
                  if(err)
                  {
                    return next(err);
                  }
                  
                    // login error
                    if(!user)
                    {
                      req.flash('loginMessage',
                      'AuthenticationError');
                      return res.redirect('/login');
                    }
                  req.login(user, (err) => {
                    if(err)
                    {
                      return next(err)
                    }
                    return res.redirect('/books')
                  })
                })(req, res, next)
              }

              

          // Register Page
          module.exports.displayRegisterPage = (req, res, next) => {
            if(!req.user)
            {
              res.render('auth/register',
              {
                title: 'Register',
                message : req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName: ''
              })
            }
            else
            {
              return res.redirect('/')
            }
          }

module.exports.postRegister = (req, res, next) => {
  let newUser = new User({
    username: req.body.username,
    //password: req.body.Password,
    displayName: req.body.displayName,
    email: req.body.email
  })
  User.register(newUser, req.body.password, (err) => {
    if(err)
    {
      console.log("Error inserting the new user")  
      if(err.name=="UserExistsError")
      {
        req.flash('registerMessage',
        'Registration Error: User Already Exists');
      }
      return res.render('auth/register',
      {
        title : 'Register',
        message: req.flash('registerMessage'),
        displayName: req.user ? req.user.displayName: ''
      });
    }
    else
    {
      //if registration is not successful
      return passport.authenticate('local')(req, res, () => {
        res.redirect('/books');
      })
    }
  })
}

module.exports.performLogout = (req, res, next) =>
{
  req.logout(function(err){
    if(err){
      return next(err);
    }   
  });
  res.redirect('/')
}

