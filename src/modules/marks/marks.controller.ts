import { Controller, Get, HttpStatus, Query, Param } from '@nestjs/common';
import { MarksService } from './marks.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MarkDto, MarkQueryDto } from './dto/mark.dto';

@ApiTags('Marks')
@Controller('marks')
export class MarkController {
  constructor(private readonly marksService: MarksService) {}

  @Get()
  @ApiOperation({ summary: 'Get all marks' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of marks',
    type: [MarkDto],
  })
  findAll(@Query() query: MarkQueryDto): Promise<MarkDto[]> {
    return this.marksService.find(query);
  }

  mark() {
    //service.validate1()
    //service.readredis
    //services.putQueue
    return { success: true };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get mark by Id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Mark By Id',
    type: MarkDto,
  })
  findById(@Param('id') id: number): Promise<MarkDto> {
    console.log(1);
    return this.marksService.findById(id);
  }
}
