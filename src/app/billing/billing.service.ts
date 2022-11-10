import { UpdateBillingDto } from './dto/update-billing-dto';
import { CreateBillingDto } from './dto/create-billing-dto';
import { BillingStatusEnum } from './dto/billing.status.enun';
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { DateTime } from 'luxon';

@Injectable()
export class BillingService {
  constructor(private readonly prismaService: PrismaService) {}

  async dashboard() {
    const billings = await this.prismaService.billing.groupBy({
      by: ['dueDate', 'status'],
      _sum: { value: true },
      where: { deletedAt: null },
    });

    const history = billings.map((billing) => ({
      dueDate: DateTime.fromJSDate(billing.dueDate).toFormat('yyyy-MM-dd'),
      value: Number(billing._sum.value),
      status: billing.status,
    }));

    const pending = history
      .filter(({ status }) => status === BillingStatusEnum.PENDING)
      .reduce((total, current) => (total += current.value), 0);
    const late = history
      .filter(({ status }) => status === BillingStatusEnum.LATE)
      .reduce((total, current) => (total += current.value), 0);
    const paid = history
      .filter(({ status }) => status === BillingStatusEnum.PAID)
      .reduce((total, current) => (total += current.value), 0);

    const customer = await this.prismaService.customer.count({
      where: { deletedAt: null },
    });

    return {
      customer,
      pending,
      late,
      paid,
      history,
    };
  }

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
