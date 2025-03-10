import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateUrlDto {
  @ApiProperty({
    required: true,
    description:
      'The original URL. /^(https?|http):\\/\\/[^\\s/$.?#].[^\\s]*$/i',
  })
  @IsNotEmpty()
  @IsUrl(
    { protocols: ['http', 'https'] },
    { message: 'The original URL must be a valid URL' },
  )
  originalUrl: string;

  @ApiProperty({
    required: false,
    description:
      'The custom code for the shortened URL. You can choose one or let us create randomly.',
  })
  customCode?: string;

  @ApiProperty({
    required: false,
    description: 'The expiration date of the shortened URL. Default is 24 hours.',
  })
  expiresAt?: Date;
}
