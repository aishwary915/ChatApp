const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{type: String, required: true, minlength : 3, maxlength: 30},
    email:{type: String, required: true,minlength: 3,maxlength: 200, unique: true,
        validate: {
            validator: validator.isEmail,
            message: "Please enter a valid email"
        }
    },
    password: {type: String,required: true,minlength: 3,maxlength: 1024},
},
{
    timestamps: true,
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;