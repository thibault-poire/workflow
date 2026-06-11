import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PlantsService } from './plants.service';

@Controller('/plants')
export class PlantsController {
  constructor(private readonly plants_service: PlantsService) {}

  @Get()
  public async get_plants() {
    return await this.plants_service.get_plants();
  }

  @Get(':id')
  public async get_plant(@Param('id') id: string) {
    return await this.plants_service.get_plant(id);
  }

  @Post()
  public async post_plant(@Body() new_plant) {
    return this.plants_service.post_plant(new_plant);
  }
}
