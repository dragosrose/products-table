import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProduseController } from './produse.controller';
import { ProduseService } from './produse.service';
import { Produse, ProduseSchema } from './schemas/produse.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Produse.name,
        schema: ProduseSchema,
      },
    ]),
  ],
  controllers: [ProduseController],
  providers: [ProduseService],
})
export class ProduseModule {}
