import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './srvices/users/users.service';
import { User, UserSchema } from './schemas/users/User.schema';
import { MulterModule } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/services/cloudinary/cloudinary.service';
import { CoffeeClassicModule } from 'src/coffee-classic/coffee-classic.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    MulterModule.register({
      dest: './uploads',
    }),
    CoffeeClassicModule,
  ],
  providers: [UsersService, CloudinaryService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
