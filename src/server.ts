import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

async function main() {
  try {
    mongoose.connect(config.database_url as string);
    console.log('Connected to MongoDB');

    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();

export default main;
