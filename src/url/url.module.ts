import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ShortenUrlSchema } from './schema/url.schema';
import { UrlCleanupService } from './url-cleanup.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ShortenUrl', schema: ShortenUrlSchema },
    ]),
  ],
  controllers: [UrlController],
  providers: [UrlService, UrlCleanupService],
})
export class UrlModule {}
