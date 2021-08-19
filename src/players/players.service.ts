import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class PlayersService {

    private players: Player[] = [];

    private readonly logger = new Logger(PlayersService.name);

    async createUpdatePlayer(createPlayerDto: CreatePlayerDto): Promise<void> {

        const { email } = createPlayerDto;

        const findedPlayer = this.players.find(players => players.email === email);

        if (findedPlayer) {
            return this.update(findedPlayer, createPlayerDto)
        } else {
            this.create(createPlayerDto);
        }

    }

    async getAllPlayers(): Promise<Player[]> {
        return await this.players;
    }

    async getPlayerByEmail(email: string): Promise<Player> {

        const findedPlayer = this.players.find(players => players.email === email);

        if (!findedPlayer) {
            throw new NotFoundException(`Jogador com ${email} não encontrado`)
        }
        return findedPlayer;



    }

    async deletePlayerByEmail(email: string): Promise<void> {
        const findedPlayer = this.players.find(players => players.email === email);

        this.players = this.players.filter(player => player.email !== findedPlayer.email)
    }

    private create(createPlayerDto: CreatePlayerDto): void {

        const { name, phoneNumber, email } = createPlayerDto;

        const player: Player = {
            _id: uuidv4(),
            name,
            phoneNumber,
            email,
            ranking: 'A',
            positionRanking: 1,
            urlPhotoPlayer: "www.google.com.br/foto123"
        };
        this.logger.log(`criaJogadorDTO: ${JSON.stringify(player)}`);
        this.players.push(player);

    }

    private update(findedPlayer: Player, createPlayerDto: CreatePlayerDto): void {
        const { name } = createPlayerDto;

        findedPlayer.name = name;


    }

}
