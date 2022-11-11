import { AuthGuard } from '@nestjs/passport';
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
  UseGuards,
} from '@nestjs/common';

@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Get('dashboard')
  @UseGuards(AuthGuard('jwt'))
  dashboard() {
    return this.billingService.dashboard();
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll() {
    return this.billingService.findAll();
  }
  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
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
  @UseGuards(AuthGuard('jwt'))
  async updateById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateBillingDto,
  ) {
    return this.billingService.updateById(id, body);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.billingService.deleteById(id);
  }
}
