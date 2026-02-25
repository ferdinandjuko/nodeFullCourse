import dns from "node:dns/promises";
dns.setServers(['8.8.8.8', '1.1.1.1']);

import mongoose from 'mongoose';

export default connectDB;