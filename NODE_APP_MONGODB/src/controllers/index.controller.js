const indexControllers = {}

indexControllers.renderIndex = (req,res)=>{
    res.render("index");
};

indexControllers.renderAbout = (req,res)=>{
    res.render("about");
};

module.exports = indexControllers;