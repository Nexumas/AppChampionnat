import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Player, PlayerSchema } from './schemas/player.schemas';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb://admin:admin@localhost:5001/?authMechanism=DEFAULT',
        dbName: 'AppChampionnat',
      }),
    }),
    MongooseModule.forFeature([{ name: Player.name, schema: PlayerSchema }]),
    HttpModule],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
