import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUrlDto {
  @ApiProperty({ required: true, description: 'The original URL' })
  @IsNotEmpty()
  originalUrl: string;

  @ApiProperty({
    required: false,
    description:
      'The custom code for the shortened URL. You can choose one or let us create randomly.',
  })
  customCode?: string;

  @ApiProperty({ required: false, description: 'A nickname for this url' })
  alias?: string;

  @ApiProperty({
    required: false,
    description: 'The expiration date of the shortened URL',
  })
  expiresAt?: Date;
}
