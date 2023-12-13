
import { ObjectId } from 'mongodb';
import { Player } from 'src/schema/player.schemas';


export interface PlayerInterface {
    id: string,
    firstname: string,
    lastname: string,
    pseudo: string,
    job: string
}

export class PlayerDTO {

    static convertToPlayerDTO(player: Player): PlayerInterface {
        return {
            id: new ObjectId(player.id).toString(),
            firstname: player.firstname,
            lastname: player.lastname,
            pseudo: player.pseudo,
            job: player.job
        }
    }
}