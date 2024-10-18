import { sendEmail } from "../utils/emailService.js";

export const sendMail = async (req, res) => {
    try {
     
        console.log("Inside the api");
        console.log(req.body);
        
        const { emails } = req.body; 
        console.log(emails);
        
    
        await sendEmail(emails, 'Interview Invitation', 'You are invited for an interview. Please check your email for details.');
        
    
        res.status(200).send({ success: true, message: 'Emails sent successfully' });
    } catch (error) {
        console.error('Error in sendMail:', error);
        res.status(500).send({ success: false, message: 'Error sending email', error });
    }
};
