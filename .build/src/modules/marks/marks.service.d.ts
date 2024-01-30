import { MarkRepository } from './marks.repository';
import { MarkQueryDto, MarkDto } from './dto/mark.dto';
import { FindManyOptions } from 'typeorm';
import { User } from '@common/types/express';
import { AbstractApiService } from '../@third-party-services/abstract-api/abstract-api.service';
import { CreateMarkDto } from './dto/create-mark.dto';
import { RedisService } from 'src/@redis/redis.service';
export declare class MarksService {
    private readonly markRepository;
    private readonly abstractApiService;
    private readonly redisService;
    constructor(markRepository: MarkRepository, abstractApiService: AbstractApiService, redisService: RedisService);
    executeMark(createMarkDto: CreateMarkDto, user: User): Promise<boolean>;
    executeCheckpointMark(createMarkDto: CreateMarkDto, user: User): Promise<void>;
    find(query: MarkQueryDto & FindManyOptions): Promise<MarkDto[]>;
    findById(markId: number): Promise<MarkDto>;
}
