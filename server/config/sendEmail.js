const nodeMailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
    constructor(user, url, token) {
        this.to = user.email;
        this.firstName = user.name.split(' ')[0];
        this.url = url;
        this.token = token;
        this.from = `Hassan <${process.env.EMAIL_FROM}>`;
    }

    newTransport() {
        return nodeMailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });
    }

    //send the actual email
    async send(template, subject ) {
        //1) render html based on a pug template
        const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
            firstName: this.firstName,
            url: this.url,
            token: this.token,
            subject
        });
        //2) define email options
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html,
            text: htmlToText.fromString(html)
        };
        //3) create a transport and send email
        await this.newTransport().sendMail(mailOptions);
    }

    async sendPasswordReset() {
        await this.send('passwordReset', 'Your password reset token (valid for only 10 minutes)');
    }
}
