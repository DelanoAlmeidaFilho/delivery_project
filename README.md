nodejs application that performs inventory control and manages online orders

## entity relationship diagram:

```mermaid
erDiagram
    CATEGORIES ||--o{ PRODUCTS : ""
    PRODUCTS ||--o{ ORDER_PRODUCT : ""
    ORDERS ||--o{ ORDER_PRODUCT : ""
    PAYMENT_METHODS ||--o{ ORDERS: ""
    USERS }o--o{ ROLES : ""
    USERS ||--o{ USER_TOKENS : ""
    ADDRESS ||--|| USERS : ""
    PRODUCT_ENTRY}o--|| PRODUCTS : ""
    USERS ||--o{ ORDERS : ""
    PRODUCTS }o--o| SUPPLIERS : ""
```

## Executing the Project

To run the project, use the following command:

```javascript

    npm run dev
```

## dependencies

-   [express](https://www.npmjs.com/package/express)
-   [Prisma](https://www.prisma.io/)
-   [JWT](https://jwt.io)
-   [BCrypt](https://www.npmjs.com/package/bcrypt)
-   [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken)
-   [tsyringe](https://www.npmjs.com/package/tsyringe)
-   [celebrate](https://www.npmjs.com/package/celebrate)
-   [cors](https://www.npmjs.com/package/cors)
-   [dayjs](https://www.npmjs.com/package/dayjs)
-   [dotenv](https://www.npmjs.com/package/dotenv)
-   [handlebars](https://www.npmjs.com/package/handlebars)
-   [nodemailer](https://www.npmjs.com/package/nodemailer)

<h3 align="center">Desenvolvido por  Delano Almeida filho </h3>
