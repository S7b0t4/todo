import { ApiProperty } from "@nestjs/swagger";

export class changeTaskDto {
  @ApiProperty({
    description: "User id",
    type: Number,
    default: 1
  })
  readonly userId: number;
  @ApiProperty({
    description: "Task id",
    type: Number,
    default: 1
  })
  readonly taskId: number;
  @ApiProperty({
    description: "Task text",
    type: String,
    default: "HI, how are you?"
  })
  readonly text: string;
}