import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardStatus } from './board.model';
// import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { Repository } from 'typeorm';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}

  //   private boards: Board[] = [];

  async getAllBoards(): Promise<Board[]> {
    return this.boardRepository.find();
  }

  //   getAllBoards(): Board[] {
  //     return this.boards;
  //   }

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;
    const board = this.boardRepository.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });
    await this.boardRepository.save(board);

    return board;
  }

  //   createBoard(createBoardDto: CreateBoardDto) {
  //     const { title, description } = createBoardDto;
  //     const board: Board = {
  //       id: uuid(),
  //       title,
  //       description,
  //       status: BoardStatus.PUBLIC,
  //     };

  //     this.boards.push(board);
  //     return board;
  //   }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`${id} 가 존재하지 않습니다.`);
    }
    return found;
  }

  //   getBoardById(id: string): Board {
  //     const found = this.boards.find((board) => board.id === id);
  //     if (!found) {
  //       throw new NotFoundException(`Can't find Board with id ${id}`);
  //     }

  //     return found;
  //   }

  async deleteBoard(id: string): Promise<void> {
    const result = await this.boardRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`${id} 가 존재하지 않습니다.`);
    }

    console.log('result', result);
  }

  //   deleteBoard(id: string): void {
  //     const found = this.getBoardById(id);
  //     this.boards = this.boards.filter((board) => board.id !== found.id);
  //   }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;
    await board.save();
    return board;
  }

  //   updateBoardStatus(id: string, status: BoardStatus): Board {
  //     const board = this.getBoardById(id);
  //     board.status = status;
  //     return board;
  //   }
}
