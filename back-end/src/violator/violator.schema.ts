import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema() 
export class Violator extends Document {
  @Prop({ type: String, required: true, unique: true })
  violatorID: string;

  @Prop({ type: String, required: true })
  firstName: string;

  @Prop({ type: String, required: true })
  lastName: string;

  @Prop({ type: Date, required: true })
  DoB: Date;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  contactNumber: string;

  @Prop({
    type: {
      street: { type: String, required: true },
      apartment: { type: String, required: false },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
    },
    required: true,
  })
  address: {
    street: string;
    apartment?: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export const ViolatorSchema = SchemaFactory.createForClass(Violator);
