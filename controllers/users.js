const User = require('../models/User');

exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({ succes:true, data: users });
    } catch (error) {
        res.status(400).json({ success: false });
    }
};


exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(400).json( {success: false} );
        }
        res.status(200).json({ succes:true, data: user });
    } catch (error) {
        res.status(400).json({ success: false });
    }
};


exports.createUser = async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({ success: true, data: user });
    } catch (err) {
        res.status(400).json({ succes: false, error: err.message });
    }
};


exports.updateUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!user) {
            return res.status(400).json({ success: false });
        }
        res.status(200).json({ succes: true, data: user });
    } catch (error) {
        res.status(400).json({ success: false });
    }
};


exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if(!user){
            return res.status(400).json({ succes: false })
        }
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(400).json({ success: false });
    }
};