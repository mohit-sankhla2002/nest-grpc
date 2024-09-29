import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  CreateUserDto,
  FindUserByIdDto,
  PaginationDto,
  UpdateUserDto,
  User,
  Users,
  UsersServiceController,
  UsersServiceControllerMethods,
} from '../types/auth';
import { Observable } from 'rxjs';

@Controller()
@UsersServiceControllerMethods()
export class UsersController implements UsersServiceController {
  constructor(private readonly usersService: UsersService) {}

  createUser(request: CreateUserDto): Promise<User> | Observable<User> | User {
    return this.usersService.createUser(request);
  }

  findAllUser(): Promise<Users> | Observable<Users> | Users {
    return this.usersService.findAllUser();
  }

  findUserById(
    request: FindUserByIdDto,
  ): Promise<User> | Observable<User> | User {
    return this.usersService.findUserById(request);
  }

  queryUsers(request: Observable<PaginationDto>): Observable<Users> {
    return this.queryUsers(request);
  }

  removeUser(
    request: FindUserByIdDto,
  ): Promise<User> | Observable<User> | User {
    return this.usersService.removeUser(request);
  }

  updateUser(request: UpdateUserDto): Promise<User> | Observable<User> | User {
    return this.usersService.updateUser(request);
  }
}
