let express = require('express');
let router = express.Router();
let bookController = require('../controller/book');

function requireAuth(req, res, next)
{
  if(!req.isAuthenticated())
  {
    return res.redirect('/login')
  }
  next();
}

// GET Books page
router.get('/', bookController.displayBooksPage);// localhost: 3000/books

// GET Single Book page. 
router.get('/search/:id', requireAuth, bookController.displaySearchPage);// localhost: 3000/books/search

// GET Add page. 
router.get('/add', requireAuth, bookController.displayAddPage);// localhost: 3000/books/contactme

// POST Add 
router.post('/add', requireAuth, bookController.postAdd);// localhost: 3000/books/projects

// GET Update page. 
router.get('/update/:id', requireAuth, bookController.displayUpdatesPage);// localhost: 3000/books/services

// POST Update 
router.patch('/update/:id', requireAuth, bookController.postUpdate);// localhost: 3000/books/users

// Perform Delete
router.get('/delete/:id', requireAuth, bookController.performDelete);// localhost: 3000/books/users

module.exports = router;

  /*
        <% if (title == "Book List") { %>  
        <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button href = "/books/search" class="btn btn-outline-success" type="submit">Search</button>
        </form>
          <% } %> */

        
