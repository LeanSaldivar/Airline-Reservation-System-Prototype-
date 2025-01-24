import dotenv from 'dotenv';
dotenv.config({ path:'../config/.env' });
import nodemailer from "nodemailer";
import google from "googleapis";



console.log('PASS:', APP);

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: true,
    auth: {
        user: process.env.EMAIL, //GMAIL EMAIL ADD
        pass: process.env.PASS, //APP PASSWORD
    },
});

const mailOptions = {
    from: `"Origins" <${EMAIL}>`,
    to: "pino.e.challe@gmail.com",
    subject: 'THANK YOU',
    text: 'thanks for lending me your email adds, for this test run.',
    html: "<b>Hello World!</b>",
}

console.log('Mail Options:', mailOptions);

const sendMail = async (transporter, mailOptions) => {
    try {
        const info = await transporter.sendMail(mailOptions); // Pass mailOptions here
        console.log('Message sent:', info.response);
    } catch (error) {
        console.error('Error occurred:', error.message); // Log error details
    }
};

sendMail(transporter, mailOptions);

//Need tokens