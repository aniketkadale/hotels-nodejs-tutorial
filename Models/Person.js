const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  work: {
    type: String,
    enum: ["chef", "waiter", "manager"],
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

personSchema.pre('save', async function(next) {
  const user = this;
  if(!user.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    next();
  } catch(err) {
    return next(err);
  }
}) 

personSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch(err) {
    throw err;
  }
}

const person = mongoose.model("Person", personSchema);

module.exports = person;
