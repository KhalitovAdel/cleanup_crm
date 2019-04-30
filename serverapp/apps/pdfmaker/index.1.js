const puppeteer = require('puppeteer'),
fs              = require('fs-extra'),
hbs             = require('handlebars'),
path            = require('path'),
moment          = require('moment'),
compile         = async function(templateName, data) {
    const filePath = path.join(process.cwd(), './serverapp/pdfmaker/mailsendertemplate/', `${templateName}.hbs`);
    const html = await fs.readFile(filePath, 'utf-8');
    return hbs.compile(html)(data);
};

hbs.registerHelper('dateFormat', function (value, format) {
    console.log('formatting', value, format);
    return moment(value).format(format);
});

hbs.registerHelper('print', function() {
    var area = hbs.escapeExpression(this.area),
    regular = hbs.escapeExpression(this.regular),
    price = hbs.escapeExpression(this.details.itogMaterial);
    var RegularControl = [
        {days: 30, translate: 'Без выходных'},
        {days: 25.8, translate: '6/1 - сб полный'},
        {days: 23.7, translate: '6/1 - сб не полный'},
        {days: 21.5, translate: '5/2'},
        {days: 15, translate: '2/2'},
        {days: 13, translate: '3 раза в неделю'},
        {days: 8.6, translate: '2 раза в неделю'},
        {days: 4.3, translate: 'Раз в неделю'},
        {days: 1, translate: 'Раз в месяц'}
      ];
    for (let x in RegularControl) {
        if (RegularControl[x].days == regular) {
            regular = RegularControl[x].translate;
        }
    }

    return new hbs.SafeString(
        '<div class="col-9"><p class="text-center">Уборка помещения ~'+area+'м<sup>2</sup> регулярностью '+regular+'</p></div><div class="col-3"><p class="text-center header">'+price.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')+' ₽</p></div>'
    );
});


async function makePDF(data) {
    try {

        const browser   = await puppeteer.launch(),
        page            = await browser.newPage(),
        content         = await compile('kp', data);

        await page.setContent(content);
        await page.emulateMedia('screen');
        await page.pdf({
            path: `kp/КП 123.pdf`,
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

module.exports.makePDF = makePDF;