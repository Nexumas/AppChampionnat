import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Player } from './schemas/player.schemas';

@Controller("players")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<Player[]> {
    let test = await this.appService.findAll();

    test.forEach((element) => {
      console.log(element.firstname);
    });

    return test; 
  }
}
