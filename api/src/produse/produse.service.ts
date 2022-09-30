import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProduseDTO } from './dto/ProduseDTO.dto';
import { Produse, ProduseDocument } from './schemas/produse.schema';

@Injectable()
export class ProduseService {
  constructor(
    @InjectModel(Produse.name)
    private readonly produseModel: Model<ProduseDocument>,
  ) {}

  async create(data: ProduseDTO): Promise<Produse> {
    const newProduse = await this.produseModel.create(data);
    return newProduse;
  }

  async findAll(): Promise<Produse[]> {
    const allProduses = await this.produseModel.find().exec();
    return allProduses;
  }

  async findById(id: string): Promise<Produse> {
    const produse = await this.produseModel.findById(id).exec();
    return produse;
  }

  async update(id: string, data: ProduseDTO): Promise<Produse> {
    return this.produseModel.findByIdAndUpdate({ _id: id }, data).exec();
  }

  async delete(id: string): Promise<Produse> {
    return this.produseModel.findByIdAndRemove({ _id: id }).exec();
  }
}
