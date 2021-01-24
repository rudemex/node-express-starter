# Starter - Node Express

 ![Node.js website](https://img.shields.io/static/v1.svg?label=Node&message=v10.15.3&labelColor=339933&color=757575&logoColor=FFFFFF&logo=node.js) ![Npm website](https://img.shields.io/static/v1.svg?label=Npm&message=v6.4.1&labelColor=CB3837&logoColor=FFFFFF&color=757575&logo=npm) ![ExpressJS website](https://img.shields.io/static/v1.svg?label=Express&message=v4.17.1&labelColor=444&logoColor=FFFFFF&color=757575&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAMFBMVEX////q6uqgoaEZGhtzc3SSk5Ourq5hYmLHx8f09PVOTk+7u7vf39+DhITT09M3ODgiPZ4kAAAAuUlEQVR42u2RyxbDIAhE0fEVjfL/fxu0YNJFF123d0E4iEMY6c83OA/BO0kDohYTstupUoiOikaTEzjv8+5EpgODaKAeJGQk02ekLbpikBglKh7d0o6x7jZqU0epe5aU05LkUTH2BqhknAivPsA/ik8yTYJ8PzSw/jYGGc66bzLeJJhvNZ90z4hIRkeyNKCZU2aoUMBuG7W8LqRtSgT8oVbra+kgI9gKxey2xzBKn8dTprDOW4YW+hUuT8sFbvZNU3wAAAAASUVORK5CYII=) ![GitHub](https://img.shields.io/github/license/rudemex/node-express-starter) ![GitHub Workflow Status](https://github.com/rudemex/node-express-starter/workflows/CI/CD/badge.svg?branch=master) ![Codecov](https://img.shields.io/codecov/c/github/rudemex/node-express-starter)  


**Repositorio:** [https://github.com/rudemex/node-express-starter](https://github.com/rudemex/node-express-starter)

### 📝 Requerimientos básicos

* Node.js v10.15.3 or higher \([Download](https://nodejs.org/es/download/)\)
* NPM v6.4.1 or higher
* [Mock Json Server](https://www.npmjs.com/package/mock-json-server)

### 🛠 Instalar dependencias

Cuando tenemos los requisitos básicos, clonamos el repositorio, vamos a la carpeta del proyecto e instalamos sus dependencias.

```text
 npm install
```

## ⚙️ Configuración

Esta aplicación utiliza la dependencia de [config](https://www.npmjs.com/package/config) para facilitar la configuración de las variables del entorno, lo que la hace escalable y robusta al desplegar la aplicación en diferentes entornos.

En el directorio `./config` se encuentra un archivo llamado `development.json` que contiene la configuración para un entorno local, mientras que el archivo `custom-environment-variables.json` obtiene los valores por medio de los `key` definidos en las variables de entorno que se configuran en el el servidor.

Básicamente el archivo funciona como un objeto que se exporta y puede ser consumido invocándolo en el archivo que requiere utilizar la información cargada. Si se necesita añadir más datos para consumir, como la conexión a una base de datos, a una redis, la url de algún micro-servicio, API, etc. sólo hay que añadirlo en los archivos mencionados manteniendo el esquema.

```text
{
  "server": {
    "port": 8080,
    "context": "/api",
    "origins": "http://localhost:3000,http://localhost:3001,http://localhost:8080",
    "originsReadOnly": "http://localhost:3001",
    "headersAllowed": "Content-Type,Authorization,Set-Cookie,Access-Control-Allow-Origin,Cache-Control,Pragma",
    "methodsAllowed": "GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS",
    "corsCredentials": "false",
    "corsEnabled": "true",
    "tz": "America/Argentina/Buenos_Aires",
    "showLogInterceptor": "false",
    "enabledLogs": "true"
  },
  "swagger": {
    "enabled": "true"
  },
  "params": {
  },
  "services": {
  }
}
```

🤓 Ver todas las propiedades de configuración disponibles en detalle.

**Server**

`port`: Es el puerto por el cual va a correr el servidor.

* Type: `Number`
* Default: `8080`

`context`: Es el contexto el que se puede acceder a la API del servidor, de esta manera no se exponen los endpoints en la ruta principal de la aplicación.

* Type: `String`
* Default: `/api`

`origins`: Es una whitelist para que la aplicación sólo pueda ser consumida por urls confiables y evitar cualquier tipo de solicitudes no deseadas y maliciosas. Debes escribir las urls separadas por una coma.

* Type: `String`
* Default: `http://localhost:3000,http://localhost:3001,http://localhost:8080`

`originsReadOnly`: Es la configuración de las urls para **CORS**, lo que permite validar quién puede consumir el servidor.

* Type: `String`
* Default: `http://localhost:3001`

`headersAllowed`: Parámetros que va a recibir por el header en los request.

* Type: `String`
* Default: `Content-Type,Authorization,Set-Cookie,Access-Control-Allow-Origin,Cache-Control,Pragma`

`methodsAllowed`: Métodos http disponibles para el cors

* Type: `String`
* Default: `GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS`

`corsCredentials`: Habilita o deshabilita el uso de las credenciales en las peticiones CORS en el servidor.

* Type: `Boolean`
* Default: `false`

`corsEnabled`: Habilita o deshabilita el uso de CORS en el servidor.

* Type: `Boolean`
* Default: `false`

`tz`: Es la configuración de la zona horaria para el servidor. [Lista de zonas horarias](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List)

* Type: `String`
* Default: `America/Argentina/Buenos_Aires`

`showLogInterceptor`: Habilita o deshabilita la visualización de los interceptors de los requests y responses por medio de logs.

* Type: `Boolean`
* Default: `false`

`enabledLogs`: Habilita o deshabilita los logs de la aplicación.

* Type: `Boolean`
* Default: `true`

**Swagger**

`enabled`: Habilitar o deshabilitar la documentación **Swagger** de los endpoints del servidor.

* Type: `Boolean`
* Default: `true`

**Params**

Configuración de parámetros a utilizar en la aplicación, manteniendo el esquema `key:value`.

```text
{
  ...
  "params": {
    "my-param": "<param-value>"
  },
  ...
}
```

**Services**

Es donde se va a colocar las urls de los micro-servicios a consumir, manteniendo el esquema `key:value`.

```text
{
  ...
  "services": {
    "my-microservice": "<url-my-microservice>"
  },
  ...
}
```

## 💻 Scripts

### Local o Desarrollo

Inicia la aplicación en modo desarrollo usando `nodemon` y `node` para hacer hot reloading.

```text
npm run dev
```

### Server Mock

Ejecuta la aplicación mockeada.

```text
npm run mock
```

### Producción

Inicia la aplicación en modo producción.

```text
npm run start
```

## 📚 Swagger

El proyecto cuenta con un **Swagger** que tiene documentado los endpoints con sus definiciones.

Para documentar los nuevos endpoints, se debe completar con la información de los mismos con la anotación en **YAML** en el archivo `api-swagger.yaml` que está en el root del proyecto.

Esta documentación puede ser activada o desactivada desde el archivo de configuración o en las variables de entorno del proyecto.

```text
// ./config/development.json
{
  ...
  "swagger": {
    "enabled": "true"
  },
  ...
}
```

```javascript
// ENV
SWAGGER_ENABLED=true;
```

### URL

Acceso a la documentación y testeo de los endpoints: `http://localhost:8080/api-docs`

### Scheme

```text
<http|https>://<server_url><:port>/api-docs
```

## 📤 Commits

Para los mensajes de commits se toma como referencia [`conventional commits`](https://www.conventionalcommits.org/en/v1.0.0-beta.4/#summary).

```text
<type>[optional scope]: <description>

[optional body]

[optional footer]
```

* **type:** chore, docs, feat, fix, refactor \(más comunes\)
* **scope:** indica la página, componente, funcionalidad
* **description:** comienza en minúsculas y no debe superar los 72 caracteres.

## 😝 Mocks

Para generar el **Mock** del endpoint, hay que generar un archivo **javascript** dentro del directorio `./mock/api` correspondiente al endpoint.

El archivo del **mock** es un objeto `json` exportado como modulo, el cual tiene que tener la definición de la ruta, el método, el parámetro \(en caso de que sea necesario\), y la respuesta.

```javascript
// ./mock/api/posts.js

module.exports = {
    '/api/posts': {
        get: [
            {
                userId: 1,
                id: 1,
                title:
                    'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
                body:
                    'quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto',
            },
            ...{
                userId: 1,
                id: 2,
                title: 'qui est esse',
                body:
                    'est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla',
            },
        ],
        post: {
            userId: 1,
            id: 1,
            title:
                'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
            body:
                'quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto',
        },
    },
    '/api/posts/:id': {
        get: {
            userId: 1,
            id: 1,
            title: 'eum et est occaecati',
            body:
                'ullam et saepe reiciendis voluptatem adipisci sit amet autem assumenda provident rerum culpa quis hic commodi nesciunt rem tenetur doloremque ipsam iure quis sunt voluptatem rerum illo velit',
        },
    },
};
```

Una vez generado el archivo con la definición del endpoint junto a su respuesta, hay que requerirlo en el archivo `routes.js` que se encuentra en `./mock/api`.

```javascript
// ./mock/api/routes.js

const routes = {
    ...require('./posts'),
    ...
    ...require('./another-end-point'),
};

module.exports = routes;
```

Made with ❤

