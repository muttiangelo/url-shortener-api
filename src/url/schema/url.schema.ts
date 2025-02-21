import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UrlDocument = HydratedDocument<ShortenUrl>;

@Schema()
export class ShortenUrl {
  @Prop()
  originalUrl: string;

  @Prop()
  shortUrl: string;

  @Prop()
  customCode: string;

  @Prop()
  expirationDate: Date;
}

export const ShortenUrlSchema = SchemaFactory.createForClass(ShortenUrl);
