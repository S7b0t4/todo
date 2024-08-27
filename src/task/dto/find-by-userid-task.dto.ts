import { ApiProperty } from "@nestjs/swagger";

export class findTaskByUserIdDto {
  @ApiProperty({
    description: "User id",
    type: Number,
    default: 1,
  })
  readonly userId: number
}