import nodemailer from "nodemailer";
import { secrets } from "../Secrets.js";

const { sender, password_sender } = secrets;

export const contactMail = async (req, res) => {
  const {
    fullName,
    email,
    phoneNumber,
    message,
    country,
    dob,
    contactTime,
    address,
    contactDetails,
    items
} = req.body;


  // Validate required fields
  // if (!clientname || !email || !projectType || !projectTitle) {
  //   console.error("Validation Error: Missing required fields.");
  //   return res.status(400).json({
  //     status: "error",
  //     message: "Missing required fields. Please provide all necessary details.",
  //   });
  // }

  console.log("Preparing to send email...");
  console.log("Form data received:", {
    fullName,
    email,
    phoneNumber,
    message,
    country,
    financialGoal,
    postRetirementGoals,
    dob,
    contactTime,
    address,
    contactDetails,
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: sender,
        pass: password_sender,
    },
    logger: true,
    debug: true,
});


  var mailOptions = {
    from: `"OakTree" <${sender}>`,
    to: [
      "riteshmaurya3006@gmail.com",
    
    ],
    subject: `OakTree - New Contact Form Submission from ${fullName}`,
    html: `
    Hello there,<br>
    <p>
    A new contact form submission has been received through OakTree's website. Please find the details below:
    </p>
    <ul>
       <li>Full Name: <b>${fullName}</b></li>
      <li>Email: <b>${email}</b></li>
      <li>Phone Number: <b>${phoneNumber}</b></li>
      <li>Your Message: <b>${message}</b></li>
      <li>Country of Residence: <b>${country}</b></li>
      <li>Date of Birth: <b>${dob}</b></li>
      <li>Preferred Contact Method/Time: <b>${contactTime}</b></li>
      <li>Address: <b>${address}</b></li>
      <li>Contact Details: <b>${contactDetails}</b></li>

    </ul>
    <p>
       The submitter has expressed interest in <b>${items}</b> and has provided their contact information for further communication. Kindly assign a team member to follow up with them at your earliest convenience.    </p>
    </p>
    <br>
    Thank you.
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
    console.error("Error sending email:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to send email.",
      error: error.message,
    });
  }
};
