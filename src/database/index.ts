import mongoose from 'mongoose';

require('dotenv').config();

const databaseUri = process.env.DATABASE_URI!;

mongoose.connect(databaseUri);

const database = mongoose.connection;
database.on('error', console.error.bind(console, 'database connection error'));
// database.once('open', () => {
//   console.info('database connected');
// });

export const db = database;

export default {};
