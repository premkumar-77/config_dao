# config_dao

`config_dao` is a lightweight Node.js utility package that loads all global platform configurations from your MySQL database using Sequelize ORM. It manages the database connection internally and provides a simple API to fetch configuration data.

---

## 📦 Installation

Install the package using npm:

```bash
npm install config_dao
```

---

## 🚀 Quick Start

```js
const { connect } = require('config_dao');

(async () => {
  const dbConfig = {
    host: 'localhost',
    username: 'your_db_user',
    password: 'your_db_password',
    database: 'your_db_name',
    dialect: 'mysql'
  };

  // Initialize connection
  const configClient = await connect(dbConfig);

  // Fetch all configuration entries
  const configs = await configClient.getAllConfigs();
  console.log(configs);
})();
```

---

## 🛠️ Public API

### 🔹 `connect(config)`

Establishes a connection to the MySQL database using Sequelize and returns an API client for fetching configuration data.

#### Parameters:

| Name      | Type   | Description                          |
|-----------|--------|--------------------------------------|
| config    | Object | Sequelize-compatible DB config object |

Required keys in the `config` object:
- `host` *(string)* – Database host (e.g., `'localhost'`)
- `username` *(string)* – DB user
- `password` *(string)* – DB password
- `database` *(string)* – Database name
- `dialect` *(string)* – Must be `'mysql'`

#### Returns:

- `Promise<Object>` – A client object with method(s) to interact with configuration data.

---

### 🔹 `getAllConfigs()`

Fetches all platform-wide configurations from the database.

#### Usage:

```js
const configs = await configClient.getAllConfigs();
```

#### Returns:

- `Promise<Array<Object>>` – An array of configuration objects fetched from the DB.

---

## ✅ Features

- ✅ Easy integration into any Node.js project
- ✅ Internal management of Sequelize connection
- ✅ One method to fetch all platform-level configurations
- ✅ Clean, reusable design suitable for microservices

---

## 📝 License

MIT License  
Use it freely in personal and commercial projects.
