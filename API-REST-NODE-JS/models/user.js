const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs")
const crypto = require("crypto");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    displayName: String,
    avatar: String,
    password: {
        type: String,
        select: false
    },
    signupDate: {
        type: Date,
        default: Date.now()
    },
    lastLogin: Date
});


userSchema.pre("save", function (next) {
    if (!this.isModified("password")) return next();
    bcrypt.genSalt(10, (error, salt) => {
        if (error) next();
        bcrypt.hash(this.password, salt, null, (error, hash) => {
            if (error) return next(error);
            this.password = hash;
            next();
        });
    });
});

userSchema.methods.gravatar = function () {
    if (!this.email) return `https://gravatar.com/avatar/?s=200&d=retro`;
    const md5 = crypto.createHash("md5").update(this.email).digest("hex");
    return `https://gravatar.com/avatar/${md5}?s=200&d=retro`;
}

module.exports = mongoose.model("User", userSchema);