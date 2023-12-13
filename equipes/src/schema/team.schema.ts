import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Player } from './player.schemas';

export type TeamDocument = HydratedDocument<Team>;

@Schema()
export class Team {

    @Prop({ type: SchemaTypes.ObjectId })
    id: Types.ObjectId

    @Prop()
    region: string;

    @Prop()
    coach: string;

    @Prop()
    sub: string;

    @Prop()
    players: string[];
    
    @Prop()
    playersObj: Player[];
}

export const TeamsSchema = SchemaFactory.createForClass(Team);
