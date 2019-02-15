const puppeteer = require('puppeteer'),
fs              = require('fs-extra'),
hbs             = require('handlebars'),
path            = require('path'),
moment          = require('moment'),
compile         = async function(templateName, data) {
    const filePath = path.join(process.cwd(), 'serverapp/pdfmaker/mailsendertemplate/', `${templateName}.hbs`);
    const html = await fs.readFile(filePath, 'utf-8');
    return hbs.compile(html)(data);
};

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
            path: `kp/КП ${data.firmname}.pdf`,
            format: 'A4',
            printBackground: true
        });

        console.log('PDF created');
        await browser.close();
        //process.exit();

    } catch (e) {
        console.log('our error', e);
    }
};

module.exports.makePDF = makePDF;