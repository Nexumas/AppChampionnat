import { Controller, Delete, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { Player } from './schemas/player.schemas';

@Controller("players")
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get("all")
  async getAll(): Promise<Player[]> {
    return await this.appService.findAll();
  }

  @Get(":id")
  async getPlayerById(@Param('id') id: string): Promise<Player> {
    return this.appService.findById(id);
  }

  @Delete(":id")
  async deletePlayerById(@Param('id') id: string): Promise<Player> {
    return this.appService.deleteById(id);
  }
}
