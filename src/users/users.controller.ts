import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AppDataSource } from 'src/data-source';
import { User } from 'src/entities/user.entity';

const UserRepo = AppDataSource.getRepository(User)
@Controller('users')
export class UsersController {
  // constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
  
   const user =  UserRepo.create(createUserDto);

    await UserRepo.save(user);

    console.log(user);

    return user;

  }

  @Get()
  findAll() {
    return UserRepo.find();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return UserRepo.findOne({where: {id: +id}});
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    // return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.usersService.remove(+id);
  }
}
