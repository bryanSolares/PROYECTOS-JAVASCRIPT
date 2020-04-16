const {
    Router
} = require("express")
const TaskSchema = require("../models/task")

const router = Router();

router.get("/", async (req, res) => {
    const tasks = await TaskSchema.find();
    res.render("index", {
        tasks
    });
});

router.post("/task/add", async (req, res) => {
    const taskNew = new TaskSchema(req.body);
    await taskNew.save();
    res.redirect("/");
});

router.get("/turn/:id",async(req,res)=>{
    const { id } = req.params; 
    const task = await TaskSchema.findById(id);
    task.status = !task.status;
    await task.save();
    res.redirect("/");
});

router.get("/task/delete/:id", async (req, res) => {
    const {id} = req.params;
    await TaskSchema.remove({_id:id});
    res.redirect("/");
});

router.get("/task/edit/:id", async (req, res) => {
    const {id} = req.params;
    const task = await TaskSchema.findById(id);
    res.render("edit",{task});
});

router.post("/task/edit/:id", async (req, res) => {
    const {id} = req.params;
    await TaskSchema.update({_id:id},req.body);
    res.redirect("/");
});

module.exports = router;