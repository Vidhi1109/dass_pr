var express = require("express");
var router = express.Router();

// Load User model
const User = require("../models/Users");

// GET request 
// Getting all the users
router.get("/", function(req, res) {
    User.find(function(err, users) {
		if (err) {
			console.log(err);
		} else {
			res.json(users);
		}
	})
});


router.post("/register", (req, res) => {
    const newUser = new User({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        acc_address: req.body.acc_address,
        private_key: req.body.private_key,
        role: req.body.role
    });

    newUser.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});


router.post("/login", (req, res) => {
	const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
	User.findOne({ email:email , password:password }).then(user => {

		if (!user) {
			return res.status(404).json({
				error: "Username not found",
			});
        }
        else{
            res.send(user);
        }
	});
});

module.exports = router;

