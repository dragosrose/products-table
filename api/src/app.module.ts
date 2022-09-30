import { Module } from '@nestjs/common';
import { ProduseModule } from './produse/produse.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ProduseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      `mongodb+srv://dragos:${process.env.PASSWORD}@cluster0.onwiunp.mongodb.net/test`,
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
