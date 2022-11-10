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
    const userId = '1e4fa6be-9426-43d2-b72a-edcf4f4d0f77';
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
