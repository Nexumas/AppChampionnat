import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Team } from './schema/team.schema';

@Controller("teams")
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  async getHello(): Promise<Team[]> {
    return await this.appService.findAll();
  }
}
