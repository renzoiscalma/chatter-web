import mongoose from "mongoose";

async function connectMongoose() {
  let uri = "";

  if (process.argv.includes("prod")) {
    const { MONGO_USR_PROD, MONGO_PW_PROD, MONGO_PROD } = process.env; // TODO will depend on npm run
    uri = `mongodb+srv://${MONGO_USR_PROD}:${MONGO_PW_PROD}@${MONGO_PROD}`;
  } else if ("local") {
    const { MONGO_LOCAL, MONGO_DB_NAME } = process.env; // TODO will depend on npm run
    uri = `mongodb://${MONGO_LOCAL}/${MONGO_DB_NAME}`;
  } else {
    console.log("no environment");
  }

  await mongoose
    .connect(`${uri}`)
    .then((res) => {
      mongoose.connection.once("open", () => {
        console.log("MongoDB Connection Successful");
      });
    })
    .catch((err) => {
      console.error(err);
    });

  return mongoose.connection;
}

export default connectMongoose;
