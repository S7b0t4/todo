import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class AuthUserDto {
  @ApiProperty({
    example: 1,
    default: "Идентификатор пользователя",
    type: Number
  })
  readonly id: number

  @ApiProperty({
    example: 'Антон',
    description: 'Имя пользователя',
    type: String,
  })
  @IsString({ message: 'Не валидное имя' })
  readonly name: string;

  @ApiProperty({
    example: 'expample@gmail.ru',
    description: 'Почта пользователя',
  })
  @IsEmail({}, { message: 'Не валидный email' })
  readonly email: string;

  @ApiProperty({
    example: '123456q',
    description: 'Пароль пользователя',
  })
  @Length(4, 16, {message: "Пароль должен быть не меньше 4 и не больше 16 символов"})
  readonly password: string;
}