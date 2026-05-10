import mongoose from "mongoose";
import { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
	throw new Error("MONGODB_URI is not defined");
}

declare global {
	var mongoose: {
		conn: Mongoose | null;
		promise: Promise<Mongoose> | null;
	};
}

let cached = global.mongoose;

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null };
}

export const connectDB = async () => {
	if (cached.conn) return cached.conn;

	if (!cached.promise) {
		const opts = {
			bufferCommands: false, // Prevents hanging if connection fails
		};

		cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
			return mongoose;
		});
	}

	try {
		cached.conn = await cached.promise;
	} catch (e) {
		cached.promise = null;
		throw e;
	}

	return cached.conn;
};
