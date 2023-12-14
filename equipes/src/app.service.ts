import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Team } from './schema/team.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ObjectId } from 'mongodb';
import { TeamDTO, TeamInterface } from './dto/team.dto';
import { PlayerDTO } from './dto/player.dto';

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
          await this.TeamDocument.updateOne({ _id: t.id }, { players: t.players })
        }
      }
    }
  }

  async updateTeamById(id: string, team: TeamInterface): Promise<any> {
    let t = Team.convertToTeamObj(team);

    let updated =  this.TeamDocument.updateOne({ _id: new ObjectId(id) },
      { region: t.region, coach: t.coach, sub: t.sub, players: t.players });

    return updated;
  }

  async addPlayerToTeam(id: string, teamId: string): Promise<any> {
    if (id != null) {
      let team = await this.TeamDocument.findById(new ObjectId(teamId)).exec();

      if (team._id.toHexString() === teamId) {
        if(team.players.indexOf(id) == -1){
          team.players.push(id);
          return await this.TeamDocument.updateOne({ _id: team._id }, { players: team.players })
        }
        return new HttpException('Player already linked to this team', HttpStatus.BAD_REQUEST);;
      }
    }
  }

  async getTeamById(id: string): Promise<TeamInterface> {
    let team = await this.TeamDocument.findById(new ObjectId(id)).exec();

    for (let p of team.players) {

      const res = await firstValueFrom(
        this.http.get('http://localhost:3000/players/' + p),
      );

      if(res){
        team.playersObj.push(res.data);        
      }

    }

    return TeamDTO.convertToTeamDTO(team);
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

  async createTeam(createTeam: TeamInterface): Promise<Team> {
    let t = Team.convertToTeamObj(createTeam);
    const newPlayer = await new this.TeamDocument(t);
    return newPlayer.save();
  }
}
