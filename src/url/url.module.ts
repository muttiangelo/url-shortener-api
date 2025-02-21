import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ShortenUrlSchema } from './schema/url.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ShortenUrl', schema: ShortenUrlSchema },
    ]),
  ],
  controllers: [UrlController],
  providers: [UrlService],
})
export class UrlModule {}
