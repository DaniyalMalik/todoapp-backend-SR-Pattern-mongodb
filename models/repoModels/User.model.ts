const mongoose = require('mongoose'),
  bcrypt = require('bcryptjs'),
  jwt = require('jsonwebtoken'),
  { randomBytes, createHash } = require('crypto'),
  MongooseSchema = new mongoose.Schema(
    {
      firstName: { type: String, default: '' },
      lastName: { type: String, default: '' },
      email: {
        type: String,
        unique: [true, 'Email address already exists!'],
        match: [
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          'Please enter a valid email address!',
        ],
      },
      phoneNumber: {
        type: String,
        unique: [true, 'Phone number already exists!'],
      },
      password: { type: String, default: '' },
      resetPasswordToken: { type: String, default: '' },
      isEmailVerified: { type: Boolean, default: false },
      resetPasswordTokenExpiry: { type: String, default: '' },
      verifyEmailToken: { type: String, default: '' },
      verifyEmailTokenExpiry: { type: String, default: '' },
    },
    { timestamps: true },
  );

MongooseSchema.pre('save', async function (this: any, next: Function) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);
});

MongooseSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id, isAdmin: false }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

MongooseSchema.methods.matchPassword = async function (
  this: any,
  enteredPassword: String,
) {
  return bcrypt.compare(enteredPassword, this.password);
};

MongooseSchema.methods.getResetPasswordToken = function () {
  const resetToken = randomBytes(20).toString('hex');

  this.resetPasswordToken = createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.resetPasswordTokenExpiry = Date.now() + 10 * 60 * 1000;
  this.save({ validateBeforeSave: false });

  return resetToken;
};

MongooseSchema.methods.getVerifyEmailToken = function () {
  const resetToken = randomBytes(4).toString('hex');

  this.verifyEmailToken = createHash('sha256').update(resetToken).digest('hex');
  this.verifyEmailTokenExpiry = Date.now() + 10 * 60 * 1000;
  this.save({ validateBeforeSave: false });

  return resetToken;
};

module.exports = mongoose.model('User', MongooseSchema, 'User');
