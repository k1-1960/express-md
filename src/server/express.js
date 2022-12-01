import express from 'express';
import expressmd from '../../lib/index.js';
import { engine } from 'express-handlebars';
const app = express();

app.set('views-md', 'src/views');
app.set('views', 'src/views/.c');
app.engine('.hbs', engine({
  extname: '.hbs'
}));
app.set('view engine', '.hbs');
expressmd(app);

app.get('*', (req, res) => {
  res.md('home');
});

app.listen(3030);

export default app;