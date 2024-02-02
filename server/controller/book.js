let express = require('express');
let router = express.Router();

const { connectToDb, getDb } = require('../models/book');
const { ObjectId } = require('mongodb');
let Books = require('../models/book')

/* let db

// db connection
connectToDb((err) => {
    if (!err) {

        db = getDb()
        console.log('Connected to MongoDB')
    }
}); */

// Books page 
module.exports.displayBooksPage = (req, res, next) => {
let page = req.query.p || 0
let BooksPerPage = 10

    Books.find()
        .skip(BooksPerPage * page)
        .limit(BooksPerPage)
        .sort({Name : 1})
        .exec()
        .then((Booklist) => {
            res.render('database/Books', { 
                title: 'Book List', 
                Booklist: Booklist, 
                P: page, 
                displayName: req.user ? req.user.displayName: ''   });
            
        })
        .catch((err) => {
            console.error(err);
            // Handle the error appropriately, e.g., send a response or invoke the next middleware
            res.status(500).json({ error: 'Internal Server Error' });
        });
};
    
    /* MongoDB method
    const page = req.query.p || 0
    const BooksPerPage = 10

    let books = []

    //db.collection('Books')
        Books.find()
        .skip(page * BooksPerPage)
        .limit(BooksPerPage)
        .sort({ Name: 1 })
        .forEach(book => books.push(book))
        .then(() => {
            res.render('database/Books', {title: 'Book List', Booklist:books, P:page})
            //console.log(books)
        })
        .catch(() => {
            res.status(500).json({error: 'Could not fetch the documents'})
        })

};*/

// Search Page
module.exports.displaySearchPage = (req, res, next) => {
    let id = (req.params.id);

    if (!ObjectId.isValid(id)) {
        res.status(400).json({ error: 'Invalid ObjectId format' });
        return;}

    //db.collection('Books')
        Books.findOne({_id: new ObjectId(id)})
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(() => {
            res.status(500).json({error: 'Could not fetch the document'})
        })
};

  // Add Page
  module.exports.displayAddPage = (req, res, next) => {
    res.render('database/add', {title: 'Add Book'})
};
// Post Add
module.exports.postAdd = (req, res, next) => {
    let book = {
        "Name": req.body.name,
        "Author": req.body.author,
        "Published": req.body.published,
        "Description": req.body.description,
        "Price": req.body.price
    };

    Books.create(book)
        .then(() => res.redirect('/books'))
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Could not create the new document' });
        });
};


      // Updates Page
      module.exports.displayUpdatesPage = (req, res, next) => {
        
        let id = (req.params.id);
    
        if (!ObjectId.isValid(id)) {
            res.status(400).json({ error: 'Invalid ObjectId format' });
            return;}
    
        //db.collection('Books')
        Books.findOne({_id: new ObjectId(id)})
            .then(doc => {
                res.render('database/edit', {title: 'Edit Book', book: doc})
            })
            .catch(() => {
                res.status(500).json({error: 'Could not fetch the document'})
            })
    };

    // Post Update
    module.exports.postUpdate = (req, res, next) => {

        if (!db) {
            res.status(500).json({ error: 'Database connection not established yet' });
            return;
        }
        
        let id = (req.params.id);
    
        let updates = {
            "_id":id,
            "Name":req.body.name,
            "Author":req.body.author,
            "Published":req.body.published,
            "Description":req.body.description,
            "Price":req.body.price
        };
    
        if (!ObjectId.isValid(id)) {
            res.status(400).json({ error: 'Invalid ObjectId format' });
            return;}
    
            console.log('Update called for');
    
        //db.collection('Books')
        Books.updateOne({_id: new ObjectId(id)}, updates, (err) => {
                if (err)
                {
                    console.log(err);
                    res.send(err);
                    console.log('Failed to patch');
                }
                else
                {
                    res.redirect('/books');
                }
    });
    };

        // Perform Delete
        module.exports.performDelete = (req, res, next) => {
            const id = req.params.id;
        
            if (!ObjectId.isValid(id)) {
                res.status(400).json({ error: 'Invalid ObjectId format' });
                return;}
        
            //db.collection('Books')
                Books.deleteOne({_id: new ObjectId(id)})
                .then(res.redirect('/books'))
                .catch(() => {
                    res.status(500).json({error: 'Could not delete the document'})
                })
        
            
        };
