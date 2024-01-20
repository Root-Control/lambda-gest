import { MarkRepository } from './marks.repository';
import { MarkQueryDto, MarkDto } from './dto/mark.dto';
import { FindManyOptions } from 'typeorm';
import { User } from '@common/types/express';
import { AbstractApiService } from '../@third-party-services/abstract-api/abstract-api.service';
import { CreateMarkDto } from './dto/create-mark.dto';
export declare class MarksService {
    private readonly markRepository;
    private readonly abstractApiService;
    constructor(markRepository: MarkRepository, abstractApiService: AbstractApiService);
    executeMark(createMarkDto: CreateMarkDto, user: User): Promise<boolean>;
    executeCheckpointMark(createMarkDto: CreateMarkDto, user: User): Promise<void>;
    find(query: MarkQueryDto & FindManyOptions): Promise<MarkDto[]>;
    findById(markId: number): Promise<MarkDto>;
}
