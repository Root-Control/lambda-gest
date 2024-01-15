import { MarkRepository } from './marks.repository';
import { MarkQueryDto, MarkDto } from './dto/mark.dto';
import { FindManyOptions } from 'typeorm';
export declare class MarksService {
    private readonly markRepository;
    constructor(markRepository: MarkRepository);
    find(query: MarkQueryDto & FindManyOptions): Promise<MarkDto[]>;
    findById(markId: number): Promise<MarkDto>;
}
