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
import { MemosService } from './memos.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { UpdateMemoDto } from './dto/update-memo.dto';

@Controller('memos') // pins/locations
export class MemosController {
  constructor(private readonly memosService: MemosService) {}

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  updateMemo(@Param('id') pin_id: string, @Body() data: UpdateMemoDto) {
    const updateMemo = this.memosService.update(pin_id, data);
    return updateMemo;
  }
}
