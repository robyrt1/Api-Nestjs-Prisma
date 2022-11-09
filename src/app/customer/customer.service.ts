import { UpdateCustomerDto } from './dto/update-cusmtome.dto';
import { PrismaService } from 'src/database/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-cusmtome.dto';

@Injectable()
export class CustomerService {
  constructor(private readonly prismaService: PrismaService) {}
  async findAll() {
    return this.prismaService.customer.findMany({
      select: {
        id: true,
        name: true,
        cpfCnpj: true,
        email: true,
        cellphone: true,
        userId: true,
      },
      where: {
        deletedAt: null,
      },
    });
  }

  async createNew(data: CreateCustomerDto, userId: string) {
    try {
      const result = await this.prismaService.customer.create({
        data: {
          ...data,
          user: { connect: { id: userId } },
        },
      });
      return result;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async findOneById(id: string) {
    try {
      return await this.prismaService.customer.findFirstOrThrow({
        select: {
          id: true,
          name: true,
          cpfCnpj: true,
          email: true,
          cellphone: true,
          userId: true,
        },
        where: { id, deletedAt: null },
      });
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async updateOneById(id: string, data: UpdateCustomerDto) {
    return await this.prismaService.customer.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
  }

  async deleteById(id: string) {
    const fromDb = await this.findOneById(id);
    if (!fromDb) {
      throw new BadRequestException({ error: `not exists` });
    }
    await this.prismaService.customer.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
