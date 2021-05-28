import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Pin } from '../schemas/pins.schema';
import { MemosService } from './memos.service';
import { ModulesContainer } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('memos') // pins/locations
export class MemosController {
  constructor(private readonly pinsService: MemosService) {}

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  updateMemo(@Param('id') pin_id: string, @Body() data) {
    const updateMemo = this.pinsService.update(pin_id, data);
    return updateMemo;
  }
}
