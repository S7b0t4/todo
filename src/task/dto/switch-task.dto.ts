import { ApiProperty } from "@nestjs/swagger";

export class switchTaskDto {
  @ApiProperty({
    description: "Task id",
    type: Number,
    default: 1
  })
  readonly taskId: number;
  @ApiProperty({
    description: "User id",
    type: Number,
    default: 1
  })
  readonly userId: number;
  @ApiProperty({
    description: "Task switch (Чекбокс значение)",
    type: Boolean,
    default: false
  })
  readonly switch: boolean;
}