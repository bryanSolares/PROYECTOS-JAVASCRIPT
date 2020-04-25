const {Router} = require("express");
const RenderUsers = require("../controllers/users.controller");

const router = Router();

router.get("/users/signup",RenderUsers.renderSignUpForm);
router.post("/users/signup",RenderUsers.signUp);
router.get("/users/signin",RenderUsers.renderSignInForm);
router.post("/users/signin",RenderUsers.signIn);
router.get("/users/logout",RenderUsers.logout);


module.exports = router;