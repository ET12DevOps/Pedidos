# Pedidos

## Creacion del proyecto

```sh
npm init -y
```

## Instalar dependencias del proyecto

```sh
npm install express morgan
```


## Instalar dependencias del proyecto para desarrollo

```sh
npm install -g nodemon
npm install -D nodemon dotenv
```

## Configuracion

En el archivo **package.json** configurar la seccion **scripts**
```json
"scripts": {
    "start": "node app.js"
  },
```

## Aplicación

- Crear el archivo **app.js**
- Importar las dependencias instaladas previamente: **express** y **morgan**
```js
const express = require('express')
var morgan = require('morgan')
```
- Configuracion de archivo **.env** permite leer variables de entorno
```js
require('dotenv').config()
const port = process.env.PORT || 3000
```
- Cracion de la aplicacion y configuracion de express y morgan
```js
const app = express()
app.use(express.json())
app.use(morgan('dev'))
```

- Creacion de endpoints
```js
app.get('/producto', (request, response) => {
    response.send(productos)
})

app.get('/producto/:id', (request, response) => {
    let producto = productos.find(x => x.productoId == request.params.id)
    response.send(producto)
})

app.post('/producto', (request, response) => {
    let producto = request.body;
    console.log(producto);
    productos.push(producto)
    response.send(productos)
})

app.delete('/producto/:id', (request, response) => {
    let idProducto = request.params.id
    let producto = productos.find(x => x.productoId == idProducto)
    console.log(producto)

    if (producto == null) {
        response.status(404).send("No se encuentra el producto")
        return
    }
    let indice = productos.indexOf(producto)
    productos.splice(indice, 1)
    response.send(productos)
})
```
- Indicar en que puerto va a escuchar la aplicacion
```js
app.listen(port)
```
- Ejecucion de la aplicacion para desarrollo con comando
```
nodemon
```
- Ejecucion de la aplicacion para produccion con comando
```
node app.js
```