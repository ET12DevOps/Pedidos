# Version 1

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
## Verificar funcionamiento de WebAPI 
- Para el testing de la WebAPI se usara la extension de Visual Studio Code **Thunder Client**, se debe instalarla
- La prueba consiste en seleccionar el icono de la extension en la barra de la izquierda y pulsar el boton **New Request** 
- Cuando aparece la ventana del request se debe configurar:
    - La URL del recurso a donde se quiere acceder, por ejemplo: 
    ```
    localhost:3000/producto
    ```
    - El metodo HTTP a utilizar puede ser un GET, POST, PUT o DELETE (son los que usaremos)
    - Si el metodo HTTP es un POST o PUT se debe configurar el **body** del request, en la parte inferior a la URL del request hay pestañas se debe seleccionar **body** y en la parte inferior se debe colocar el json correspondiente que se desea enviar a la aplicacion
    - Por ultimo pulsar el boton **Send** y analizar el resultado del request a la derecha de la pantalla

# Version 2

## Instalar babel.js

Instalar las siguientes dependencias
```
npm i -D @babel/cli @babel/core @babel/node @babel/preset-env
```

## Configuracion package.json

Agregar en archivo **package.json** en la seccion **script** comando **dev**
```json
"scripts": {
    "start": "node app.js",
    "dev": "nodemon ./ --exec babel-node"
  },
```

## Configuracion **app.js**

- Modificar la notacion de importacion de bibliotecas

```js
//importa dependencia de la biblioteca express
import express, { json } from 'express'

//crea la aplicacion 
const app = express()

//lee el body en formato json
app.use(json())
```

## Configuracion Babel

- Crear el archivo **.babelrc** con el contenido
```json
{
    "presets": [
        "@babel/preset-env"
    ]
}
```

## Ejecucion de proyecto 

Para ejecutar el proyecto de ahora en mas se debe usar el siguiente comando
```
npm run dev
```

# Version 3

- Crear el directorio **routes** en la raiz del proyecto
- Dentro del directorio **routes** crear el archivo **producto.routes.js** 
- Mover los endpoints del archivo **app.js** al archivo **producto.routes.js** 

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
- En el archivo **producto.routes.js** reemplazar **app** por **router** (notar que los endpoints ya no se aplican sobre **app** sino sobre **router**) y agregar el **export default router** al final del archivo
- En el archivo **app.js** importar el nuevo archivo **producto.router.js** 
```js
import productoRoutes from './routes/producto.routes'
```
y explicitar el uso de las **rutas** de los endpoints de productos
```js
app.use(productoRoutes)
```

# Version 4

- Crear el directorio **controllers** en la raiz del proyecto
- Dentro del directorio **controllers** crear el archivo **producto.controller.js** 
- Abstraer el comportamiento definido en el archivo **producto.routes.js** en un nuevo archivo **producto.controller.js** 
- El objetivo detras de esto es la separacion de responsabilidades del router. Anteriormente el router era responsable de aceptar las peticiones HTTP y procesarlas. Ahora el router unicamente será encargado de aceptar las peticiones HTTP y el procesamiento se delegará en el controller
- Desplazar el procesamiento del request HTTP a un nuevo método en el controller, y dicho método se debe llamar desde el router con la ruta correspondiente (ver cambios en los archivos **producto.routes.js** y **producto.controller.js**)