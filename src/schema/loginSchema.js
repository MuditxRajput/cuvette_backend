import { z } from 'zod';
export const loginSchema = z.object({
    // name: z.string().min(2,{message:"Name must be least 2 character long"}),
    phone:z.string().min(10,{message:"Phone number must be at least 10 character long"}),
    // companyName: z.string().min(2, { message: "Company Name is required" }),
  companyEmail: z.string().email({ message: "Invalid email address" }),
//   employeeSize: z.string().min(1, { message: "Employee size is required" }),
})