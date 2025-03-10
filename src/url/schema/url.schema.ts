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
  code: string;

  @Prop({ default: () => new Date(Date.now() + 1 * 60 * 60 * 1000) })
  expirationDate: Date;

  @Prop({ default: false })
  isExpired: boolean
}

export const ShortenUrlSchema = SchemaFactory.createForClass(ShortenUrl);
