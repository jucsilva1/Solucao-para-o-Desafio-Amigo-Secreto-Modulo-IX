const express = require('express');
const nodemailer = require('nodemailer');

const app = express();

app.use(express.json());

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  secureConnection: false,
  port: 587,
  tls: {
    ciphers: "SSLv3",
  },
  auth: {
    user: "seu_email",
    pass: "seu_password",
  },
});

app.post('/convite/enviaremail', (req, res) => {
  const { email, assunto, mensagem } = req.body;

  const mailOptions = {
    from: 'seu_email',
    to: email,
    subject: assunto,
    text: mensagem,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Erro ao enviar e-mail');
    } else {
      console.log('E-mail enviado: ' + info.response);
      res.send('E-mail enviado com sucesso');
    }
  });
});

app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});

