import { Module } from '@nestjs/common';
import { UrlModule } from './url/url.module';
import { AuthModule } from './auth/auth.module';

import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [UrlModule, AuthModule, MongooseModule.forRoot('')],
})
export class AppModule {}
