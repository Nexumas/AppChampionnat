import { Team } from "src/schema/team.schema";
import { PlayerDTO, PlayerInterface } from "./player.dto";
import { ObjectId } from 'mongodb';
import { Player } from "src/schema/player.schemas";

export interface TeamInterface {
    id: string,
    region: string,
    sub: string,
    coach: string,
    players: PlayerInterface[]
}

export class TeamDTO {
    static convertToTeamDTO(team: Team) {
        return {
            id: new ObjectId(team.id).toString(),
            region: team.region,
            sub: team.sub,
            coach: team.coach,
            players: team.playersObj ? team.playersObj.map((p: Player) => PlayerDTO.convertToPlayerDTO(p)) : []
        }

    }
}