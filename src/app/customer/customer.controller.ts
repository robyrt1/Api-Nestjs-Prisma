import { UpdateCustomerDto } from './dto/update-cusmtome.dto';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ParseUUIDPipe,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-cusmtome.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}
  @Get()
  async fundAll() {
    return this.customerService.findAll();
  }

  @Post()
  async createNew(@Body() body: CreateCustomerDto) {
    const userId = 'c0912014-6997-4fea-a66a-cbbb6034c5bd';
    return this.customerService.createNew(body, userId);
  }

  @Get(':id')
  async findOneById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.customerService.findOneById(id);
  }

  @Patch(':id')
  async updateById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateCustomerDto,
  ) {
    return this.customerService.updateOneById(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.customerService.deleteById(id);
  }
}
