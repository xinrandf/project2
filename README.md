

## Tech Stack
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT

## Installation

1.
cd project2
```

2. Install server dependencies
```bash
npm install
```

3. Install client dependencies
```bash
cd client
npm install
```

4. Create a .env file in the root directory and add:
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GOOGLE_BOOKS_API_KEY=your_google_books_api_key
```

5. Start MongoDB
```bash
mongod --dbpath ./data/db
```

6. Start the server (in the root directory)
```bash
npm start
```

7. Start the client (in the client directory)
```bash
cd client
npm start
```
