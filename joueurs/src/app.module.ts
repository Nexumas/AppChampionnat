import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Player, PlayerSchema } from './schemas/player.schemas';

@Module({
  imports: [//MongooseModule.forRoot('mongodb://admin:admin@localhost:27017/?authMechanism=DEFAULT'), 
  MongooseModule.forRootAsync({
    useFactory: () => ({
      uri: 'mongodb://admin:admin@localhost:27017/?authMechanism=DEFAULT',
      dbName: 'AppChampionnat',
    }),
  }),
  MongooseModule.forFeature([{ name: Player.name, schema: PlayerSchema }])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
