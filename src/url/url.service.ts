import { Injectable } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ShortenUrl } from './schema/url.schema';
import { Model } from 'mongoose';

@Injectable()
export class UrlService {
  constructor(
    @InjectModel(ShortenUrl.name)
    private readonly shortenUrlModel: Model<ShortenUrl>,
  ) {}

  async create(createUrlDto: CreateUrlDto): Promise<string> {
    await this.shortenUrlModel.create({ ...createUrlDto });
    return `This action adds a new url`;
  }

  async findAll() {
    return await this.shortenUrlModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} url`;
  }

  update(id: number, updateUrlDto: UpdateUrlDto) {
    return `This action updates a #${id} url`;
  }

  remove(id: number) {
    return `This action removes a #${id} url`;
  }
}
