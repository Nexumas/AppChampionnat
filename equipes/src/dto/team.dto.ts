import { Team } from "src/schema/team.schema";
import { PlayerDTO, PlayerInterface } from "./player.dto";
import { Player } from "src/schema/player.schemas";

export interface TeamInterface {
    _id?: string,
    region: string,
    sub: string,
    coach: string,
    players: PlayerInterface[]
}

export class TeamDTO {
    static convertToTeamDTO(team: Team) {
        return {
            _id: team._id.toHexString() ? team._id.toHexString(): '',
            region: team.region,
            sub: team.sub,
            coach: team.coach,
            players: team.playersObj ? team.playersObj: []
        }

    }
}