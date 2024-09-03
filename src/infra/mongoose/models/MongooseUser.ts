import { model } from 'mongoose';
import { UserSchema } from '../schemas/UserSchema';

export const MongooseUser = model('User', UserSchema);
