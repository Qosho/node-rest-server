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
    connectDB = 'mongodb://qosho-late:contrasena1@ds129823.mlab.com:29823/cafe';
}

process.env.URLDB = connectDB;