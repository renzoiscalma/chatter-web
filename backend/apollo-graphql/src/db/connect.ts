import mongoose from "mongoose";

async function connectMongoose() {
  // process.env.NODE_ENV === 'development' ? true : false,
  const { MONGO_LOCAL, MONGO_DEV, MONGO_PW, MONGO_USR, MONGO_DB_NAME } =
    process.env; // TODO will depend on npm run
  const DEV_URI = `mongodb+srv://${MONGO_USR}:${MONGO_PW}@${MONGO_DEV}/${MONGO_DB_NAME}`;
  const LOCAL_URI = `mongodb://${MONGO_LOCAL}/${MONGO_DB_NAME}`;

  await mongoose
    .connect(`${LOCAL_URI}`)
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
