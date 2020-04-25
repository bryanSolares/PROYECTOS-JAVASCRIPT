const { Router } = require("express");
const RenderNotes = require("../controllers/notes.controller");
const { isAuthenticated } = require("../helpers/auth");
const router = Router();

router.get("/notes/add", isAuthenticated, RenderNotes.renderNoteForm);
router.post("/notes/new-note", isAuthenticated, RenderNotes.createNewNote);
router.get("/notes", isAuthenticated, RenderNotes.renderNotes);
router.get("/notes/edit/:id", isAuthenticated, RenderNotes.renderEditForm);
router.put("/notes/edit/:id", isAuthenticated, RenderNotes.updateNote);
router.delete("/notes/delete/:id", isAuthenticated, RenderNotes.deleteNote);

module.exports = router;