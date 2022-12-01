function c (l, t, e) {
  if (e === '---' || e === '+++') {
   l = l.replace(e, '');
    return e === '---' ? `</div>` : `<${t}>`;
  }
  let exp = new RegExp(e, 'g');
   l = l.replace(e, '');
  l = l.trim();
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
  if (line.startsWith('')) {
    if (original === line) line = c(line, 'p', '');
  }
  
  return line;
};

export default parse;