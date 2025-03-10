import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UrlModule } from './url/url.module';
import { UsersModule } from './users/users.module';

import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as process from 'node:process';
import { FallbackModule } from './common/fallback/common.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    UrlModule,
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_STRING || ''),
    UsersModule,
    FallbackModule,
  ],
})
export class AppModule {}
