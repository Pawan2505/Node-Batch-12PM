

module.exports.login = (req, res) => {

    return res.render('login');
}

module.exports.signup = (req, res) => {
    const { username, password } = req.body;

    console.log(`Username: ${username}, Password: ${password}`);

    // Redirect to login page after signup
    return res.redirect('/');
}