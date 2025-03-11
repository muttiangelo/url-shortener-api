import { Injectable } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ShortenUrl } from './schema/url.schema';
import { Model } from 'mongoose';
import { CustomHttpException } from 'src/common/exceptions/custom-http.exception';
import { UrlCodeGenerator } from 'src/common/utils/code-generator';

@Injectable()
export class UrlService {
  constructor(
    @InjectModel(ShortenUrl.name)
    private readonly shortenUrlModel: Model<ShortenUrl>,
  ) { }

  async create(createUrlDto: CreateUrlDto): Promise<any> {
    const existingUrl = await this.shortenUrlModel.findOne({ code: createUrlDto.customCode });

    if (existingUrl && !existingUrl.isExpired) {
      throw new CustomHttpException('409', 'Custom code already exists.', { createUrlDto });
    }

    const shortCode = createUrlDto.customCode || UrlCodeGenerator.generate();

    const newUrl = new this.shortenUrlModel({
      ...createUrlDto,
      code: shortCode,
    });

    await newUrl.save();

    return {
      originalUrl: newUrl.originalUrl,
      shortUrl: `${process.env.BASE_URL}/${shortCode}`,
    };
  }

  async findAll() {
    return await this.shortenUrlModel.find().exec();
  }

  async getOriginalUrl(code: string) {
    const promise = await this.shortenUrlModel.findOne({ code: code, isExpired: false }).exec();

    if(!promise) {
      throw new CustomHttpException('404', 'URL not found or has expired.', { customCode: code });
    }

    return { originalUrl: promise?.originalUrl };
  }
}
