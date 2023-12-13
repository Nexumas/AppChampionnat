import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Team } from './schema/team.schema';
import { TeamInterface } from './dto/team.dto';
import { PlayerDTO } from './dto/player.dto';

@Controller("teams")
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  async findAll(): Promise<TeamInterface[]> {
    return await this.appService.findAll();
  }

  @Patch("/players/:id")
  async deletePlayerFromTeam(@Param('id') id: string) {
    return this.appService.deletePlayerFromTeam(id);
  }

  @Delete(":id")
  async deleteTeamById(@Param('id') id: string) {
    return this.appService.deleteTeamById(id);
  }

  @Post()
  async createTeam(@Body() createTeam: PlayerDTO) {
    return await this.appService.createTeam(createTeam);
  }
}
