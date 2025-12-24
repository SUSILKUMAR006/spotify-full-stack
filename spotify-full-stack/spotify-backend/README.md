# Spotify Backend

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
MONGODB_URI=mongodb://localhost:27017
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
```

3. Make sure MongoDB is running locally or update the MONGODB_URI to point to your MongoDB instance.

4. Set up Cloudinary:
   - Sign up at https://cloudinary.com/
   - Get your cloud name, API key, and secret key
   - Update the .env file with your Cloudinary credentials

5. Start the server:
```bash
npm start
```

The server will run on http://localhost:4000 