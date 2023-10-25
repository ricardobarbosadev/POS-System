# API POS-Cubos

API developed as the final challenge of the Cubos Academy back-end software development course. It is a POS (Point of Sale) system.

## 📜 Summary

1. [Project details](https://github.com/ricardobarbosadev/POS-System#1--project-details)
2. [Deploy](https://github.com/ricardobarbosadev/POS-System#2--deploy)
3. [To run the project in a development environment](https://github.com/ricardobarbosadev/POS-System#3--to-run-the-project-in-a-development-environment)
4. [Documentation](https://github.com/ricardobarbosadev/POS-System#4--documentation)
5. [Technologies used](https://github.com/ricardobarbosadev/POS-System#5--technologies-used)
6. [Authors](https://github.com/ricardobarbosadev/POS-System#6--authors)

## 1. 🔍 Project details

The POS_Cubos API aims to control the sales of a fictitious store. It was carried out academically during the back-end software development course at Cubos Academy.

#### Scenario:

- The system allows user registration, with information validation;
- The system only allows user registration, login and category listing requests without authentication through JWT;
- With the user logged in, the system allows editing and detailing of user information, creation, editing, detailing and listing of customers, creation, editing, detailing, deletion and listing of products, creation and listing of orders;
- The system allows the inclusion of product images, which are stored in a cloud storage service;
- The system automatically decreases the quantity of items in stock according to the order placed;
- The system sends an email to the customer upon successful order placement;

## 2. ✅ Deploy

The API is running on the Cyclic server: [Deploy link](https://neyvelopers.cyclic.app/).

To use it, simply follow the documentation present in this content.

## 3. 🔌 To run the project in a development environment

1. Install the necessary dependencies to run the API (listed in package.json):

   ```
   npm install
   ```

2. The API uses PostgreSQL as a database running on an [ElephantSQL](https://www.elephantsql.com/) server. The API also makes use of a bucket on [BackBlaze](https://www.backblaze.com/) for storing images, as well as a service on [Brevo](https://www.brevo.com/pt /) for SMTP server.

3. Therefore, it is necessary to create the respective services for the API to consume and fill in the `.env` file using the `.env.example` example for the names of the environment variables.

4. Run the application and the system will automatically create the tables in the database, leaving them ready for use.

5. You will need a request testing tool like [Insomnia](https://insomnia.rest/), and you must follow the guidance in the documentation below to use the API.

6. You can run automated tests created with Jest:
   ```
   npm run test
   ```

## 4. 📖 Documentation

### Endpoints

**Login** - User authentication <br/>

<details>
<summary><b>POST login</b></summary>

Log in with a user using `email` and `password`. Returns a JWT token to be used in requests.

**Request**

| **Name** | **Mandatory**   | **Type** | **Description**   |
| :------- | :-------------- | :------- | :---------------- |
| email    | yes             | `string` | User email        |
| senha    | yes             | `string` | User password     |

> **_NOTE:_** No need to send JWT Token via Authorization Header

Requisition Example:

```json
{
  "email": "fulano@email.com",
  "senha": "password"
}
```

**Response**

Success

```json
{
  "type": "Bearer",
  "token": "abcdefghijklmno.abcdefghijklmnopqrstuvwxyz.abcdefghijklmnop"
}
```

`status: 200` <br /><br /> Common errors

```json
{
  "message": "Invalid email and/or password."
}
```

`status: 401`

</details>
<br/>

**User** - Creating a new user, editing a user, and drilling down on the user <br/>

<details>
<summary><b>POST usuario</b></summary>

Create a user to be able to use the API.

**Request**

| **Name** | **Mandatory**   | **Type** | **Description**  |
| :------- | :-------------- | :------- | :--------------- |
| nome     | yes             | `string` | User name        |
| email    | yes             | `string` | User email       |
| senha    | yes             | `string` | User password    |

> **NOTE:_** No need to send JWT Token via Authorization Header.

Request example:

```json
{
  "nome": "Fulano",
  "email": "fulano@email.com",
  "senha": "password"
}
```

**Response**

Success

```json
{
  "id": 1,
  "nome": "Fulano",
  "email": "fulano@email.com"
}
```

`status: 201` <br /><br /> Common errors

```json
{
  "message": "Email already exists."
}
```

`status: 400`

```json
{
  "message": "The password must be at least 6 characters"
}
```

`status: 400`

</details>

<details>
<summary><b>PUT usuario</b></summary>

Edit a user. Only name and email can be edited (or just one of the two).

**Request**

| **Name** | **Mandatory**   | **Type** | **Description**  |
| :------- | :-------------- | :------- | :--------------- |
| nome     | yes             | `string` | User name        |
| email    | yes             | `string` | User email       |
| password | yes             | `string` | User password    |

> **_NOTA:_** It is necessary to send JWT Token via Authorization Header.

Request example:

```json
{
  "nome": "Fulano Editado",
  "email": "fulano.editado@email.com",
  "senha": "password"
}
```

**Response**

Success <br/> `no body returned for response` <br/> `status: 204` <br/><br/> Common errors

```json
{
  "message": "Email already in use"
}
```

`status: 400`

</details>

<details>
<summary><b>GET usuario</b></summary>

Detail a user. The `id` is automatically sent with the token..

**Request**

`It is not necessary to send data in the request`

> **Note:_** It is necessary to send JWT Token via Authorization Header.

**Response**

Success

```json
{
  "id": 1,
  "nome": "Fulano",
  "email": "fulano@email.com"
}
```

`status: 200` <br /> Common Errors

```json
{
  "message": "User not found."
}
```

`status: 404`

</details>
<br/>

**Category** - List of product categories <br/>

<details>
<summary><b>GET categoria</b></summary>

List categories.

**Request**

`It is not necessary to send data in the request`

> **NOTE:_** It is not necessary to send JWT Token via Authorization Header.

**Response**

Success

```json
[
  {
    "id": 1,
    "descricao": "Informática"
  },
  {
    "id": 2,
    "descricao": "Celulares"
  },
  {
    "id": 3,
    "descricao": "Beleza e Perfumaria"
  }
]
```

`status: 200`

Success without return

```json
[]
```

`status: 200` <br/>

</details>
<br/>

**Customer** - Creating a new customer, editing a customer, listing customers and detailing a customer <br/>

<details>
<summary><b>POST cliente</b></summary>

Creating a customer.

**Request**

| **Name** | **Mandatory**   | **Type** | **Description**               |
| :------- | :-------------- | :------- | :---------------------------- |
| nome     | yes             | `string` | User name                     |
| email    | yes             | `string` | User Email                    |
| cpf      | yes             | `string` | User CPF                      |
| cep      | no              | `string` | User's adress  cep            |
| rua      | no              | `string` | User's adress  street         |
| numero   | no              | `string` | User's adress number          |
| bairro   | no              | `string` | User's adress neighborhood    |
| cidade   | no              | `string` | User's adress city            |
| estado   | no              | `string` | User's adress state           |

> **NOTE:_** It is necessary to send JWT Token via Authorization Header.

Request example:

```json
{
  "nome": "Ciclano",
  "email": "ciclano@gmail.com",
  "cpf": "12345678911",
  "cep": "12345678",
  "rua": "Rua 1",
  "numero": "11-A",
  "bairro": "Bairro 1",
  "cidade": "Cidade 1",
  "estado": "Estado 1"
}
```

**Response**

Sucesso

```json
{
  "id": 3,
  "nome": "Ciclano",
  "email": "ciclano@gmail.com",
  "cpf": "12345678911",
  "cep": "12345678",
  "rua": "Rua 1",
  "numero": "11-A",
  "bairro": "Bairro 1",
  "cidade": "Cidade 1",
  "estado": "Estado 1"
}
```

`status: 201` <br /><br /> Common Errors

```json
{
  "message": "Client already exists."
}
```

`status: 400`

</details>

<details>
<summary><b>GET cliente</b></summary>

Listar clientes.

**Request**

`It is not necessary to send data in the request`

> **_NOTA:_** It is necessary to send JWT Token via Authorization Header.

**Response**

Success

```json
[
  {
    "id": 1,
    "nome": "Beltrano",
    "email": "beltrano@email.com",
    "cpf": "12345678910",
    "cep": null,
    "rua": null,
    "numero": null,
    "bairro": null,
    "cidade": null,
    "estado": null
  },
  {
    "id": 2,
    "nome": "Ciclano",
    "email": "ciclano@gmail.com",
    "cpf": "12345678911",
    "cep": "12345678",
    "rua": "Rua 1",
    "numero": "11-A",
    "bairro": "Bairro 1",
    "cidade": "Cidade 1",
    "estado": "Estado 1"
  }
]
```

`status: 200`

Success without return

```json
[]
```

`status: 200` <br/>

</details>

<details>
<summary><b>GET cliente-id</b></summary>

Detail a customer. The `id` must be sent in the url.

**Request**

| **Name** | **Mandatory**   | **Type** | **Description**                  |
| :------- | :-------------- | :------- | :------------------------------- |
| id       | yes             | `number` | **Send via route parameter** |

> **_NOTE:_** It is necessary to send JWT Token via Authorization Header.

**Response**

Success

```json
{
  "id": 2,
  "nome": "Ciclano",
  "email": "ciclano@gmail.com",
  "cpf": "12345678911",
  "cep": "12345678",
  "rua": "Rua 1",
  "numero": "11-A",
  "bairro": "Bairro 1",
  "cidade": "Cidade 1",
  "estado": "Estado 1"
}
```

`status: 200`

Common Errors

```json
{
  "message": "Client not found."
}
```

`status: 404`

</details>

<details>
<summary><b>PUT cliente-id</b></summary>

Change customer data. The `id` must be sent in the url.

**Request**

| **Name** | **Mandatory**   | **Type** | **Description**                  |
| :------- | :-------------- | :------- | :------------------------------- |
| id       | yes             | `number` | **Send via route parameter** |
| nome     | yes             | `string` | User name                        |
| email    | yes             | `string` | Email do User                    |
| cpf      | yes             | `string` | User CPF                         |
| cep      | no              | `string` | User's adress  cep               |
| rua      | no              | `string` | User's adress  street            |
| numero   | no              | `string` | User's adress number             |
| bairro   | no              | `string` | User's adress neighborhood       |
| cidade   | no              | `string` | User's adress city               |
| estado   | no              | `string` | User's adress state              |

> **_NOTA:_** It is necessary to send JWT Token via Authorization Header.

Request example:

```json
{
  "nome": "Ciclano Editado",
  "email": "ciclano.editado@gmail.com",
  "cpf": "12345678911",
  "cep": "12345678",
  "rua": "Rua 1",
  "numero": "11-A",
  "bairro": "Bairro 1",
  "cidade": "Cidade 1",
  "estado": "Estado 1"
}
```

**Response**

Sucesso <br/> `no body returned for response` <br/> `status: 204` <br/><br/>

Common Errors

```json
{
  "message": "Client not found."
}
```

`status: 404`

```json
{
  "message": "Email already exists."
}
```

`status: 400`

```json
{
  "message": "CPF already exists."
}
```

`status: 400`

</details>
<br/>

**Product** - Creating a new product, editing a product, listing products, deleting a product and detailing a product <br/>

<details>
<summary><b>POST produto</b></summary>

Criar um produto.

**Request**

| **Name**           | **Mandatory**   | **Type** | **Description**                |
| :----------------- | :-------------- | :------- | :----------------------------- |
| descricao          | yes             | `string` | Product Description            |
| quantidade_estoque | yes             | `number` | Quantity of items in stock     |
| valor              | yes             | `number` | Product value (in cents)       |
| categoria_id       | yes             | `number` | Product category id            |
| produto_imagem     | no              | `file`   | Product image file             |

> **_NOTE:_** It is necessary to send JWT Token via Authorization Header.

**Response**

Success

```json
{
  "id": 1,
  "descricao": "Teclado",
  "quantidade_estoque": 50,
  "valor": 10000,
  "categoria_id": 1,
  "produto_imagem": "url_da_imagem"
}
```

`status: 201` <br /><br /> Common Errors

```json
{
  "message": "Category not found."
}
```

`status: 404`

```json
{
  "message": "Description already exists."
}
```

`status: 400`

</details>

<details>
<summary><b>GET produto</b></summary>

List products. A query parameter `categoria_id` can be passed to list only products from a specific category..

**Request**

| **Name**     | **Mandatory**   | **Type** | **Description**                           |
| :----------- | :-------------- | :------- | :---------------------------------------- |
| categoria_id | no              | `number` | **Send via query parameter in the route** |

> **_NOTE:_** It is necessary to send JWT Token via Authorization Header.

Request example:

`url/produto?categoria_id=1`

**Response**

Success

```json
[
  {
    "id": 1,
    "descricao": "Teclado X",
    "quantidade_estoque": 25,
    "valor": 10000,
    "categoria_id": 1,
    "produto_imagem": "url/Teclado_X/teclado_x.png"
  },
  {
    "id": 2,
    "descricao": "Teclado Y",
    "quantidade_estoque": 48,
    "valor": 20000,
    "categoria_id": 1,
    "produto_imagem": "url/Teclado_Y/teclado_y.png"
  }
]
```

`status: 200`

Success without return

```json
[]
```

`status: 200` <br/>

</details>

<details>
<summary><b>GET produto-id</b></summary>

Detail a product. The `id` must be sent in the url.

**Request**

| **Nome** | **Mandatory**   | **Type** | **Description**                    |
| :------- | :-------------- | :------- | :------------------------------- |
| id       | yes             | `number` | **Send via route parameter** |

> **_NOTE:_** It is necessary to send JWT Token via Authorization Header.

**Response**

Success

```json
{
  "id": 1,
  "descricao": "Teclado X",
  "quantidade_estoque": 25,
  "valor": 10000,
  "categoria_id": 1
}
```

`status: 200`

Common Errors

```json
{
  "message": "Product not found."
}
```

`status: 404`

</details>

<details>
<summary><b>PUT produto-id</b></summary>

Change product data. The `id` must be sent in the url.

**Request**

| **Name**           | **Mandatory**   | **Type** | **Description**                  |
| :----------------- | :-------------- | :------- | :------------------------------- |
| id                 | yes             | `number` | **Send via route parameter**     |
| descricao          | yes             | `string` | Product Description              |
| quantidade_estoque | yes             | `number` | Quantity of items in stock       |
| valor              | yes             | `number` | Product value (in cents)         |
| categoria_id       | yes             | `number` | Product category id              |
| produto_imagem     | no              | `file`   | Product image file               |

> **_NOTE:_** It is necessary to send JWT Token via Authorization Header.

**Response**

Sucesso <br/> `no body returned for response` <br/> `status: 204` <br/><br/>

Common Errors

```json
{
  "message": "Product not found."
}
```

`status: 404`

```json
{
  "message": "Category not found."
}
```

`status: 404`

```json
{
  "message": "Description already exists."
}
```

`status: 400`

</details>

<details>
<summary><b>DELETE produto-id</b></summary>

Delete a product. The `id` must be sent in the url.

**Request**

| **Name** | **Mandatory**   | **Type** | **Description**                  |
| :------- | :-------------- | :------- | :------------------------------- |
| id       | yes             | `number` | **Send via route parameter**     |

> **_NOTE:_** It is necessary to send JWT Token via Authorization Header.

**Response**

Success
`no body returned for response` <br/> `status: 204` <br/>

Common Errors

```json
{
  "message": "Product not found."
}
```

`status: 404`

```json
{
  "message": "This product is linked to an order."
}
```

`status: 400`

</details>
<br/>

**Order** - Creating a new order and order listing <br/>

<details>
<summary><b>POST pedido</b></summary>

Create a order.

**Request**

| **Name**           | **Mandatory**   | **Type** | **Description**                           |
| :----------------- | :-------------- | :------- | :---------------------------------------- |
| cliente_id         | yes             | `number` | Customer ID                               |
| observacao         | no              | `string` | Note for order                            |
| pedido_produtos    | yes             | `array`  | Array with products related to the order  |
| produto_id         | yes             | `number` | Product ID                                |
| quantidade_produto | yes             | `number` | Quantity of product items                 |

> **_NOTA:_** It is necessary to send JWT Token via Authorization Header.

Request example:

```json
{
  "cliente_id": 1,
  "observacao": "Em caso de ausência recomendo deixar com algum vizinho",
  "pedido_produtos": [
    {
      "produto_id": 1,
      "quantidade_produto": 10
    },
    {
      "produto_id": 2,
      "quantidade_produto": 20
    }
  ]
}
```

**Response**

Success

```json
{
  "pedido": {
    "id": 1,
    "cliente_id": 1,
    "observacao": "Em caso de ausência recomendo deixar com algum vizinho",
    "valor_total": 100000
  },
  "pedido_produtos": [
    {
      "id": 1,
      "pedido_id": 1,
      "produto_id": 1,
      "quantidade_produto": 10,
      "valor_produto": 5000
    },
    {
      "id": 2,
      "pedido_id": 1,
      "produto_id": 2,
      "quantidade_produto": 20,
      "valor_produto": 2500
    }
  ]
}
```

`status: 201` <br /><br /> Common Errors

```json
{
  "message": "Client not found."
}
```

`status: 404`

```json
{
  "message": "Product not found."
}
```

`status: 404`

```json
{
  "message": "Insufficient stock."
}
```

`status: 400`

</details>

<details>
<summary><b>GET pedido</b></summary>

List orders. A query parameter `cliente_id` can be passed to list only orders from a specific client.

**Request**

| **Name**   | **Mandatory**   | **Type** | **Description**                           |
| :--------- | :-------------- | :------- | :---------------------------------------- |
| cliente_id | no              | `number` | **Send via query parameter in the route** |

> **_NOTA:_** It is necessary to send JWT Token via Authorization Header.

Request example:

`url/pedido?cliente_id=1`

**Response**

Success

```json
[
  {
    "pedido": {
      "id": 1,
      "cliente_id": 1,
      "observacao": "Em caso de ausência recomendo deixar com algum vizinho",
      "valor_total": 100000
    },
    "pedido_produtos": [
      {
        "id": 1,
        "pedido_id": 1,
        "produto_id": 1,
        "quantidade_produto": 10,
        "valor_produto": 5000
      },
      {
        "id": 2,
        "pedido_id": 1,
        "produto_id": 2,
        "quantidade_produto": 20,
        "valor_produto": 2500
      }
    ]
  },
  {
    "pedido": {
      "id": 2,
      "cliente_id": 1,
      "observacao": "Em caso de ausência recomendo deixar com algum vizinho",
      "valor_total": 10000
    },
    "pedido_produtos": [
      {
        "id": 3,
        "pedido_id": 2,
        "produto_id": 1,
        "quantidade_produto": 1,
        "valor_produto": 5000
      },
      {
        "id": 4,
        "pedido_id": 2,
        "produto_id": 2,
        "quantidade_produto": 2,
        "valor_produto": 2500
      }
    ]
  }
]
```

`status: 200`

Success without return

```json
[]
```

`status: 200` <br/>

</details>

## 5. 💻 Technologies used

Languages, Frameworks & Librarys:
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E) ![Node](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) ![JSON](https://img.shields.io/badge/json-5E5C5C?style=for-the-badge&logo=json&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white) ![NPM](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white) ![ESLint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E) ![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD) ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)

Organization:
![Trello](https://img.shields.io/badge/Trello-0052CC?style=for-the-badge&logo=trello&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

Tests:
![Insomnia](https://img.shields.io/badge/Insomnia-5849be?style=for-the-badge&logo=Insomnia&logoColor=white) ![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)

Database:
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

IDE:
![VSCode](https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)

## 6. 👨‍💻 Authors

Created by [Daniel M. Justo](https://www.linkedin.com/in/danielmjusto/), [Matheus O. da Silva](https://www.linkedin.com/in/matheusdevbackend/), [Ney H. M. Ribeiro](https://www.linkedin.com/in/neyhiwerson/), [Raimundo F. da Silva Neto](https://www.linkedin.com/in/raimundo-ferreira-silva-neto/), [Ricardo J. S. Barbosa](https://www.linkedin.com/in/ricardo-santos-barbosa1/).

Thanks for the visit!
