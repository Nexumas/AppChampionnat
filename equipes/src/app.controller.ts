import { Controller, Get, Param, Patch } from '@nestjs/common';
import { AppService } from './app.service';
import { Team } from './schema/team.schema';

@Controller("teams")
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  async findAll(): Promise<Team[]> {
    return await this.appService.findAll();
  }

  @Patch("/players/:id")
  async deletePlayerFromTeam(@Param('id') id: string) {
    return this.appService.deletePlayerFromTeam(id);
  }
}
