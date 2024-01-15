// article.repository.ts
import { Repository } from 'typeorm';
import { Mark } from './mark.model';

export class MarkRepository extends Repository<Mark> {}
