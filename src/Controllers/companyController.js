import jwt from 'jsonwebtoken';
import { Company } from "../model/company.model.js";
import { comapanySchema } from "../schema/companySchema.js";
import { loginSchema } from '../schema/loginSchema.js';
import { otpService } from '../utils/otpService.js';
export const companyController =async(req,res)=>{
  try { 
    const companyData = comapanySchema.parse(req.body);
    const{name,phone,companyName,companyEmail,employeeSize} = companyData;
      
    const existedEmail = await Company.findOne({companyEmail:companyEmail});
    if(existedEmail)
    {
        console.log(existedEmail);
        
        return res.status(409).json({msg:"Email is already present",success:false})
    }
    else{
        const company = new Company({
            name,
            phone,
            companyName,
            companyEmail,
            employeeSize,
        })
        // await company.save();
        const otp = await otpService(companyEmail,phone);
        company.otp = otp.otp;
        company.otpExpires = otp.otpExpires;
        const token = jwt.sign({email:companyEmail},process.env.JWT_SECRET,{expiresIn:'1h'})
        await company.save();
        return res.status(201).json({ msg: "OTP send successfully", success: true, data: company,token });
    }
  } catch (error) {
     
   
      return res.status(500).json({ msg: "Internal server error", error: error.message });
  }
    
}
export const verify =async(req,res)=>{
  try {
    console.log("api hit");
    
    const {emailotp,phoneotp,token} = req.body;
    console.log(emailotp);
    console.log(phoneotp);
    
    const decode =  jwt.verify(token,process.env.JWT_SECRET);
    const companyEmail = decode.email;
    
    
    const existedCompany = await Company.findOne({companyEmail,companyEmail})
    
    
    if (!existedCompany) {
        return res.status(404).json({ msg: "User not found", success: false });
    }
  
    try {
        if(emailotp!=='' && phoneotp===undefined)
            {
                // console.log(existedCompany.otp,"inside 1");
                // console.log(emailotp);
                console.log("yes");
                
                
                if(existedCompany.otp === emailotp  )
                    {   
                    
                        
                        console.log("yes");
                        
                        existedCompany.emailVerify = true;
                        // const token =  jwt.sign({id:existedCompany._id},process.env.JWT_SECRET,{expiresIn:'1h'})   
                        await existedCompany.save();
                        return res.status(200).json({ msg: "Email verified successfully", success: true ,existedCompany});
                    }
            }
            else{
                if(existedCompany.otp === phoneotp )
                    {   
                      
                        existedCompany.phoneVerify = true;
                        // const token =  jwt.sign({id:existedCompany._id},process.env.JWT_SECRET,{expiresIn:'1h'})   
                        await existedCompany.save();
                        return res.status(200).json({ msg: "phone verified successfully", success: true,existedCompany });
                    }
            }
    } catch (error) {
        return res.status(501).json(error)
    }
    

   
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error", error: error.message });
  }
}

export const login=async(req,res)=>{
  try {
    console.log("hit");
    
    const companyData = loginSchema.parse(req.body);
    const {companyEmail,phone} = companyData;

    
    const existedEmail = await Company.findOne({companyEmail:companyEmail});
    console.log(existedEmail);
    
    if(!existedEmail)
    {
        return res.status(401).json({msg:"Company is not found",success:false})
    }
    else{
      if(existedEmail.phone===phone)
      {
        const token = jwt.sign({email:companyEmail},process.env.JWT_SECRET,{expiresIn:'1h'})
        return res.status(200).json({msg:"Login successfull",success:true,token})
      }
      
    }
   
    return res.status(401).json({msg:"Error in validation"})
  } catch (error) {
    return res.status(500).json({msg:"Internal Server error",success:false});
  }
}