import { AuthGuard } from '@nestjs/passport';
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
  UseGuards,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-cusmtome.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}
  @Get()
  @UseGuards(AuthGuard('jwt'))
  async fundAll() {
    return this.customerService.findAll();
  }

  @Post()
  async createNew(@Body() body: CreateCustomerDto) {
    const userId = '7fa8938e-0310-4191-8759-e6296149e465';
    return this.customerService.createNew(body, userId);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOneById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.customerService.findOneById(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async updateById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateCustomerDto,
  ) {
    return this.customerService.updateOneById(id, body);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.customerService.deleteById(id);
  }
}
