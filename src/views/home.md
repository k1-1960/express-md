[bg] #000

# express-markdown
> Convert md files to html text.
install:
> $ npm i express-markdown

## How to use.
example of an index.
+++
import express from 'express';
import expressmd from 'express-markdown';

const app = express();
expressmd(app);

app.get('/', (req, res) => {
  res.md('my-md-file', {
    title: 'My new page'
  });
});

app.listen(3030);
---