import { UpdateBillingDto } from './dto/update-billing-dto';
import { CreateBillingDto } from './dto/create-billing-dto';
import { BillingStatusEnum } from './dto/billing.status.enun';
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
@Injectable()
export class BillingService {
  constructor(private readonly prismaService: PrismaService) {}
  async findAll() {
    return this.prismaService.billing.findMany({
      select: {
        id: true,
        description: true,
        status: true,
        value: true,
        dueDate: true,
        createdAt: true,
      },
      where: { deletedAt: null },
    });
  }

  async findOneById(id: string) {
    try {
      return this.prismaService.billing.findFirstOrThrow({
        select: {
          id: true,
          description: true,
          status: true,
          value: true,
          dueDate: true,
          customerId: true,
          createdAt: true,
        },
        where: { id, deletedAt: null },
      });
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async createNew(data: CreateBillingDto, userId: string) {
    try {
      const { customerId, ...rest } = data;
      return await this.prismaService.billing.create({
        data: {
          ...rest,
          status: BillingStatusEnum.PENDING,
          customer: { connect: { id: customerId } },
          user: { connect: { id: userId } },
        },
      });
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async updateById(id: string, data: UpdateBillingDto) {
    return await this.prismaService.billing.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
  }

  async deleteById(id: string) {
    const fromDb = await this.findOneById(id);
    if (!fromDb) throw new BadRequestException({ error: `not exists` });

    await this.prismaService.billing.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
