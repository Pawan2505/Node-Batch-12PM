
module.exports.dashbord = (req,res)=>{
    return res.render('dashboard')
}

module.exports.add_admin = (req,res)=>{
    return res.render('add_admin')
}
module.exports.view_admin = (req,res)=>{
    return res.render('view_admin')
}
module.exports.insertData = (req,res)=>{
    return res.redirect("");
}
