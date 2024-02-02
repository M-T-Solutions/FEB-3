var express = require('express');
var router = express.Router();
let indexController = require('../controller/index');

// GET home page
router.get('/', indexController.displayHomePage)// localhost: 3000
router.get('/home', indexController.displayHomePage)// localhost: 3000/home

// GET About page. 
router.get('/about', indexController.displayAboutPage);// localhost: 3000/about

// GET Contact Me page. 
router.get('/contactme', indexController.displayContactmePage);// localhost: 3000/contactme

// GET Projects page. 
router.get('/projects', indexController.displayProjectsPage);// localhost: 3000/projects

// GET Services page. 
router.get('/services', indexController.displayServicesPage);// localhost: 3000/services

// GET Users page. 
router.get('/users', indexController.displayUsersPage);// localhost: 3000/users

// GET Login page. 
router.get('/login', indexController.displayLoginPage);// localhost: 3000/login

// Post Login 
router.post('/login', indexController.postLogin);// localhost: 3000/login

// GET Register page. 
router.get('/register', indexController.displayRegisterPage);// localhost: 3000/register

// Post Register 
router.post('/register', indexController.postRegister);// localhost: 3000/register

// GET Logout page. 
router.get('/logout', indexController.performLogout);// localhost: 3000/logout

module.exports = router;
