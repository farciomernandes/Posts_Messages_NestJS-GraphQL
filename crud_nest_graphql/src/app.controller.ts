import { Controller, Get } from '@nestjs/common';
import RepoService from './repo.service';

@Controller()
export class AppController {
  constructor(private readonly reportService: RepoService) {}

  @Get()
  async getHello(): Promise<string> {
    return ` There are ${await this.reportService.messageRepo.count()} messages existent!`;
  }
}
