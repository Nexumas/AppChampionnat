import { Injectable } from '@nestjs/common';
import { Team } from './schema/team.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { HttpService } from '@nestjs/axios';
import { Player } from './schema/player.schemas';

@Injectable()
export class AppService {

  constructor(
    @InjectModel(Team.name) private TeamDocument: Model<Team>,
    private http: HttpService
  ) { }


  getHello(): string {
    return 'Hello World!';
  }

  async findAll(): Promise<Team[]> {
    let teams = this.TeamDocument.find().exec();
    if (teams) {
      for (let t of await teams) {
        for (let p of t.players) {
          let player = this.http.get('http://localhost:3000/players/' + p);
          if (player) {
            t.playersObj.push(player);
          }
        }
      }
    }

    return teams;
  }
}
