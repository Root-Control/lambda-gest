import {
  Controller,
  Get,
  HttpStatus,
  Query,
  Param,
  Request,
  Post,
  Body,
} from '@nestjs/common';
import { MarksService } from './marks.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MarkDto, MarkQueryDto } from './dto/mark.dto';
import { CustomRequest } from '@common/types/express';
import { CreateMarkDto } from './dto/create-mark.dto';
import { MarkTypes } from '../../@common/gesttiona-constants/enums';

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

  @Post('execute-mark')
  @ApiOperation({ summary: 'Perform Mark' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of marks',
    type: [MarkDto],
  })
  mark(
    @Request() request: CustomRequest,
    @Body() createMarkDto: CreateMarkDto,
  ) {
    if (createMarkDto.mark_type !== MarkTypes.CHECKPOINT) {
      return this.marksService.executeMark(createMarkDto, request.user);
    } else {
      return this.marksService.executeCheckpointMark(
        createMarkDto,
        request.user,
      );
    }
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
