import express from 'express';
import expressmd from '../../lib/index.js';
import { engine } from 'express-handlebars';
const app = express();

app.set('views-md', 'src/views');
app.set('views', 'src/views-hbs');
app.use('/_static', express.static('src/_static'))
app.engine('.hbs', engine({
  extname: '.hbs'
}));
app.set('view engine', '.hbs');
expressmd(app, {
  baseUrl: 'http://localhost:3030'
});

app.get('*', (req, res) => {
  res.status(200)
  .md('home', {
    title: 'My page.'
  });
});

app.listen(3030);

export default app;