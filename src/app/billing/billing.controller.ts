import { UpdateBillingDto } from './dto/update-billing-dto';
import { CreateBillingDto } from './dto/create-billing-dto';
import { BillingService } from './billing.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Get('dashboard')
  dashboard() {
    return this.billingService.dashboard();
  }

  @Get()
  async findAll() {
    return this.billingService.findAll();
  }
  @Get(':id')
  async findOneById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.billingService.findOneById(id);
  }

  @Post(':id')
  async createNew(
    @Body() body: CreateBillingDto,
    @Param('id', new ParseUUIDPipe()) userId: string,
  ) {
    return this.billingService.createNew(body, userId);
  }

  @Patch(':id')
  async updateById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateBillingDto,
  ) {
    return this.billingService.updateById(id, body);
  }

  @Delete(':id')
  async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.billingService.deleteById(id);
  }
}
