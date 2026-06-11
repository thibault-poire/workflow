import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Plant } from './schemas/plant.schema';
import { Model } from 'mongoose';

@Injectable()
export class PlantsService {
  constructor(@InjectModel(Plant.name) private plant_model: Model<Plant>) {}

  public async get_plants() {
    return await this.plant_model.find().exec();
  }

  public async get_plant(id: string) {
    const plant = await this.plant_model.findById(id).exec();

    if (!plant) {
      throw new NotFoundException();
    }

    return plant;
  }

  public async post_plant(plant) {
    return await this.plant_model.create(plant);
  }
}
