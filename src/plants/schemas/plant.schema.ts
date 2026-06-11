import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<Plant>;

@Schema({ _id: false })
class I18NSchema {
  @Prop()
  fr: string;

  @Prop()
  en: string;
}

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Plant {
  @Prop({ required: true })
  scientific_name: string;

  @Prop({ type: I18NSchema })
  name: I18NSchema;
}

export const PlantSchema = SchemaFactory.createForClass(Plant);
