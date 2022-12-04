import {
  readFileSync,
  writeFileSync
} from 'node:fs';

import parse from './parse.js';

const expressmd = function(app, config) {
  let views = app.get('views-md');
  
  app.use((req, res, next) => {
    
    res.md = function(view, options) {
      
      let content = readFileSync(`${process.cwd()}${views.startsWith('/') ? views : '/' + views}${(view.startsWith('/') && !views.endsWith('/')) ? view : '/' + view}.md`, 'utf8');
      
      let html = [];
      let lines = content.split('\n');
      console.log(lines)
      lines.forEach((line) => {
        line = line;
        
        html.push(parse(line));
      });
      
      let hbsRoute = `${process.cwd()}${views.startsWith('/') ? views : '/' + views}/.c${(view.startsWith('/')) ? view : '/' + view}.hbs`;
      
      writeFileSync(hbsRoute, html.join('\n'), 'utf8');
      
      res.render(hbsRoute, {
        ...options,
        baseUrl: config.baseUrl || 'http://localhost:3000'
      });
    };
    
    next();
  });
};

export default expressmd;