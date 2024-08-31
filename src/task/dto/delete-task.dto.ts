import { ApiProperty } from "@nestjs/swagger";

export class deleteTaskDto {
  @ApiProperty({
    type: String,
    description: "User token",
    default: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImV4cGFtcGxlQGdtYWlsLnJ1IiwiaWQiOjE2LCJpYXQiOjE3MjUxMTIwNzMsImV4cCI6MTcyNjkyNjQ3M30.wSQUsYLGRc3WkASwP_Mt4u4dkbp2gdtkeQ3H12qFlO0"
  })
  readonly token: string;
  @ApiProperty({
    type: Number,
    description: "Task ids",
    default: 1
  })
  readonly taskId: number;
}