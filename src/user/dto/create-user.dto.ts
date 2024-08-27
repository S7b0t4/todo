import { ApiProperty } from "@nestjs/swagger";

export class createUserDto {
  @ApiProperty({
    default: "Антон",
    type: String,
    description: "Username"
  })
  readonly name: string;
  @ApiProperty({
    default: "toni.paun.00@mail.ru",
    type: String,
    description: "User email"
  })
  readonly email: string;
  @ApiProperty({
    default: "12345",
    type: String,
    description: "User password"
  })
  readonly password: string;
}