const {Router} = require("express");
const RenderIndex = require("../controllers/index.controller");
const router = Router();

router.get("/",RenderIndex.renderIndex);

router.get("/about",RenderIndex.renderAbout);

module.exports = router;