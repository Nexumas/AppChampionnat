import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Player } from './schemas/player.schemas';
import { PlayerDTO, PlayerInterface } from './dto/player.dto';

@Controller("players")
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get("all")
  async getAll(): Promise<PlayerInterface[]> {
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

  @Post()
  async createPlayer(@Body() createPlayer: PlayerDTO) {
    return await this.appService.createPlayer(createPlayer);
  }
}
