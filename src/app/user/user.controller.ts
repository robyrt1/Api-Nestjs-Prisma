import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async findAll() {
    return this.userService.findAll();
  }
  @Post()
  async createNew(@Body() body: CreateUserDto) {
    return this.userService.createNew(body);
  }

  @Get(':id')
  async findOneById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.findOneById(id);
  }

  @Patch(':id')
  async updateById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body()
    body: UpdateUserDto,
  ) {
    return this.userService.updateByid(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.userService.deleteById(id);
  }
}
