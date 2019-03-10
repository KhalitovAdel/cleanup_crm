const puppeteer = require('puppeteer'),
fs              = require('fs-extra'),
hbs             = require('handlebars'),
path            = require('path'),
moment          = require('moment'),
compile         = async function(templateName, data) {
    const filePath = path.join(process.cwd(), 'mailsendertemplate/', `${templateName}.hbs`);
    const html = await fs.readFile(filePath, 'utf-8');
    return hbs.compile(html)(data);
},
sendKP = require('../mailer/index');

hbs.registerHelper('dateFormat', function (value, format) {
    console.log('formatting', value, format);
    return moment(value).format(format);
});


async function makePDF(data) {
    try {

        const browser   = await puppeteer.launch(),
        page            = await browser.newPage(),
        content         = await compile('kp', data);

        await page.setContent(content);
        await page.emulateMedia('screen');
        await page.pdf({
            path: `kp/КП ${data.Lead.firmName}.pdf`,
            format: 'A4',
            printBackground: true
        });

        console.log('PDF created');
        //await sendKP.sendKP(data.Lead.contactEmail, `kp/КП ${data.Lead.firmName}.pdf`, `КП ${data.Lead.firmName}.pdf`)
        await browser.close();
        //process.exit();

    } catch (e) {
        console.log('our error', e);
    }
};
var data = {
    Offer: {
        area: 100,
        regular: 21.5,
        details: {
            itog: 12212,
            itogMaterial: 14444,
        }
    },
    Lead: {
        firmName: 'gaga',
        address: 'kazan'
    }
}
makePDF(data);

module.exports.makePDF = makePDF;