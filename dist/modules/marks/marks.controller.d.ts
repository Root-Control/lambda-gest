import { MarksService } from './marks.service';
import { MarkDto, MarkQueryDto } from './dto/mark.dto';
export declare class MarkController {
    private readonly marksService;
    constructor(marksService: MarksService);
    findAll(query: MarkQueryDto): Promise<MarkDto[]>;
    mark(): {
        success: boolean;
    };
    findById(id: number): Promise<MarkDto>;
}
