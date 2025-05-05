const JWT_SECRET_KEY = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxy';

const SERVER_PORT = 8080;

const DATABASE_URI = 'mongodb+srv://harrisonwhetzel:mJcphochLLiJNgXd@foodorderappdb.xty4m.mongodb.net/?retryWrites=true&w=majority&appName=FoodOrderAppDb'

const TOKEN_EXPIRATION_DURATION = '7d';

module.exports = {
    JWT_SECRET_KEY,
    SERVER_PORT,
    DATABASE_URI,
    TOKEN_EXPIRATION_DURATION
}