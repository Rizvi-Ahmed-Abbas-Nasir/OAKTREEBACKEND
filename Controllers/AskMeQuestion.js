import nodemailer from "nodemailer";
import { secrets } from "../Secrets.js";

const { sender, password_sender } = secrets;

export const AskMeQuestion = async (req, res) => {
  const {
    email,
    question,
   
  } = req.body;

  let attachments = [];

 

  const transporter = nodemailer.createTransport({
    service:"gmail",
    secure: true,
    auth: {
      user: sender,
      pass: password_sender,
    },
  });

  const mailOptions = {
    from: `OAKTREE <${sender}>`,
    to: [
      "riteshmaurya3006@gmail.com",
    
    ],
    subject: `OakTree - New Question Form Submission from ${email}`,
    attachments,
    html: `
      <p>Hello there,</p>
      <p>
        A new Job Application form submission has been received through OakTree's website. Please find the details below:
      </p>
      <ul>
        <li>Email: <b>${email}</b></li>
        <li>Question: <b>${question}</b></li>
      
      </ul>
    
      <br>
      <p>Thank you.</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
    res.status(200).json({
      status: "success",
      message: "Form submitted and email sent successfully!",
      emailResponse: info.response,
    });
  } catch (error) {
    console.error("Error sending email:", error.message);
    res.status(500).json({
      status: "error",
      message: "Failed to send email.",
      error: error.message,
    });
  }
};