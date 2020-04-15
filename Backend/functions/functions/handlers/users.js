const { admin, db } = require('../utils/admin');
const firebase = require('firebase');
const firebaseConfig = require('../utils/config');

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();

//Validators
const { validateSignup } = require('../utils/validators');

//Signup

exports.signup = (req, res) => {
    const noImg = 'no-img.png';
    const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        streetAddress: req.body.streetAddress,
        neighborhood: req.body.neighborhood,
        houseNumber: req.body.houseNumber,
        phoneNumber: req.body.phoneNumber,
        username: req.body.username,
        password: req.body.password,
        imageUrl: `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${noImg}?alt=media`,
        createdAt: new Date().toISOString() 
    }

    const { errors, valid } = validateSignup(newUser);

    if(!valid) {
        return res.status(400).json(errors);
    }

    let token, userId;
    db.doc(`/users/${newUser.username}`).get()
        .then(doc => {
            if(doc.exists) {
                return res.status(400).json({ message: 'O username já está em uso' });
            } else {
                return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password);
            }
        })
        .then(data => {
            userId = data.user.uid;
            return data.user.getIdToken();
        })
        .then(idToken => {
            token = idToken;
            //Credenciais do usuário
            const setCredentials = {
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: req.body.email,
                streetAddress: newUser.streetAddress,
                neighborhood: newUser.neighborhood,
                houseNumber: newUser.houseNumber,
                phoneNumber: newUser.phoneNumber,
                username: newUser.username,
                imageUrl: newUser.imageUrl,
                createdAt: newUser.createdAt,
                userId
            }

            return db.doc(`/users/${newUser.username}`).set(setCredentials);
        })
        .then(() => {
            return res.status(201).json({ token });
        })
        .catch(err => {
            console.error(err);
            if(err.code === "auth/email-already-in-use") {
                return res.status(400).json({ message: 'O email já está em uso' });
            }
        })
}

