const {
    Router
} = require('express')

const router = Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.post('/register', (req, res) => {
    console.log(req.body);
    //req.flash('user',req.body);
    req.flash('success','now your registered');
    res.redirect('profile');
});

router.get('/profile', (req, res) => {
    //const user = req.flash('user')[0];
    //const user = req.flash('success')[0];
    /*console.log(user)
    res.render('profile', {
        user
    })*/
    res.render('profile');
});

router.get('/products',(req, res) =>{
    res.render('products')
})

module.exports = router;