import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type PlayerDocument = HydratedDocument<Player>;

@Schema()
export class Player {

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
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
