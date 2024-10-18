import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique:true,
  },
  companyName: {
    type: String,
    required: true,
  },
  companyEmail: {
    type: String,
    required: true,
    unique:true,
  },
  employeeSize: {  
    type: String,
    required: true,
  },
  phoneVerify:{
    type:Boolean,
    default:false
  },
  emailVerify:{
    type:Boolean,
    default:false
  },
  otp: { 
    type: String,
    required: false,
  },
  otpExpires:{
    type:Date,
    required:false
  }
}, { timestamps: true });  


export const Company = mongoose.model('Company', companySchema);
