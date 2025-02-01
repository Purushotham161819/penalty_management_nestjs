import { Module } from '@nestjs/common';
//import { AppController } from './app.controller';
//import { AppService } from './app.service';
import { ViolatorModule } from './violator/violator.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ViolatorModule,
    MongooseModule.forRoot('mongodb://localhost:27017/penalty_managemenet_nestjs'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
