let codeb = 0;

function c (l, t, e) {
  if (e === '[partial] ') {
    let partialName = l.replace(e, '').trim();
    return '{{> ' + partialName + '}}';
  }
  if (e === '[img] ') {
    // src | w | h
    let lineProperties = l.replace(e, '').split(/ +/g);
    console.log(lineProperties)
    let lineSrc = lineProperties.shift();
    
    return `<img src="${lineSrc}" ${lineProperties[0] ? 'width="' + lineProperties[0] + '"' : (lineProperties[1] ? lineProperties[1] : '')} ${lineProperties[0] && lineProperties[1] ? 'height="' + lineProperties[1] + '"' : ''}>`;
  }
  if (e === ' ') {
    return '<p>' + l.replace(/ +/g, '&nbsp;') + '</p>';
  }
  if (e === '') {
    return '<p>' + l.replace(/ +/g, '&nbsp;') + '</p>';
  }
  if (e === '---' || e === '+++') {
    codeb = codeb+1;
   l = l.replace(e, '');
    return e === '---' ? `</div>` : `<${t} onclick="copy(${codeb})" id="${codeb}">`;
  }
  if (e === '[bg] ') {
   l = l.replace(e, '');
   
    return `<input type="text" id="bg" style="display: none;" value="${l}">`;
  }
  if (e === '[font-color] ') {
   l = l.replace(e, '');
   
    return `<input type="text" id="font-color" style="display: none;" value="${l}">`;
  }
  let exp = new RegExp(e, 'g');
   l = l.replace(e, '');
  return `<${t}>${l}</${t}>`;
}

function parse (line) {
  let original = line;
  if (line.startsWith('# ')) {
    line = c(line, 'h1', '# ');
  }
  if (line.startsWith('## ')) {
    line = c(line, 'h2', '## ');
  }
  if (line.startsWith('### ')) {
    line = c(line, 'h3', '### ');
  }
  if (line.startsWith('#### ')) {
    line = c(line, 'h4', '#### ');
  }
  if (line.startsWith('##### ')) {
    line = c(line, 'h5', '##### ');
  }
  if (line.startsWith('###### ')) {
    line = c(line, 'h6', '###### ');
  }
  if (line === '+++') {
    line = c(line, 'div class="code-block"', '+++');
  }
  if (line === '---') {
    line = c(line, 'div', '---');
  }
  if (line.startsWith('> ')) {
    line = c(line, 'div class="mq p"', '> ');
  }
  if (line.startsWith('[bg] ')) {
    if (original === line) line = c(line, '', '[bg] ');
  }
  if (line.startsWith('[img] ')) {
    if (original === line) line = c(line, '[img] ', '[img] ');
  }
  if (line.startsWith('[partial] ')) {
    if (original === line) line = c(line, '[partial] ', '[partial] ');
  }
  if (line.startsWith('[font-color] ')) {
    if (original === line) line = c(line, '', '[font-color] ');
  }
  if (line.length < 1) {
    if (original === line) return '<br>';
  }
  if (line.startsWith(' ')) {
    if (original === line) line = c(line, '', ' ');
  }
  if (line.startsWith('')) {
    if (original === line) line = c(line, '', '');
  }
  
  return line;
};

export default parse;