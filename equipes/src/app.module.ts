import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Team, TeamsSchema } from './schema/team.schema';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [//MongooseModule.forRoot('mongodb://admin:admin@localhost:27017/?authMechanism=DEFAULT'), 
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb://admin:admin@localhost:5001/?authMechanism=DEFAULT',
        dbName: 'AppChampionnat',
      }),
    }),
    MongooseModule.forFeature([{ name: Team.name, schema: TeamsSchema }]),
    HttpModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
