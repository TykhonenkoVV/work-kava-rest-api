import { Module } from '@nestjs/common';
import { RoomsController } from './controllers/rooms/rooms.controller';
import { RoomsService } from './services/rooms/rooms.service';
import { CloudinaryService } from 'src/cloudinary/services/cloudinary/cloudinary.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema } from './schemas/rooms.schema';
import { MulterModule } from '@nestjs/platform-express';
import { UsersService } from 'src/users/srvices/users/users.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Room.name,
        schema: RoomSchema,
      },
    ]),
    MulterModule.register({
      dest: './uploads',
    }),
    UsersModule,
  ],
  controllers: [RoomsController],
  providers: [RoomsService, CloudinaryService],
})
export class RoomsModule {}
