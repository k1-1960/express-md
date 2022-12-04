# markdown-express
Plugin simple para crear sitios web usando markdown.

## Ejemplo
```js
import express from 'express';
import expressmd from 'markdown-express';
import { engine } from 'express-handlebars';
const app = express();

app.set('views-md', 'src/views'); // carpeta de archivos .md (debe ser creada.)
app.set('views', 'src/views-hbs'); // carpeta de archivos convertidos (se crea automáticamente.)

// configura el motor de renderizado.
app.engine('.hbs', engine({
  extname: '.hbs'
}));

// define el motor de renderizado.
app.set('view engine', '.hbs');

// configura markdown-express.
expressmd(app, {
  baseUrl: 'http://localhost:3030' // url base (si usas elementos estaticos servidos por el host actual.)
});

// Petición simple.
app.get('/', (req, res) => {
  res.status(200)
  .md('home', {  // Nombre de archivo en carpeta md.
    title: 'My page.' // Titulo de ls pagina
  });
});

app.listen(3030); // Encendiendo app.
```