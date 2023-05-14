/**
 * File: core.js
 * Created Date: Sunday January 14th 2018
 * Author: modifided from http://mj89sp3sau2k7lj1eg3k40hkeppguj6j-a-sites-opensocial.googleusercontent.com/gadgets/ifr?url=http://www.gstatic.com/sites-gadgets/iframe/iframe.xml&container=enterprise&view=default&lang=en&country=ALL&sanitize=0&v=1cbf636963b6b8f8&libs=core&parent=http://www.weallnepali.com/about-nepal/type-in-nepali#up_scroll=no&up_iframeURL=http://www.ashesh.com.np/linknepali-unicode2.php?nplaski%3Dan298iodp21458378%26cdf%3Draye65shw63%26sec%3Di33n66%26gnhkei%3Ddie7734jf7u37ur73u%26n%3Dueyfjrd73igkmewf74kg7rkfguuni%3Dureyfmkf74jt74ity4itr748g%26jduedkeuidokvhde%3Djduek38i47rugkgf948gkrlor04irkjf8%26jdhe%3Du7uye6ryer53yy6fyd6%26ijde%3Dncudj8ud7e%26id%3Duni2&st=e%3DAIHE3cBjQstD%252FgM6NeeJRVYbKyulGE8eSwpNN%252B18b%252FD53TKy%252F5P4q9Sta4M22H9SOdDqaFlCnZys4lFmFvK5S0Dvk4WWAixvQBYHZMRG3vBeIC9LbL1hSIJ8Djos%252FVFiOktCSNzsa9ks%26c%3Denterprise&rpctoken=-346160398248031709
 * Last Modified:Sunday, January 14th 2018, 11:28:58 am
 * Modifided by:Sujan Poudel
 */
var uD = new Object();
var sW = new Object();
var cR = new Object();
var iW = new Object();
iW['cha'] = 'chha';
iW['chu'] = 'chhu';
iW['chha'] = 'chha';
iW['ma'] = 'ma';
iW['aba'] = 'aba';
iW['nam'] = 'naam';
iW['ram'] = 'raam';
iW['pani'] = 'pani';
iW['lai'] = 'laaii';
iW['pai'] = 'paaii';
iW['dai'] = 'daaii';
iW['bhai'] = 'bhaaii';
cR['ba'] = '2348';
cR['bha'] = '2349';
cR['ca'] = '2325';
cR['cha'] = '2330';
cR['chha'] = '2331';
cR['Da'] = '2337';
cR['da'] = '2342';
cR['dha'] = '2343';
cR['Dha'] = '2338';
cR['fa'] = '2347';
cR['ga'] = '2327';
cR['gha'] = '2328';
cR['gya'] = '2332+2381+2334';
cR['ha'] = '2361';
cR['ja'] = '2332';
cR['jha'] = '2333';
cR['ka'] = '2325';
cR['kha'] = '2326';
cR['ksha'] = '2325+2381+2359';
cR['la'] = '2354';
cR['ma'] = '2350';
cR['Na'] = '2339';
cR['na'] = '2344';
cR['Nepala'] = '2344+2375+2346+2366+2354';
cR['nga'] = '2329';
cR['pa'] = '2346';
cR['pha'] = '2347';
cR['qa'] = '2325';
cR['ra'] = '2352';
cR['sa'] = '2360';
cR['sha'] = '2358';
cR['Sha'] = '2359';
cR['ta'] = '2340';
cR['Ta'] = '2335';
cR['Tha'] = '2336';
cR['tha'] = '2341';
cR['va'] = '2357';
cR['wa'] = '2357';
cR['xa'] = '2325+2381+2360';
cR['ya'] = '2351';
cR['yna'] = '2334';
cR['za'] = '2332';
uD['*'] = '2306';
uD['**'] = '2305';
uD['.'] = '2404';
uD['\\'] = '2381';
uD['0'] = '2406';
uD['1'] = '2407';
uD['2'] = '2408';
uD['3'] = '2409';
uD['4'] = '2410';
uD['5'] = '2411';
uD['6'] = '2412';
uD['7'] = '2413';
uD['8'] = '2414';
uD['9'] = '2415';
uD['a'] = '2309';
uD['aa'] = '2310';
uD['ai'] = '2320';
uD['am'] = '2309+2381';
uD['au'] = '2324';
uD['aum'] = '2384';
uD['e'] = '2319';
uD['i'] = '2311';
uD['ii'] = '2312';
uD['o'] = '2323';
uD['om'] = '2384';
uD['oo'] = '2314';
uD['ri^'] = '2381+2352+2367+';
uD['rr'] = '2352+2381+8205';
uD['rree'] = '2400';
uD['rri'] = '2315';
uD['u'] = '2313';
for (var conso in cR) {
  if (!uD[conso]) uD[conso] = cR[conso];
  if (!uD[conso + 'a']) uD[conso + 'a'] = cR[conso] + '+2366';
  var consoMinusA = conso.substring(0, conso.length - 1);
  var consoVal = cR[conso];
  if (!uD[consoMinusA + 'i']) uD[consoMinusA + 'i'] = consoVal + '+2367';
  if (!uD[consoMinusA + 'ee']) uD[consoMinusA + 'ee'] = consoVal + '+2368';
  if (!uD[consoMinusA + 'u']) uD[consoMinusA + 'u'] = consoVal + '+2369';
  if (!uD[consoMinusA + 'oo']) uD[consoMinusA + 'oo'] = consoVal + '+2370';
  if (!uD[consoMinusA + 'ri']) uD[consoMinusA + 'ri'] = consoVal + '+2371';
  if (!uD[consoMinusA + 'e']) uD[consoMinusA + 'e'] = consoVal + '+2375';
  if (!uD[consoMinusA + 'ai']) uD[consoMinusA + 'ai'] = consoVal + '+2376';
  if (!uD[consoMinusA + 'o']) uD[consoMinusA + 'o'] = consoVal + '+2379';
  if (!uD[consoMinusA + 'au']) uD[consoMinusA + 'au'] = consoVal + '+2380';
  if (!uD[consoMinusA]) uD[consoMinusA] = consoVal + '+2381';
}
cR = null;

