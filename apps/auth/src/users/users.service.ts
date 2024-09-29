import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import {
  CreateUserDto,
  FindUserByIdDto,
  PaginationDto,
  User,
  Users,
  UsersServiceClient,
} from '../types/auth';
import { UpdateUserDto } from '../types/auth';
import { randomUUID } from 'crypto';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class UsersService implements UsersServiceClient, OnModuleInit {
  private users: User[] = [];

  onModuleInit() {
    for (let i = 0; i < 100; i++) {
      this.users.push({
        id: randomUUID(),
        age: i,
        email: `${i}@example.com`,
        password: `${i}-password`,
        socialMedia: {
          facebookUri: `${i}-facebook.com`,
          twitterUri: `${i}-twitter.com`,
        },
        subscribed: false,
        username: `user-${i}`,
      });
    }
  }

  createUser(request: CreateUserDto): Observable<User> {
    // find similar username

    const userWithSameUsername = this.users.find(
      (u) => u.username === request.username,
    );

    if (userWithSameUsername) {
      throw new ForbiddenException('Username already exists');
    }

    const user = { ...request, id: randomUUID() };
    this.users.push(user);
    return new Observable((subscriber) => {
      subscriber.next(user);
      subscriber.complete();
    });
  }

  findAllUser(): Observable<Users> {
    return new Observable((subscriber) => {
      subscriber.next({ users: this.users });
      subscriber.complete();
    });
  }

  findUserById(request: FindUserByIdDto): Observable<User> {
    const user = this.users.find((u) => u.id === request.id);

    if (!user) {
      throw new NotFoundException('User with given id not found');
    }

    return new Observable((subscriber) => {
      subscriber.next(user);
      subscriber.complete();
    });
  }

  queryUsers(request: Observable<PaginationDto>): Observable<Users> {
    const subject = new Subject<Users>();

    const onNext = (paginationDto: PaginationDto) => {
      const start = paginationDto.page * paginationDto.skip;
      subject.next({
        users: this.users.slice(start, start + paginationDto.skip),
      });
    };

    const onComplete = () => subject.complete();

    request.subscribe({
      next: onNext,
      complete: onComplete,
    });

    return subject.asObservable();
  }

  removeUser(request: FindUserByIdDto): Observable<User> {
    const user = this.users.find((u) => u.id === request.id);

    if (!user) {
      throw new NotFoundException('User with given id not found');
    }
    this.users = this.users.filter((u) => u.id !== request.id);
    return new Observable((subscriber) => {
      subscriber.next(user);
      subscriber.complete();
    });
  }

  updateUser(request: UpdateUserDto): Observable<User> {
    const user = this.users.find((u) => u.id === request.id);

    if (!user) {
      throw new NotFoundException('User with given id not found');
    }

    const updatedUser = { ...user, ...request };
    this.users = this.users.map((u) => (u.id === request.id ? updatedUser : u));
    return new Observable((subscriber) => {
      subscriber.next(updatedUser);
      subscriber.complete();
    });
  }
}
