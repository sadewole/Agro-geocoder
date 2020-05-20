import mongoose from 'mongoose';
//  local url
const mongoURI = process.env.mongoURI;

const connectDB = async () => {
  try {
    // connect to mongodb
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to DB');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
