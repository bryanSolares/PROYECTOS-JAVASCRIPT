const {
    Router
} = require('express')
const admin = require('firebase-admin')
var serviceAccount = require("../../node-firebase-example-3106e-firebase-adminsdk-1xzss-c3916ef11c.json");

const router = Router();

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://node-firebase-example-3106e.firebaseio.com/'
});

const db = admin.database();

router.get('/', (req, res) => {
    db.ref('contacts').once('value', (snapshot) => {
        const data = snapshot.val();
        res.render('index',{contacts:data});
    })
});

router.post('/new-contact', (req, res) => {
    const newContact = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone
    }
    db.ref('contacts').push(newContact);
    res.redirect('/');
});

router.get('/delete-contact/:id', (req, res) => {
    db.ref('contacts/'.concat(req.params.id)).remove();
    res.redirect('/');
});

module.exports = router;