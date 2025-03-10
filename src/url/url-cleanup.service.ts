import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ShortenUrl, UrlDocument } from './schema/url.schema';

@Injectable()
export class UrlCleanupService {
    private readonly logger = new Logger(UrlCleanupService.name);

    constructor(
        @InjectModel(ShortenUrl.name)
        private readonly shortenUrlModel: Model<UrlDocument>,
    ) {
    }

    @Cron(CronExpression.EVERY_MINUTE)
    async handleCron() {
        this.logger.log('Running URL cleanup task');
        const now = new Date();
        await this.shortenUrlModel.updateMany(
            { expirationDate: { $lt: now } },
            { $set: { isExpired: true } }
        ).exec();
        this.logger.log('Expired URLs have been updated');
    }
}