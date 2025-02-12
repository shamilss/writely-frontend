# Writely

## Fullstack open-source blogging application made with MongoDB, Express, React & Node.js (MERN)

### Configuration and Setup

In order to run this project locally, simply fork and clone the repository or download it as a zip and unzip it on your machine.

1. Open the project in your preferred code editor.
2. Open a terminal window and split it into two sections (one for the frontend and one for the backend).

#### In the first terminal (Frontend):

```sh
$ cd writely-frontend
$ npm install  # Install frontend dependencies
$ npm start  # Start the frontend
```

#### In the second terminal (Backend):

1. Navigate to the backend folder:

```sh
$ cd writely-backend
```

2. Set environment variables in `config.env` under `./config`.
3. Create your MongoDB connection URL (`DATABASE`).

4. Install backend dependencies and start the server:

```sh
$ npm install  # Install backend dependencies
$ npm start  # Start the backend
```

### Key Features

- User registration and login
- Authentication using JWT Tokens
- Post searching and pagination
- CRUD operations (create, read, update, delete posts)
- Commenting on posts
- Responsive design

### Technologies Used

#### Frontend

- React.js – JavaScript library for building user interfaces
- react-router-dom – For handling routing
- axios – For making API calls
- CSS – For UI styling
- Tailwind CSS – Utility-first CSS framework for styling
- React Context – State management for React applications
- Material UI – React component library for UI design
- FontAwesome – Icon library for UI enhancements

#### Backend

- Node.js – A runtime environment for building fast server applications
- Express.js – Handles HTTP requests and routing
- Mongoose – Models and maps MongoDB data to JavaScript
- jsonwebtoken – Authentication with JWT
- Dotenv – Loads environment variables
- Multer – Middleware for file uploads
- CORS – Enables cross-origin resource sharing

#### Database

- MongoDB – A NoSQL database for storing blog data

### Author

- **GitHub:** [https://github.com/shamilss](https://github.com/shamilss)
- **LinkedIn:** [https://www.linkedin.com/in/shamilss](https://www.linkedin.com/in/shamilss)
- **Email:** [shamilss568@gmail.com](mailto:shamilss568@gmail.com)

### License

This project is licensed under the MIT License.

