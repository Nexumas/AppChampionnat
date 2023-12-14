import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Team } from './schema/team.schema';
import { TeamInterface } from './dto/team.dto';
import { PlayerDTO } from './dto/player.dto';

@Controller("teams")
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get("/all")
  async findAll(): Promise<TeamInterface[]> {
    return await this.appService.findAll();
  }

  @Patch("/players/:id")
  async deletePlayerFromTeam(@Param('id') id: string) {
    return this.appService.deletePlayerFromTeam(id);
  }

  @Patch("/:teamId/players/:id")
  async addPlayerToTeam(@Param('id') id: string, @Param('teamId') teamId: string) {
    return this.appService.addPlayerToTeam(id, teamId);
  }

  @Get(":id")
  async getTeamById(@Param('id') id: string) {
    return this.appService.getTeamById(id);
  }

  @Patch("/update/:id")
  async updateTeamById(@Param('id') id: string, @Body() team: TeamInterface) {
    return this.appService.updateTeamById(id, team);
  }

  @Delete("/delete/:id")
  async deleteTeamById(@Param('id') id: string) {
    return this.appService.deleteTeamById(id);
  }

  @Post("/add")
  async createTeam(@Body() createTeam: TeamInterface) {
    return await this.appService.createTeam(createTeam);
  }
}
