# BookByte

BookByte is an innovative platform that allows users to search for books and digitize them into PDF format. The platform provides a seamless experience for finding books and getting them scanned professionally.

## Features

- Book search using Google Books API
- Professional book scanning service
- Multiple pricing plans
- User authentication
- Responsive design

## Tech Stack

- Frontend: React.js, Material-UI
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT

## Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/project-3.git
cd project-3
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

## Usage

1. Register for an account or log in
2. Search for books using the search bar
3. View book details and scanning cost
4. Choose a pricing plan
5. Place an order for scanning

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/) 