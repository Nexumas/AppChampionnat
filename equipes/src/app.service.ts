import { Injectable } from '@nestjs/common';
import { Team } from './schema/team.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ObjectId } from 'mongodb';

@Injectable()
export class AppService {

  constructor(
    @InjectModel(Team.name) private TeamDocument: Model<Team>,
    private http: HttpService
  ) { }

  async deletePlayerFromTeam(id: string): Promise<any> {
    if (id != null) {
      let teams = this.TeamDocument.find().exec();

      for (let t of await teams) {
        if (t.players.indexOf(id) !== -1) {
          t.players.splice(t.players.indexOf(id), 1);
          await this.TeamDocument.updateOne({ id: t.id }, { players: t.players })
        }
      }
    }
  }

  async deleteTeamById(id: string): Promise<any> {
    return this.TeamDocument.deleteOne(new ObjectId(id));
  }

  async findAll(): Promise<Team[]> {
    let teams = this.TeamDocument.find().exec();

    if (teams) {
      for (let t of await teams) {

        for (let p of t.players) {

          const res = await firstValueFrom(
            this.http.get('http://localhost:3000/players/' + p),
          );

          t.playersObj.push(res.data);

        }
      }
    }

    return teams;
  }
}
