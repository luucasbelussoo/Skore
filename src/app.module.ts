import { Module } from '@nestjs/common';
import { SkoreController } from './controller/skore.controller'
import { SkoreRepository } from './repository/skore.repository';
import { SkoreService } from './service/skore.service';
import { AuthGuard } from './utils/auth.guard';
import { JwtService } from './utils/jwt.service';

@Module({
  imports: [],
  controllers: [SkoreController],
  providers: [SkoreService, SkoreRepository, JwtService, AuthGuard],
})
export class AppModule {}