function translateWords(sent) {
  if (sW['smartconverter_on'] == 'true')
    sent = sent.replace(/\s*\./g, ' .').replace(/\s*\?/g, ' ?');
  var words = sent.split(' ');
  var rVal = '';
  var subs;
  for (i = 0; i < words.length; i++) {
    words[i] = words[i].replace(
      /ri\^/g,
      'ari^',
    ); /*special 'tri's need 'a' injected: 'tari' */
    if (sW['smartconverter_on'] == 'true') {
      if (hasSW(words[i]));
      else if (iW[words[i]]) words[i] = iW[words[i]];
      else if (words[i].length > 3) {
        var ec_0, ec_1, ec_2, ec_3;
        ec_0 = words[i].charAt(words[i].length - 1).toLowerCase();
        ec_1 = words[i].charAt(words[i].length - 2).toLowerCase();
        ec_2 = words[i].charAt(words[i].length - 3).toLowerCase();
        ec_3 = words[i].charAt(words[i].length - 4).toLowerCase();
        if (
          (ec_0 == 'a' || ec_0 == 'e' || ec_0 == 'u') &&
          ec_1 == 'h' &&
          ec_2 == 'c'
        )
          /*cha->chha, chu->chhu*/ words[i] =
            words[i].substring(0, words[i].length - 3) + 'chh' + ec_0;
        else if (ec_0 == 'y')
          /*y->ee, ry=ree*/ words[i] =
            words[i].substring(0, words[i].length - 1) + 'ree';
        else if (ec_0 == 'a' && ec_1 == 'h' && ec_2 == 'h');
        else if (ec_0 == 'a' && ec_1 == 'n' && ec_2 == 'k');
        else if (ec_0 == 'a' && ec_1 == 'n' && ec_2 == 'h');
        else if (ec_0 == 'a' && ec_1 == 'n' && ec_2 == 'r');
        else if (ec_0 == 'a' && ec_1 == 'r' && ec_2 == 'd' && ec_3 == 'n');
        else if (ec_0 == 'a' && ec_1 == 'r' && ec_2 == 't' && ec_3 == 'n');
        else if (
          ec_0 == 'a' &&
          (ec_1 == 'm' ||
            (!isVowel(ec_1) && !isVowel(ec_3) && ec_1 != 'y' && ec_2 != 'e'))
        )
          /*ntra->nothing..swatantra*/
          words[i] += 'a';
        if (ec_0 == 'i' && !isVowel(ec_1))
          /*ending i->ee*/ words[i] =
            words[i].substring(0, words[i].length - 1) + 'ee';
      }
    }
    subs = words[i].split('/');
    for (j = 0; j < subs.length; j++)
      if (subs[j].length != 0) rVal += getAllUnicode(subs[j]);
    rVal += '';
  }
  return rVal;
}

function hasSW(s) {
  var sIndex;
  for (sIndex = s.length - 2; sIndex >= 0; sIndex--) {
    if (sW[s.substring(sIndex)]) return true;
  }
  return false;
}

