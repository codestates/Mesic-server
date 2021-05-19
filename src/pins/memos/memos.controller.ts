import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Pin } from '../schemas/pins.schema';
import { MemosService } from './memos.service';
import { ModulesContainer } from '@nestjs/core';

@Controller('memo') // pins/locations
export class MemosController {
  constructor(private readonly pinsService: MemosService) {}


  @Patch('/:id')
  updateMemo(@Param('id') pin_id: string, @Body() data) {
    const updateMemo = this.pinsService.update(pin_id, data);
    return updateMemo;
  }
}
