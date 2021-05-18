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
  constructor(private readonly memosService: MemosService) {}

  @Get(':id')
  getMemo(@Param('id') pin_id: string) {
    return this.memosService.getMemo(pin_id);
  }

  @Patch()
  updateMemo() {}

  @Delete()
  deleteMemo() {
    // 메모에 있는 것을
  }
}
