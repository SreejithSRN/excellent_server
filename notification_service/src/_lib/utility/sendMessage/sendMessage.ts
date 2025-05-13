import nodemailer from "nodemailer";
import { env_variables } from "../../../_boot/config";

export const sendMessage = async (email: string, message:string) => {
  const transporter = nodemailer.createTransport({
    port: 465,
    service: "Gmail",
    auth: {
      user: env_variables.USERMAIL,
      pass: env_variables.USERSECRET,
    },
    secure: true,
  });

  
  const mailData = {
    from: "excellent@gmail.com",
    to: email,
    subject: "Notification from Excellent",
    html: `<p style='font-size: 16px;'>${message}</p>`,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailData, (error:any) => {
      if (error) {
        console.log("Error occurred while sending the OTP", error);
        reject(error);
      } else {
        resolve(true);
      }
    });
  });
};
