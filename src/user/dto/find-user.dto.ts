import { ApiProperty } from "@nestjs/swagger";

export class findUserDto {
  @ApiProperty({
    description: "Email",
    type: String,
    default: "example@gmail.com"
  })
  readonly email: string;
}