import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';
import { UpdateUserDto } from './dto/update.user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  async findAll() {
    return this.prismaService.user.findMany({
      select: {
        id: true,
        firsName: true,
        lastName: true,
        email: true,
      },
      where: {
        deletedAt: null,
      },
    });
  }

  async createNew(data: CreateUserDto) {
    try {
      data.password = this.hashPassword(data.password);
      const user = await this.prismaService.user.create({ data });
      delete user.password;
      return user;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async findOneById(id: string) {
    try {
      return await this.prismaService.user.findFirstOrThrow({
        select: {
          id: true,
          firsName: true,
          lastName: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
        where: { id, deletedAt: null },
      });
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async findOneByEmail(email: string) {
    try {
      return await this.prismaService.user.findFirstOrThrow({
        select: {
          id: true,
          firsName: true,
          lastName: true,
          email: true,
          password: true,
          createdAt: true,
          updatedAt: true,
        },
        where: { email, deletedAt: null },
      });
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async updateByid(id: string, data: UpdateUserDto) {
    const user = await this.prismaService.user.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
    delete user.password;
    return user;
  }

  async deleteById(id: string) {
    await this.findOneById(id);
    await this.prismaService.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  hashPassword(password: string) {
    const salt = genSaltSync(10);
    return hashSync(password, salt);
  }

  validatePassword(password: string, hash: string) {
    return compareSync(password, hash);
  }
}
