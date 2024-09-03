import mongoose from 'mongoose';
import { AddressSchema } from '../schemas/AddressSchema';

export const MongooseAddress = mongoose.model('Address', AddressSchema);
