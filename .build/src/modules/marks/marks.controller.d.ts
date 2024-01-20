import { MarksService } from './marks.service';
import { MarkDto, MarkQueryDto } from './dto/mark.dto';
import { CustomRequest } from '@common/types/express';
import { CreateMarkDto } from './dto/create-mark.dto';
export declare class MarkController {
    private readonly marksService;
    constructor(marksService: MarksService);
    findAll(query: MarkQueryDto): Promise<MarkDto[]>;
    mark(request: CustomRequest, createMarkDto: CreateMarkDto): Promise<void> | Promise<boolean>;
    findById(id: number): Promise<MarkDto>;
}
