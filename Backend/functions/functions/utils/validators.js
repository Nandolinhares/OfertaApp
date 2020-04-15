//Helpers

const isEmpty = (field) => {
    if(field.trim() === '') {
        return true;
    } else {
        return false;
    }
}

const isEmail = (email) => {
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(email.match(emailRegEx)) return true;
    else return false;
}

exports.validateSignup = (newUser) => {
    let errors = {};
    
    if(isEmpty(newUser.firstName)) {
        errors.firstName = 'O campo não pode estar vazio';
    }
    if(isEmpty(newUser.lastName)) {
        errors.lastName = 'O campo não pode estar vazio';
    }
    if(isEmpty(newUser.email)) {
        errors.email = 'O campo não pode estar vazio';
    }
    if(!isEmail(newUser.email)) {
        errors.email = 'O email não é válido';
    }
    if(isEmpty(newUser.streetAddress)) {
        errors.streetAddress = 'O campo não pode estar vazio';
    }
    if(isEmpty(newUser.neighborhood)) {
        errors.neighborhood = 'O campo não pode estar vazio';
    }
    if(isEmpty(newUser.neighborhood)) {
        errors.neighborhood = 'O campo não pode estar vazio';
    }
    if(isEmpty(newUser.houseNumber)) {
        errors.houseNumber = 'O campo não pode estar vazio';
    }
    if(isEmpty(newUser.phoneNumber)) {
        errors.phoneNumber = 'O campo não pode estar vazio';
    }
    if(isEmpty(newUser.username)) {
        errors.username = 'O campo não pode estar vazio';
    }
    if(isEmpty(newUser.password)) {
        errors.password = 'O campo não pode estar vazio';
    }

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
}