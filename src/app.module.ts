import { Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PlantsModule } from './plants/plants.module';

@Module({
  imports: [
    PlantsModule,

    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configuration_service: ConfigService) => {
        const user = configuration_service.get<string>('MONGO_USER');
        const password = configuration_service.get<string>('MONGO_PASSWORD');
        const host = configuration_service.get<string>('MONGO_HOST');
        const port = configuration_service.get<string>('MONGO_PORT');

        return {
          uri: `mongodb://${user}:${password}@${host}:${port}`,
          dbName: 'plants',
        };
      },
    }),
  ],
})
export class AppModule {}
