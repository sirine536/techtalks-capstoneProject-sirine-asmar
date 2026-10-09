// //to understand very well with 

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

let cached = (global as any).mongoose || { conn: null, promise: null };

// export async function connectDB() {
//   if (cached.conn) return cached.conn;

//   if (!cached.promise) {
//     cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
//   }
//   cached.conn = await cached.promise;
//   (global as any).mongoose = cached;
//   return cached.conn;
// }

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000, // 10 ثواني بدل الافتراضي (30s+)
    }).then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  (global as any).mongoose = cached;
  return cached.conn;
}

// // import mongoose from "mongoose";

// // const MONGODB_URI = process.env.MONGODB_URI as string;

// // if (!MONGODB_URI) {
// //   throw new Error("Please define MONGODB_URI in .env.local");
// // }

// // export async function connectDB() {
// //   if (mongoose.connection.readyState >= 1) {
// //     return;
// //   }

// //   await mongoose.connect(MONGODB_URI);
// // }


// import mongoose from "mongoose";
// import dns from "dns";

// // Force Node to use reliable public DNS resolvers instead of the ISP's,
// // which intermittently fails SRV queries (querySrv ECONNREFUSED) even
// // though the OS-level resolver (Windows) succeeds. This is a known
// // Node.js c-ares resolver quirk with some ISPs.
// dns.setServers(["8.8.8.8", "1.1.1.1"]);

// const MONGODB_URI = process.env.MONGODB_URI as string;

// if (!MONGODB_URI) {
//   throw new Error("Please define MONGODB_URI in .env.local");
// }

// let cached = (global as any).mongoose || { conn: null, promise: null };

// export async function connectDB() {
//   if (cached.conn) return cached.conn;

//   if (!cached.promise) {
//     cached.promise = mongoose
//       .connect(MONGODB_URI, {
//         serverSelectionTimeoutMS: 10000,
//       })
//       .then((mongoose) => mongoose);
//   }
//   cached.conn = await cached.promise;
//   (global as any).mongoose = cached;
//   return cached.conn;
// }