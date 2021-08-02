exports.getUsers = async (req, res, next) => {
    res.status(200).json({succes:true, msg: 'Show all users'})
};


exports.getUser = async (req, res, next) => {
    res.status(200).json({succes:true, msg: 'Show user'})
};


exports.createUser = async (req, res, next) => {
    res.status(200).json({succes:true, msg: 'Create user'})
};


exports.updateUser = async (req, res, next) => {
    res.status(200).json({succes:true, msg: 'Update user'})  
};


exports.deleteUser = async (req, res, next) => {
    res.status(200).json({succes:true, msg: 'Delete user'})
};
