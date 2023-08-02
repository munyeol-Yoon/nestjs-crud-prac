import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  Logger,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board.model';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';
import { ApiTags } from '@nestjs/swagger';
import { Ip } from 'src/decorators/ip.decorator';

@Controller('boards')
@ApiTags('Board')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  private readonly logger = new Logger(BoardsController.name);

  @Get()
  getAllBoards(@Ip() ip: string): Promise<Board[]> {
    this.logger.log(ip);
    this.logger.debug(ip);
    this.logger.error(ip);
    this.logger.verbose(ip);
    this.logger.warn(ip);
    console.log(`${ip}`);
    return this.boardsService.getAllBoards();
  }

  //   @Get()
  //   getAllBoard(): Board[] {
  //     return this.boardsService.getAllBoards();
  //   }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(
    @Body(new ValidationPipe()) createBoardDto: CreateBoardDto,
  ): Promise<Board> {
    return this.boardsService.createBoard(createBoardDto);
  }

  //   @Post()
  //   @UsePipes(ValidationPipe)
  //   createBoard(@Body() createBoardDto: CreateBoardDto): Board {
  //     return this.boardsService.createBoard(createBoardDto);
  //   }

  @Get('/:id')
  getBoardById(@Param('id', ParseIntPipe) id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  //   @Get('/:id')
  //   getBoardById(@Param('id') id: string): Board {
  //     return this.boardsService.getBoardById(id);
  //   }

  @Delete('/:id')
  deleteBoard(@Param('id', ParseIntPipe) id: string): Promise<void> {
    return this.boardsService.deleteBoard(id);
  }
  //   @Delete('/:id')
  //   deleteBoard(@Param('id') id: string): void {
  //     this.boardsService.deleteBoard(id);
  //   }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<Board> {
    return this.boardsService.updateBoardStatus(id, status);
  }
  //   @Patch('/:id/status')
  //   updateBoardStatus(
  //     @Param('id') id: string,
  //     @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  //   ) {
  //     return this.boardsService.updateBoardStatus(id, status);
  //   }
}
