"use strict";
const nodemailer  = require("nodemailer"),
fs                = require('fs');

module.exports.sendKP = async function(email, urlToPath, fileName){
    const output = `
        <p style="font-size: 1rem; margin-bottom: 0;">Еще раз здравствуйте!
        <br>Как и договаривались, направляю вам коммерческое предложение, оно прикреплено к письму.</p>
        <p style="font-size: 1rem; margin-bottom: 0;">Мы сделали вам такое предложение, что цена за нашу услугу = заработной плате уборщицы</p>
        <ul>
            <li style="font-size: 1rem; margin-bottom: 0;">Своевременно заменим исполнителя, если он заболеет или попросит отгул</li>
            <li style="font-size: 1rem; margin-bottom: 0;">За объектом будет закреплен наш управляющий, который будет координировать работу</li>
        </ul>
        <br>
        <br>
        <hr>
        <p style="font-size: 1rem; margin-bottom: 0;">С уважением, Адель</p>
        <p style="font-size: 1rem; margin-bottom: 0;">Ведущий специалист коммерческих уборок</p>
        <br>
        <p style="font-size: 1rem; margin-bottom: 0;">Телефон для связи: <a href="callto:+78432070296">+7 (843) 207-02-96<a></p>
        <p style="font-size: 1rem; margin-bottom: 0;">Веб сайт <a href="http://xn--80apfeln.xn--p1ai/">клинап.рф</a></p>
        `;
  let transporter = nodemailer.createTransport({
    host: "smtp.yandex.ru",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'cleanupkzn@yandex.ru', // generated ethereal user
      pass: 'Benq1234' // generated ethereal password
    }
  });

  let mailOptions = {
    from: '"CleanUp service 👻" <cleanupkzn@yandex.ru>',
    to: email,
    subject: "✔ Предложение по уборке помещений",
    //text: "Hello world?", 
    html: output, 
    attachments: [
        { // use URL as an attachment
            filename: fileName,
            path: urlToPath
        }
    ]
  };

  let info = await transporter.sendMail(mailOptions)

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  fs.unlinkSync(urlToPath);
}

module.exports.sendSomeMessage = async function(email, sometext, somesubject) {
  let transporter = nodemailer.createTransport({
    host: "smtp.yandex.ru",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'cleanupkzn@yandex.ru', // generated ethereal user
      pass: 'Benq1234' // generated ethereal password
    }
  });

  let mailOptions = {
    from: '"CleanUp service 👻" <cleanupkzn@yandex.ru>',
    to: (email === undefined)? 'cleanupkzn@yandex.ru' : email,
    subject: (somesubject === undefined)? 'Хотят уборку' : somesubject,
    html: sometext,
  };

  return await transporter.sendMail(mailOptions);
}