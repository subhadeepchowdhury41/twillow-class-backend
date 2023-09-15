import mongoose from "mongoose";

import config from "config";

export const connectToDB = async () => {
  const dbUri = config.get("dbUri") as string;
  await mongoose.connect(dbUri).then(() => {
    console.log("Connected to database successfully ✅ ✅ ✅");
  }).catch((err) => {
    console.error("Error connecting to database ❌ ❌ ❌", err);
  });
}