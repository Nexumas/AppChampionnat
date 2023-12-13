import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { Player } from './schemas/player.schemas';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { PlayerDTO, PlayerInterface } from './dto/player.dto';

@Injectable()
export class AppService {

  constructor(@InjectModel(Player.name) private PlayerDocument: Model<Player>,
    private http: HttpService) { }

  async findById(id: string): Promise<Player> {
    let idObj = new ObjectId(id);
    return this.PlayerDocument.findById(idObj).exec();
  }

  async findAll(): Promise<PlayerInterface[]> {
    let res = await this.PlayerDocument.find().exec();

    let players: PlayerInterface[] = [];

    for (let p of await res) {
      players.push(PlayerDTO.convertToPlayerDTO(p));
    }

    return players;
  }

  async deleteById(id: string): Promise<any> {

    await firstValueFrom(
      this.http.patch('http://localhost:3001/teams/players/' + id),
    );

    return this.PlayerDocument.deleteOne(new ObjectId(id));
  }
}
