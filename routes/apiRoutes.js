const express =require('express')
const router = express.Router()
const db = require('../models')

// GET All
router.get('', (req, res) => {
    db.Book.findAll().then(books => res.send(books))
})

//GET by ID
router.get('/:id', (req, res) => {
    db.Book.findOne({
        where: {
            id: req.params.id
        }
    }).then(book => res.send(book))
})

//POST new Book
router.post('', (req, res) => {
    db.Book.create({
        title: req.body.title,
        author: req.body.author
        
    }).then(submittedBook => res.send(submittedBook))
})

//DELETE Book
router.delete('/delete/:id',function(req, res) {

    db.Book.findByPk(req.params.id).then((book) => {
        book.destroy()
        return book
    }).then((book) => {
        res.send(book)
    })

})

//UPDATE Book
router.put('/edit', (req, res) => {
    db.Book.update(
        {
            title: req.body.title,
            author: req.body.author
        },
        {
            where: { id: req.body.id }
        }
    ).then(updatedPOST => res.redirect(req.body.id))
      .catch(err => res.redirect(''))

})

module.exports = router

//Delete w/ success message
// router.delete('/delete/:id', (req, res) => {
//     db.Book.destroy({
//         where: {
//             id: req.params.id
//         }
//     }).then(() => res.send('success'))
// })


//Update w/ success message
//router.put('/edit', (req, res) => {
//     db.Book.update(
//         {
//             title: req.body.title,
//             author: req.body.author
//         },
//         {
//             where: { id: req.body.id }
//         }
//     ).then(() => res.send('Update Success'))

// })

