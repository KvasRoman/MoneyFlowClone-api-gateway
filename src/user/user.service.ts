import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserService {
    constructor(@Inject("USER_SERVICE") private readonly userService: ClientProxy){}
    
    async getProfile(accId: string){
        
        const serviceResponse = await firstValueFrom(this.userService.send({cmd: "get_user"}, {accountId: accId}));
        const {id,accountId, createdAt,updatedAt,
            ...user} = serviceResponse;
        return user;
    }
    
    async updateProfile(){

    }
    async createProfile(accId: string){
        const serviceResponse = await firstValueFrom(this.userService.send({cmd: "create_user"}, {
            accountId: accId, 
            firstName: `user${Math.floor(1000 + Math.random() * 9000)}`,
            lastName: null
          }));
        const {id,accountId, createdAt,updatedAt,
            ...user} = serviceResponse;
        return user;  
    }

}
