import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Player } from './schemas/player.schemas';

@Injectable()
export class AppService {

  constructor(@InjectModel(Player.name) private PlayerDocument: Model<Player>) { }


  getHello(): string {
    return 'Hello World!';
  }

  async findById(id: string): Promise<Player> {
    return this.PlayerDocument.findById(id);
  }

  async findAll(): Promise<Player[]> {
    return this.PlayerDocument.find().exec();
  }
}
