import mongoose, {
  Schema,
  model,
  connection,
  Model,
  Types,
  Document,
} from "mongoose";
import connectMongoose from "./connect";
import dotenv from "dotenv";
import UserCollection from "./interface/UserSchema";
import LobbyCollection from "./interface/LobbySchema";
import MessageCollection from "./interface/MessageSchema";
import { generateInitialMessage, initialUsers } from "./initialData";

dotenv.config();

/**
 * Main goal of this function is to reset the database. thi program will delete
 * existing schemas that will affect the  program. After deleting the schemas,
 * the program will generate the schemas again, then it will add data to those schema.
 *
 */

run().catch((err) => console.log(err));

async function run() {
  await connectMongoose();
  await dropCollections();
  await UserCollection.insertMany(initialUsers);
  const userOne = await UserCollection.findOne({ username: "Foo Bar" }); // todo proper types
  const userTwo = await UserCollection.findOne({ username: "Bar 2k" });
  const lobby: Document = await LobbyCollection.create({
    currentUsers: [userOne?._id, userTwo?._id],
    video: "rokGy0huYEA",
  }); // should query for users so you have a reference for it bc ull need user reference
  if (userOne?._id && userTwo?._id)
    await MessageCollection.insertMany(
      generateInitialMessage(lobby._id, userOne._id, userTwo._id)
    );
  await connection.destroy();
}

// drop connections if existing
async function dropCollections() {
  const collections = await connection.db.collections();
  collections.forEach((collection) => {
    collection.drop();
  });
}
