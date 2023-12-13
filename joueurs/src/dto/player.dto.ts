import { Player } from "src/schemas/player.schemas";
import { ObjectId } from 'mongodb';


export interface PlayerInterface {
    _id: string,
    firstname: string,
    lastname: string,
    pseudo: string,
    job: string
}

export class PlayerDTO {

    static convertToPlayerDTO(player: Player): PlayerInterface {
        console.log(player);
        return {
            _id: player._id.toHexString(),
            firstname: player.firstname,
            lastname: player.lastname,
            pseudo: player.pseudo,
            job: player.job
        }
    }
}