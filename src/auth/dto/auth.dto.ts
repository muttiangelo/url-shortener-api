import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class AuthDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ required: true, description: 'The client ID' })
    clientId: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ required: true, description: 'The client secret' })
    clientSecret: string;
}