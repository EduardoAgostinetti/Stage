const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

function validateFields(data) {
    const keys = Object.keys(data);

    for (let key of keys) {
        if (!data[key]) {
            return key;
        }
    }
    return null;
}

async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

async function comparePassword(password, hash) {
    return await bcrypt.compare(password, hash);
}

function generateCode(tamanho) {
    return crypto.randomBytes(tamanho).toString('hex');
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'duducom195@gmail.com',
        pass: 'gmgv qepd csdp zfga', // Certifique-se de armazenar a senha de forma segura
    }
});

function sendMail(email, subject, text, html) {
    const mailOptions = {
        from: 'duducom195@gmail.com',
        to: email,
        subject: subject,
        text: text,
        html: html
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(`Erro no servidor, por favor tente novamente mais tarde.`);
            } else {
                resolve(`E-mail enviado.`);
            }
        });
    });
}

module.exports = {
    validateFields,
    hashPassword,
    comparePassword,
    generateCode,
    sendMail
};
