import { ApiProperty } from "@nestjs/swagger";

export class deleteTaskDto {
  @ApiProperty({
    type: Number,
    description: "User id",
    default: 1
  })
  readonly userId: number;
  @ApiProperty({
    type: Number,
    description: "Task ids",
    default: 1
  })
  readonly taskId: number;
}