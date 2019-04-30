const phantom = require('phantom');

async function pars2gis(url) {
  var Globalresult;
  const instance = await phantom.create(['--ignore-ssl-errors=yes', '--load-images=no']);
  const page = await instance.createPage();
  const status = await page.open(url);
  await page.evaluate(function() {
    var PARSfirmName = document.getElementsByClassName('cardHeader__headerNameText'),
    PARSphone, PARSphones = [], PARSaddress, result = {};
    if (PARSfirmName.length > 0) {
      PARSphone = document.getElementsByClassName('contact__phonesItemLinkNumber');
      for (var x = 0; x < PARSphone.length; x++) {
        if ( x > 0 ) {
          PARSphones.push(PARSphone[x].innerHTML);
        }
      }
      PARSaddress = document.getElementsByClassName('card__addressLink')[0].innerHTML.replace('&nbsp;', ' ');
      result = {
        firmName: PARSfirmName[0].innerHTML,
        contactPhones: PARSphones,
        address: PARSaddress
      }
      return result;
    }
    //Начало второго блока
    PARSfirmName = document.getElementsByClassName('mediaCardHeader__cardHeaderName');
    PARSphone = document.getElementsByClassName('mediaContacts__phonesNumber');
      for (var x = 0; x < PARSphone.length; x++) {
        if ( x > 0 ) {
          PARSphones.push(PARSphone[x].innerHTML);
        }
      }
      PARSaddress = document.getElementsByClassName('mediaCardHeader__cardAddressName')[0].innerHTML.replace('&nbsp;', ' ');
      result = {
        firmName: PARSfirmName[0].innerHTML,
        contactPhones: PARSphones,
        address: PARSaddress
      }
      return result;

  }).then(function(data){
    console.log(data);
    return Globalresult = data;
  });

  await instance.exit();
  return Globalresult;
};

module.exports.pars2gis = pars2gis;