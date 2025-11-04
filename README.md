# User Manager API

A RESTful API built with Node.js, Express, and MongoDB (using Mongoose) for managing users. This API allows you to create, read, update, and delete user records. The database connection is configurable via MongoDB Atlas or a local MongoDB instance.

---

## Project Structure

```
user-manager-api/
│
├── config/
│   └── .env          # Environment variables
│
├── models/
│   └── User.js       # Mongoose schema for users
│
├── server.js         # Express server and route definitions
├── package.json
├── package-lock.json
└── README.md
```

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/JeffKagiri/user-manager-api.git
cd user-manager-api
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the `config` folder with your MongoDB URI:

```env
MONGO_URI='your_mongodb_connection_string'
PORT=5000
```

---

## Running the Server

Start the server:

```bash
node server.js
```

* The server will run on the port specified in `.env` (default `5000`).
* You should see:

```
MongoDB connected
Server running on port 5000
```

---

## API Routes

| Method | Endpoint     | Description         |
| ------ | ------------ | ------------------- |
| GET    | `/users`     | Get all users       |
| POST   | `/users`     | Add a new user      |
| PUT    | `/users/:id` | Update a user by ID |
| DELETE | `/users/:id` | Delete a user by ID |

---

## Testing the API

* Use [Postman](https://www.postman.com/downloads/) to send requests to the API.
* Example JSON for POST or PUT:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30
}
```

---

## Notes

* `.env` and `node_modules` are excluded from version control via `.gitignore`.
* MongoDB Atlas or local MongoDB can be used for the database connection.
* Make sure to test all routes in Postman to confirm CRUD operations.

---

## Author

Jeff Kagiri
