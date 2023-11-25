import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: parseInt(process.env.PORT || '5000', 10),
  database_url: process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/test',
};
