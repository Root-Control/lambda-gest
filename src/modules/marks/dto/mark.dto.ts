import { ApiProperty, PartialType } from '@nestjs/swagger';

export class MarkDto {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the mark.',
  })
  id: number;

  @ApiProperty({
    example: '2024-01-06T08:36:22Z',
    type: 'string',
    format: 'date-time',
    nullable: true,
    description: 'The time of the mark.',
  })
  time: Date;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    nullable: true,
    description: 'The photo associated with the mark.',
  })
  photo: string;

  @ApiProperty({
    example: 40.7128,
    type: 'number',
    nullable: true,
    description: 'The latitude of the mark.',
  })
  latitude: number;

  @ApiProperty({
    example: -74.006,
    type: 'number',
    nullable: true,
    description: 'The longitude of the mark.',
  })
  longitude: number;

  @ApiProperty({ example: 2, description: 'The ID of the mark type.' })
  mark_type_id: number;

  @ApiProperty({ example: 3, description: 'The ID of the location.' })
  location_id: number;

  @ApiProperty({ example: 4, description: 'The ID of the worker day.' })
  worker_day_id: number;

  @ApiProperty({
    example: '2024-01-06T08:36:22Z',
    type: 'string',
    format: 'date-time',
    description: 'The creation time of the mark.',
  })
  created_at: Date;

  @ApiProperty({
    example: '2024-01-06T08:36:22Z',
    type: 'string',
    format: 'date-time',
    description: 'The last update time of the mark.',
  })
  updated_at: Date;

  @ApiProperty({
    example: 5,
    nullable: true,
    description: 'The ID of the location status.',
  })
  location_status_id: number;

  @ApiProperty({
    example: 1,
    nullable: true,
    description: 'The ID of the shift.',
  })
  shift_id: number;

  @ApiProperty({
    type: 'string',
    nullable: true,
    description: 'Data associated with the mark.',
  })
  data: string;

  @ApiProperty({
    type: 'string',
    nullable: true,
    description: 'Encrypted data.',
  })
  crypt_data: string;

  @ApiProperty({ example: true, nullable: true, description: 'Admin flag.' })
  admin: boolean;

  @ApiProperty({
    type: 'string',
    nullable: true,
    description: 'Time parameters.',
  })
  time_parameters: string;

  @ApiProperty({ example: true, nullable: true, description: 'Edit flag.' })
  edit: boolean;

  @ApiProperty({
    example: '2024-01-06',
    type: 'string',
    format: 'date',
    nullable: true,
    description: 'The date of the mark.',
  })
  date: Date;

  @ApiProperty({
    example: 1,
    nullable: true,
    description: 'The ID of the management center.',
  })
  management_center_id: number;

  @ApiProperty({
    example: '2024-01-06T08:36:22Z',
    type: 'string',
    format: 'date-time',
    nullable: true,
    description: 'Device time.',
  })
  device_time: Date;

  @ApiProperty({
    example: true,
    nullable: true,
    description: 'Use service flag.',
  })
  use_service: boolean;

  @ApiProperty({
    example: true,
    nullable: true,
    description: 'Time service alert flag.',
  })
  time_service_alert: boolean;

  @ApiProperty({
    type: 'string',
    nullable: true,
    description: 'Source of the mark.',
  })
  source: string;

  @ApiProperty({
    example: 120,
    type: 'number',
    nullable: true,
    description: 'Service time in seconds.',
  })
  service_time: number;

  @ApiProperty({
    type: 'string',
    nullable: true,
    description: 'Response from image processing.',
  })
  image_response: string;

  @ApiProperty({
    example: 0.85,
    type: 'number',
    nullable: true,
    description: 'Probability from image processing.',
  })
  image_probability: number;
}

export class MarkQueryDto extends PartialType(MarkDto) {}
