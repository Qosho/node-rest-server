// =================== 
//  PUERTO
// ===================
process.env.PORT = process.env.PORT || 3000;

// =================== 
//  Entorno
// ===================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// =================== 
//  Entorno
// ===================
let connectDB;
if (process.env.NODE_ENV === 'dev') {
    connectDB = 'mongodb://localhost:27017/cafe';
} else {
    connectDB = process.env.MONGO_URI;
}

process.env.URLDB = connectDB;