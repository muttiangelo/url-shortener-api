import { Module } from '@nestjs/common';
import { UrlModule } from './url/url.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import * as process from 'node:process';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UrlModule,
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_STRING || ''),
    UsersModule,
  ],
})
export class AppModule {}
