import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.join(__dirname, '.env');

// Check if .env file exists
if (!fs.existsSync(envPath)) {
    console.log('Creating .env file...');
    
    const envContent = `# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017

# Cloudinary Configuration
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key

# Server Configuration
PORT=4000
`;
    
    fs.writeFileSync(envPath, envContent);
    console.log('✅ .env file created successfully!');
    console.log('⚠️  Please update the .env file with your actual Cloudinary credentials');
    console.log('📝 You can get Cloudinary credentials from: https://cloudinary.com/');
} else {
    console.log('✅ .env file already exists');
}

console.log('\n📋 Setup Instructions:');
console.log('1. Make sure MongoDB is running on your system');
console.log('2. Update the .env file with your Cloudinary credentials');
console.log('3. Run: npm start');
console.log('4. The server will be available at: http://localhost:4000'); 