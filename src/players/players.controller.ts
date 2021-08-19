import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { PlayersService } from './players.service';
import { Player } from './interfaces/player.interface';
import { Delete } from '@nestjs/common';

@Controller('api/v1/player')
export class PlayersController {

    //Com esse comando eu consigo fazer uso dos objetos e metodos do service dos jogadores
    constructor(private readonly playersService: PlayersService) { }

    @Post()
    async createUpdatePlayer(@Body() CreatePlayerDto: CreatePlayerDto) {

        //Cria o jogador usando o metodo do service pra criar o usuário
        await this.playersService.createUpdatePlayer(CreatePlayerDto);
    }

    @Get()
    async getPlayers(
        @Query('email') email: string): Promise<Player[] | Player> {
        if (email) {
            return await this.playersService.getPlayerByEmail(email);
        } else {
            return await this.playersService.getAllPlayers();
        }

    }

    @Delete()
    async deletePlayerByEmail(
        @Query('email') email: string): Promise<void> {
            this.playersService.deletePlayerByEmail(email);
    }
}

