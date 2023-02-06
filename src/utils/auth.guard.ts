import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import {JwtService} from './jwt.service'
import { Reflector } from '@nestjs/core';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService,
    private reflector: Reflector) {}

    
   async canActivate(
    context: ExecutionContext,
  ) {
    const request = context.switchToHttp().getRequest();
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const value = await this.jwtService.verifyJWT(request.headers.authorization)
    var response = false
    await roles.forEach(obj => {
        if(obj === value.role){
            response = true   
        }
    });
    return response
  }
}