import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Mongo Db Connected`);
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
