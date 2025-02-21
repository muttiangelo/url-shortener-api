import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new shortened URL' })
  @ApiResponse({
    status: 201,
    description: 'The shortened URL has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createUrlDto: CreateUrlDto) {
    return this.urlService.create(createUrlDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all shortened URLs' })
  @ApiResponse({
    status: 200,
    description: 'List of all shortened URLs.',
  })
  findAll() {
    return this.urlService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific shortened URL by ID' })
  @ApiResponse({
    status: 200,
    description: 'The shortened URL has been successfully retrieved.',
  })
  findOne(@Param('id') id: string) {
    return this.urlService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific shortened URL by ID' })
  @ApiResponse({
    status: 200,
    description: 'The shortened URL has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'URL not found.' })
  update(@Param('id') id: string, @Body() updateUrlDto: UpdateUrlDto) {
    return this.urlService.update(+id, updateUrlDto);
  }

  @ApiOperation({ summary: 'Delete a specific shortened URL by ID' })
  @ApiResponse({
    status: 200,
    description: 'The shortened URL has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'URL not found.' })
  remove(@Param('id') id: string) {
    return this.urlService.remove(+id);
  }
}