function getUnicode(t, ll) {
  var u = '';
  var stopPos = 0;
  var ar = t.split('+');
  if (
    ll &&
    ar &&
    ar.length > 1 &&
    sW['smartconverter_on'] == 'true' &&
    ar[ar.length - 1] == '2381'
  )
    /* remove trailing short characther so that swagatam = swagatama */ stopPos = 1;
  if (ar)
    for (k = 0; k < ar.length - stopPos; k++) {
      if (ar[k].length > 0) {
        u += '#¬' + ar[k] + '#';
      }
    }
  return u;
}

function getAllUnicode(s) {
  var allUnicode = '';
  var u;
  var tryString = s;
  tryString = tryString
    .replace(/T/g, '^^t^^')
    .replace(/D/g, '^^d^^')
    .replace(/N/g, '^^n^^')
    .replace(/SH/g, '^^sh^^')
    .replace(/Sh/g, '^^sh^^');
  tryString = tryString.toLowerCase();
  tryString = tryString
    .replace(/\^\^t\^\^/g, 'T')
    .replace(/\^\^d\^\^/g, 'D')
    .replace(/\^\^n\^\^/g, 'N')
    .replace(/\^\^sh\^\^/g, 'Sh');
  var nextTryString = '';
  while (tryString.length > 0) {
    u = uD[tryString];
    if (u || tryString.length <= 1) {
      if (u)
        allUnicode += getUnicode(
          u,
          !(nextTryString.replace(/^\s+|\s+|\\$/, '').length > 0),
        );
      else allUnicode += tryString;
      tryString = nextTryString;
      nextTryString = '';
    } else {
      nextTryString = tryString.charAt(tryString.length - 1) + nextTryString;
      tryString = tryString.substring(0, tryString.length - 1);
    }
  }
  if (allUnicode.length == 0) return s;
  else return allUnicode;
}

function translate(input, smart) {
  var beginIndex = 0;
  var endIndex = -1;
  var engTokens = new Object();
  var token = '';
  var tokenCount = 1;
  var mask = '';
  while (beginIndex > -1 && endIndex < input.length - 1) {
    beginIndex = input.indexOf('{', endIndex + 1);
    if (beginIndex > -1) {
      endIndex = input.indexOf('}', beginIndex + 1);
      if (endIndex == -1) endIndex = input.length - 1;
      token = input.substring(beginIndex, endIndex + 1);
      mask = '$-' + tokenCount + '-$';
      engTokens[mask] = token.substring(1, token.length - 1);
      input = input.replace(token, mask);
      endIndex = endIndex - token.length + mask.length;
      tokenCount++;
    }
  }
  var nonSmartTokens = new Object();
  if (smart) {
    smartConverter(false);
    beginIndex = 0;
    endIndex = -1;
    token = '';
    mask = '';
    while (beginIndex > -1 && endIndex < input.length - 1) {
      beginIndex = input.indexOf('[', endIndex + 1);
      if (beginIndex > -1) {
        endIndex = input.indexOf(']', beginIndex + 1);
        if (endIndex == -1) endIndex = input.length - 1;
        token = input.substring(beginIndex, endIndex + 1);
        mask = '$-' + tokenCount + '-$';
        nonSmartTokens[mask] = translateWords(
          token.substring(1, token.length - 1),
        );
        input = input.replace(token, mask);
        endIndex = endIndex - token.length + mask.length;
        tokenCount++;
      }
    }
    smartConverter(true);
  }
  var unicode = translateWords(input);
  if (smart) {
    for (mask in nonSmartTokens) {
      unicode = unicode.replace(
        translateWords(mask).replace(' ', ''),
        nonSmartTokens[mask].replace(/\s$/, ''),
      );
    }
  }
  for (mask in engTokens) {
    unicode = unicode.replace(
      translateWords(mask).replace(' ', ''),
      engTokens[mask],
    );
  }

  return unicode;
}

function isVowel(c) {
  c = c.toLowerCase();
  if ((c && c == 'a') || c == 'e' || c == 'i' || c == 'o' || c == 'u')
    return true;
  return false;
}

function smartConverter(smartflag) {
  if (smartflag) {
    for (var specialWord in sW) uD[specialWord] = sW[specialWord];
    sW['smartconverter_on'] = 'true';
  } else {
    for (var specialWord in sW) if (uD[specialWord]) uD[specialWord] = null;
    sW['smartconverter_on'] = null;
  }
}

function convert(raw, smartConvert = true) {
  let charactersUnicode = translate(raw, smartConvert).split('#');
  let convertedCharacters = '';
  charactersUnicode.forEach(element => {
    if (element)
      convertedCharacters += String.fromCharCode(element.replace('¬', ''));
  });
  return convertedCharacters;
}
