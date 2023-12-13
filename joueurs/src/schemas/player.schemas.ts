import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { PlayerInterface } from 'src/dto/player.dto';
import { ObjectId } from 'mongodb';

export type PlayerDocument = HydratedDocument<Player>;

@Schema()
export class Player {

  constructor(firstname: string, lastname: string, pseudo: string, job: string, id?: Types.ObjectId) {
    this._id = id ?? null, this.firstname = firstname, this.lastname = lastname, this.pseudo = pseudo, this.job = job;
  }

  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId

  @Prop()
  firstname: string;

  @Prop()
  lastname: string;

  @Prop()
  pseudo: string;

  @Prop()
  job: string;


  static convertToPlayerObj(p: PlayerInterface): Player {
    return new Player(
      p.firstname,
      p.lastname,
      p.pseudo,
      p.job,
      p._id ? new ObjectId(p._id) : null
    );
  }
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
