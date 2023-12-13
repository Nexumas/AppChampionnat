import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { Player } from './schemas/player.schemas';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {

  constructor(@InjectModel(Player.name) private PlayerDocument: Model<Player>,
    private http: HttpService) { }

  async findById(id: string): Promise<Player> {
    let idObj = new ObjectId(id);
    return this.PlayerDocument.findById(idObj).exec();
  }

  async findAll(): Promise<Player[]> {
    return this.PlayerDocument.find().exec();
  }

  async deleteById(id: string): Promise<any> {

    await firstValueFrom(
      this.http.patch('http://localhost:3001/teams/players/' + id),
    );

    return this.PlayerDocument.deleteOne(new ObjectId(id));
  }
}
