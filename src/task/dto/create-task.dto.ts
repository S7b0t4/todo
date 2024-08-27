import { ApiProperty } from "@nestjs/swagger";

export class createTaskDto {
  @ApiProperty({
    description: "text of task",
    type: String,
    default: "Hello, world",
  })
  readonly text: string;
  
  @ApiProperty({
    description: "User id",
    type: Number,
    default: 1,
  })
  readonly userId: number;
}