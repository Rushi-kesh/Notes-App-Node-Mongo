const express = require('express');
const router = express.Router();

// Models
const Note = require('../models/Note');


// New Note
router.get('/notes/add', (req, res) => {
  res.render('notes/new-note');
});

router.post('/notes/new-note', async (req, res) => {
  const { title, description } = req.body;
  const errors = [];
  if (!title) {
    errors.push({text: 'Please Write a Title.'});
  }
  else{
    if (!description) {
      errors.push({text: 'Please Write a Description'});
    }
  }
  if (errors.length > 0) {
    res.render('notes/new-note', {
      errors,
      title,
      description
    });
  } else {
    const newNote = new Note({title, description});
    await newNote.save();
    req.flash('success_msg', 'Note Added Successfully');
    res.redirect('/notes');
  }
});

// Get All Notes
router.get('/notes', async (req, res) => {
  
  const notes = await Note.find().sort({title: 'desc'}).lean();
  
  res.render('notes/all-notes', { notes });
});

// Edit Notes
router.get('/notes/edit/:id', async (req, res) => {
  const note = await Note.findById(req.params.id).lean();
  
  res.render('notes/edit-note', { note });
});

router.put('/notes/edit-note/:id', async (req, res) => {
  const { title, description } = req.body;
  //const due_date=new Date(+new Date() + 7*24*60*60*1000).toLocaleString();
  await Note.findByIdAndUpdate(req.params.id, {title, description}).lean();
  req.flash('success_msg', 'Note Updated Successfully');
  res.redirect('/notes');
});

// Delete Notes
router.delete('/notes/delete/:id', async (req, res) => {
  await Note.findByIdAndDelete(req.params.id).lean();
  req.flash('error_msg', 'Note Deleted Successfully');
  res.redirect('/notes');
});
router.delete('/notes/delete-all', async (req, res) => {
  const notes=await Note.find().lean();
  if(notes.length){
    await Note.deleteMany();
    req.flash('error_msg', 'Notes Deleted Successfully');
    res.redirect('/notes');
    
  }
    res.redirect("/");
  
});

module.exports = router;
