import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { PlayerInterface } from 'src/dto/player.dto';
import { ObjectId } from 'mongodb';

export type PlayerDocument = HydratedDocument<Player>;

@Schema()
export class Player {

  constructor(id: Types.ObjectId, firstname: string, lastname: string, pseudo: string, job: string) {
    this.id = id, this.firstname = firstname, this.lastname = lastname, this.pseudo = pseudo, this.job = job;
  }

  @Prop({ type: SchemaTypes.ObjectId })
  id: Types.ObjectId

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
      new ObjectId(p.id),
      p.firstname,
      p.lastname,
      p.pseudo,
      p.job);
  }
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
