import dns from "node:dns/promises";
dns.setServers(['8.8.8.8', '1.1.1.1']);

import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI);
    } catch (err) {
        console.error(err);
    }
}

export default connectDB;