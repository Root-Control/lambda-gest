import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'marks' })
export class Mark {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', nullable: true })
  time: Date;

  @Column({ nullable: true })
  photo: string;

  @Column({ type: 'float', nullable: true })
  latitude: number;

  @Column({ type: 'float', nullable: true })
  longitude: number;

  @Column()
  mark_type_id: number;

  @Column()
  location_id: number;

  @Column()
  worker_day_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true })
  location_status_id: number;

  @Column({ nullable: true })
  shift_id: number;

  @Column({ nullable: true })
  data: string;

  @Column({ nullable: true })
  crypt_data: string;

  @Column({ nullable: true })
  admin: boolean;

  @Column({ nullable: true })
  time_parameters: string;

  @Column({ nullable: true })
  edit: boolean;

  @Column({ nullable: true })
  date: Date;

  @Column({ nullable: true })
  management_center_id: number;

  @Column({ nullable: true })
  device_time: Date;

  @Column({ nullable: true })
  use_service: boolean;

  @Column({ nullable: true })
  time_service_alert: boolean;

  @Column({ nullable: true })
  source: string;

  @Column({ nullable: true })
  service_time: number;

  @Column({ nullable: true })
  image_response: string;

  @Column({ nullable: true })
  image_probability: number;
}
