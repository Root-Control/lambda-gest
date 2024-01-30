import { MarksService } from './marks.service';
import { MarkDto, MarkQueryDto } from './dto/mark.dto';
import { CustomRequest } from '@common/types/express';
import { RequestMarkDto } from './dto/request-mark.dto';
export declare class MarkController {
    private readonly marksService;
    constructor(marksService: MarksService);
    findAll(query: MarkQueryDto): Promise<MarkDto[]>;
    mark(request: CustomRequest, createMarkDto: RequestMarkDto): Promise<boolean> | Promise<void>;
    findById(id: number): Promise<MarkDto>;
}
