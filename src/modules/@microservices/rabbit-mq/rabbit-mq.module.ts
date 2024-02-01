import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { IRabbit } from 'src/config/configuration.interface';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        name: 'RABBITMQ_SERVICE',
        useFactory: async (configService: ConfigService) => {
          const { host, port } = configService.get<IRabbit>('rabbit');
          const url = `amqp://${host}:${port}`;
          return {
            transport: Transport.RMQ,
            options: {
              urls: [url],
              queue: 'gestiona',
              queueOptions: {
                durable: true,
              },
            },
          };
        },
        inject: [ConfigService],
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class RabbitMqModule {}
