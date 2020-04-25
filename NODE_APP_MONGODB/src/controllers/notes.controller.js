const Note = require("../models/Note")

const notesControllers = {}

//Llamada a formulario de creación
notesControllers.renderNoteForm = (req,res)=>{
    res.render("notes/newnote");
};

//Creación de Nota
notesControllers.createNewNote = async(req,res)=>{
    const {title,description} = req.body;
    const newNote = new Note({title,description});
    newNote.user = req.user.id;
    await newNote.save();
    
    req.flash("success_message","Note Added Successfully");
    res.redirect("/notes");
};

//Mostrar todas las notas
notesControllers.renderNotes = async(req,res)=>{
    const notes = await Note.find({user:req.user.id}).sort({createdAt:"desc"});
    res.render("notes/allnotes",{notes});
};

//LLamada a formulario de edición
notesControllers.renderEditForm = async(req,res)=>{
    const note = await Note.findById(req.params.id);
    if(note.user !== req.user.id){
        req.flash("error_message","Not Authorized");
        return res.redirect("/notes");
    }
    res.render("notes/editnote",{note});
};

notesControllers.updateNote = async(req,res)=>{
    const {title, description} = req.body;
    await Note.findByIdAndUpdate(req.params.id,{title,description});
    req.flash("success_message","Note Updated Successfully");
    res.redirect("/notes");
};

//Eliminación de nota
notesControllers.deleteNote = async(req,res)=>{
    await Note.findByIdAndDelete(req.params.id);
    req.flash("success_message","Note Deleted Successfully");
    res.redirect("/notes");
};

module.exports = notesControllers;