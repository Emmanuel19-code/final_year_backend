import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const healthworker = new mongoose.Schema(
  {
    healthworkerId:{
        type:String,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "please provide this value"],
      unique: true,
    },
    phone:{
      type:String
    },
    password: {
      type: String,
    },
    avatar: {
      public_id: String,
      url: String,
    },
    role: {
      type: String,
      default: "healthworker",
    },
    isverified: {
      type: Boolean,
      default: false,
    },
    isVerifiedByOrganization:{
        type:Boolean,
        default:false
    },
    startTime:{
      type:String,
      
      
    },
    endTime:{
      type:String,
      
      
    },
    specialty:{
      type:String
    },
    experience:{
      type:String
    },
    about:{
      type:String
    },
    workingdays:{
      type:String
    }
  },
  { timestamps: true }
);

healthworker.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

healthworker.methods.createToken = function () {
  return jwt.sign(
    { healthworkerId: this.healthworkerId },
    process.env.TOKEN_SECRET,
    {
      expiresIn: "10m",
    }
  );
};

//creating a accesstoken
healthworker.methods.createAccessToken = function () {
  return jwt.sign(
    { healthworkerId: this.healthworkerId, role: this.role },
    process.env.ACCESS_TOKEN,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

//creating refreshtoken
healthworker.methods.createRefreshToken = function () {
  return jwt.sign(
    { healthworkerId: this.healthworkerId,  role: this.role },
    process.env.REFRESH_TOKEN,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

healthworker.methods.createActivationToken = function () {
  const activationcode = Math.floor(1000 + Math.random() * 9000).toString();
  const activationtoken = jwt.sign(
    {
      healthworkerId: this.healthworkerId,
    },
    process.env.ACTIVATION_TOKEN,
    {
      expiresIn: "10m",
    }
  );
  return { activationcode, activationtoken };
};

healthworker.methods.HashOtp = async function (otpvalue) {
  const HashedOtp = jwt.sign(
    {
      otpvalue: otpvalue,
    },
    process.env.HASH_PASSWORD,
    {
      expiresIn: "10m",
    }
  );
  return { HashedOtp };
};

//comparing the function
healthworker.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};
const health_worker = mongoose.model("HealthStaff", healthworker);

export default health_worker;
