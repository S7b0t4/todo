import { ApiProperty } from "@nestjs/swagger";

export class createTaskDto {

  readonly id: number;

  @ApiProperty({
    description: "text of task",
    type: String,
    default: "Hello, world",
  })
  readonly text: string;
  
  @ApiProperty({
    description: "User token",
    type: String,
    default: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImV4cGFtcGxlQGdtYWlsLnJ1IiwiaWQiOjE2LCJpYXQiOjE3MjUxMTIwNzMsImV4cCI6MTcyNjkyNjQ3M30.wSQUsYLGRc3WkASwP_Mt4u4dkbp2gdtkeQ3H12qFlO0",
  })
  readonly token: string;
}