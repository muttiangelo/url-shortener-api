import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUrlDto } from './dto/create-url.dto';
import { UrlService } from './url.service';

@Controller('url')
@ApiBearerAuth()
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new shortened URL' })
  @ApiResponse({
    status: 201,
    description: 'The shortened URL has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @UseGuards(AuthGuard)
  create(@Body() createUrlDto: CreateUrlDto) {
    return this.urlService.create(createUrlDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all shortened URLs' })
  @ApiResponse({
    status: 200,
    description: 'List of all shortened URLs.',
  })
  @UseGuards(AuthGuard)
  findAll() {
    return this.urlService.findAll();
  }

  @Get(':code')
  @ApiOperation({ summary: 'Redirect to the original URL' })
  @ApiResponse({
    status: 200,
    description: 'Retrieves the original url.',
  })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  async redirect(@Param('code') code: string) {
    console.log(code);
    return await this.urlService.getOriginalUrl(code);
  }
}
