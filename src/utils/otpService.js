import { sendEmail } from "./emailService.js";
import { sendSMS } from "./smsService.js";
const generateOTP=()=>{
    const otp =  Math.floor(100000 + Math.random()*900000).toString();
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000);
    return {otp,otpExpires}
}
export const otpService=async(email,number)=>{
    const otp = generateOTP();

    await sendEmail(email,'OTP for verification',`Your OTP is ${otp.otp}`)

    await sendSMS(`+91${number}`,`Your OTP is :${otp.otp}`)

    return otp;
}