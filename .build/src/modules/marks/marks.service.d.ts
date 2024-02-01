import { MarkRepository } from './marks.repository';
import { MarkQueryDto, MarkDto } from './dto/mark.dto';
import { FindManyOptions } from 'typeorm';
import { User } from '../../@common/types/express';
import { AbstractApiService } from '../@third-party-services/abstract-api/abstract-api.service';
import { RequestMarkDto } from './dto/request-mark.dto';
import { RedisService } from 'src/@redis/redis.service';
import { ClientProxy } from '@nestjs/microservices';
export declare class MarksService {
    private readonly markRepository;
    private readonly abstractApiService;
    private readonly redisService;
    private readonly client;
    constructor(markRepository: MarkRepository, abstractApiService: AbstractApiService, redisService: RedisService, client: ClientProxy);
    executeMark(requestMarkDto: RequestMarkDto, user: User): Promise<boolean>;
    validateAndSendToQueue(location_name: string, payload: Record<string, any>): Promise<void>;
    executeCheckpointMark(requestMarkDto: RequestMarkDto, user: User): Promise<void>;
    find(query: MarkQueryDto & FindManyOptions): Promise<MarkDto[]>;
    findById(markId: number): Promise<MarkDto>;
}
