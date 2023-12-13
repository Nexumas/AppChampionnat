import { Injectable } from '@nestjs/common';
import { Team } from './schema/team.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ObjectId } from 'mongodb';
import { TeamDTO, TeamInterface } from './dto/team.dto';

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

  async findAll(): Promise<TeamInterface[]> {
    let res = this.TeamDocument.find().exec();
    let teams: TeamInterface[] = [];

    if (res) {
      for (let t of await res) {

        for (let p of t.players) {

          const res = await firstValueFrom(
            this.http.get('http://localhost:3000/players/' + p),
          );

          t.playersObj.push(res.data);

        }

        teams.push(TeamDTO.convertToTeamDTO(t));
      }
    }

    return teams;
  }
}
