import mongoose from "mongoose";
import { get as getCfg } from "queued-web-service/config/index.mjs";

export async function initMongoose() {
  const cfg = getCfg().mongodb;

  await mongoose.connect(`mongodb://${cfg.host}:${cfg.port}`, {
    dbName: cfg.dbName,
    directConnection: cfg.directConnection,
  });
  console.log(`Mongoose connected to ${cfg.host}:${cfg.port}/${cfg.dbName}`);
}

export async function closeMongoose() {
  await mongoose.connection.close();
}
