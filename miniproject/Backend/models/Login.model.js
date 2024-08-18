const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const LoginSchema = new mongoose.Schema(
  { 
    loginKey: { type: String, unique: true ,required: true},
    email: {
      type: String,
      required: true,
      unique: true 
    },
    password: {
      type: String,
      required: true,
    },
    name:{
        type:String,
        required: false,
    }
  },
  {
    timestamps: true,
  },
  
);

LoginSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        return next(err);
    }
});

LoginSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};
LoginSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id, loginKey: this.loginKey }, 'your_jwt_secret_key');
    return token;
};
const Login = mongoose.model("Login",LoginSchema);
module.exports = Login;