import { Module } from '@nestjs/common';
import { ViolatorController } from './violator.controller';
import { ViolatorService } from './violator.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Violator, ViolatorSchema } from './violator.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Violator.name, schema: ViolatorSchema },
    ]),
  ],

  controllers: [ViolatorController],
  providers: [ViolatorService],
})
export class ViolatorModule {}
