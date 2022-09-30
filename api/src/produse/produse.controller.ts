import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProduseDTO } from './dto/ProduseDTO.dto';
import { ProduseService } from './produse.service';

@Controller('produse')
export class ProduseController {
  constructor(private readonly produseService: ProduseService) {}

  @Post()
  async create(@Body() produseDTO: ProduseDTO) {
    return await this.produseService.create(produseDTO);
  }

  @Get()
  async findAll(): Promise<ProduseDTO[]> {
    return await this.produseService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProduseDTO> {
    return await this.produseService.findById(id);
  }

  @Post(':id/delete')
  async delete(@Param('id') id: string): Promise<void> {
    await this.produseService.delete(id);
  }

  @Post(':id/update')
  async update(@Param('id') id: string, @Body() produseDTO: ProduseDTO) {
    return await this.produseService.update(id, produseDTO);
  }
}
