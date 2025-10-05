import mongoose from "mongoose";


const MONGO_DB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/stockapp";

declare global {
   var mongooseCache: {
      conn: typeof mongoose | null;
      promise: Promise<typeof mongoose> | null;
   }
}

let cached = global.mongooseCache;

if(!cached) {
   cached = global.mongooseCache = { conn: null, promise: null };
}
export const connectToDatabase = async () : Promise<typeof mongoose> => {
   if(!MONGO_DB_URI) {
      throw new Error("Please define the MONGODB_URI environment variable inside .env");
   }

   if(cached.conn) return cached.conn;

   if(!cached.promise) {
      cached.promise = mongoose.connect(MONGO_DB_URI,{bufferCommands: false});
   }

   try {
      cached.conn = await cached.promise;
   }catch(err) {
      cached.promise = null;
      throw err;
   }

   console.log(`Connected to MongoDB ${process.env.NODE_ENV} database at ${MONGO_DB_URI}`);

   return cached.conn;
} 