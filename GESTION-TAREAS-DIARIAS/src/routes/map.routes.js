var users = {
    list: function (req, res) {
        res.send('user list');
    },

    get: function (req, res) {
        res.send('user ' + req.params.uid);
    },

    delete: function (req, res) {
        res.send('delete users');
    }
};

var pets = {
    list: function (req, res) {
        res.send('user ' + req.params.uid + '\'s pets');
    },

    delete: function (req, res) {
        res.send('delete ' + req.params.uid + '\'s pet ' + req.params.pid);
    }
};

app.map({
    '/users': {
        get: users.list,
        delete: users.delete,
        '/:uid': {
            get: users.get,
            '/pets': {
                get: pets.list,
                '/:pid': {
                    delete: pets.delete
                }
            }
        }
    }
});