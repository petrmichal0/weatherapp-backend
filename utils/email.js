const nodemailer = require("nodemailer");

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = `WeatherApp Petr Michal <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true, // Použití TLS
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(subject, htmlContent) {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html: htmlContent, // Use HTML content
    };

    await this.newTransport().sendMail(mailOptions);
  }
  async sendPasswordReset() {
    const htmlContent = `
      <p>Hello ${this.firstName},</p>
      <p>You requested a password reset. Please click on the link below to reset your password:</p>
      <p><a href="${this.url}">Reset Password</a></p>
      <p>If you didn't request this, please ignore this email.</p>
    `;
    await this.send(
      "Your password reset token (valid for only 10 minutes)",
      htmlContent
    );
  }
};
