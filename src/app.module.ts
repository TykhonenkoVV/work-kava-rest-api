import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeeClassicModule } from './coffee-classic/coffee-classic.module';
import { CoffeeWithMilkModule } from './coffee-with-milk/coffee-with-milk.module';
import { BurgersModule } from './burgers/burgers.module';
import { RollsModule } from './rolls/rolls.module';
import { DessertsModule } from './desserts/desserts.module';
import { HotDogsModule } from './hot-dogs/hot-dogs.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { HelpModule } from './help/help.module';
import { CartsModule } from './carts/carts.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_HOST),
    UsersModule,
    AuthModule,
    HelpModule,
    CoffeeClassicModule,
    CoffeeWithMilkModule,
    BurgersModule,
    RollsModule,
    DessertsModule,
    HotDogsModule,
    CartsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
