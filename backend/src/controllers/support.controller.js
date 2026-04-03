import SupportMessage from "../models/supportMessage.model.js";
import nodemailer from "nodemailer";

const helpContent = {
  sections: [
    {
      title: "Orders",
      items: [
        "How to place an order",
        "Track your order status",
        "Cancel or modify an order",
      ],
    },
    {
      title: "Shipping",
      items: [
        "Delivery timelines by location",
        "Shipping cost calculation",
        "What to do if delivery is delayed",
      ],
    },
    {
      title: "Returns & Refunds",
      items: [
        "Return eligibility and timeframe",
        "How to request a refund",
        "When refunds are credited",
      ],
    },
    {
      title: "Account & Security",
      items: [
        "Reset password",
        "Update profile details",
        "Report suspicious activity",
      ],
    },
  ],
};

export const getHelpCenter = async (req, res) => {
  try {
    res.status(200).json(helpContent);
  } catch (error) {
    res.status(500).json({
      message: "Failed to load help center content",
      error: error.message,
    });
  }
};

export const submitContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ message: "Name, email, and message are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Please enter a valid email" });
    }

    const created = await SupportMessage.create({
      name,
      email,
      subject: subject || "General Inquiry",
      message,
    });

    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        const mailOptions = {
          from: `"${name}" <${process.env.EMAIL_USER}>`,
          to: process.env.EMAIL_RECEIVER || "instaguard7@gmail.com",
          replyTo: email,
          subject: `New Contact Form Submission: ${subject || "General Inquiry"}`,
          text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject || "General Inquiry"}\nMessage:\n${message}`,
          html: `<h3>New Contact Form Submission</h3>
                 <p><strong>Name:</strong> ${name}</p>
                 <p><strong>Email:</strong> ${email}</p>
                 <p><strong>Subject:</strong> ${subject || "General Inquiry"}</p>
                 <p><strong>Message:</strong></p>
                 <p>${message.replace(/\n/g, "<br>")}</p>`,
        };

        await transporter.sendMail(mailOptions);
      } else {
        console.warn("Nodemailer: EMAIL_USER or EMAIL_PASS is missing in .env. Skipping email notification.");
      }
    } catch (emailError) {
      console.error("Failed to send email notification:", emailError);
    }

    res.status(201).json({
      message: "Your message has been sent successfully",
      data: created,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to send contact message",
      error: error.message,
    });
  }
};
