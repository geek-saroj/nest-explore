import { Exclude, Expose, Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

@Exclude()
export class CreateUserDto {
  @Expose()
  @MinLength(2)
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Expose()
  password: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  contact: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  address: string;

  @Expose()
  @IsOptional()
  @IsString()
  gender: string;

  @Expose()
  @IsNotEmpty()
  @Transform(({ value }) => {
    return typeof value === 'boolean' ? value : value === 'true' ? true : false;
  })
  @IsBoolean()
  status: boolean;
}
