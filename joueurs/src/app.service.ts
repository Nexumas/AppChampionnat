import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { Player } from './schemas/player.schemas';

@Injectable()
export class AppService {

  constructor(@InjectModel(Player.name) private PlayerDocument: Model<Player>) { }

  async findById(id: string): Promise<Player> {
    let idObj = new ObjectId(id);
    return this.PlayerDocument.findById(idObj).exec();
  }

  async findAll(): Promise<Player[]> {
    return this.PlayerDocument.find().exec();
  }
}
