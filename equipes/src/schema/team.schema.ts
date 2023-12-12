import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Player } from './player.schemas';

export type TeamDocument = HydratedDocument<Team>;

@Schema()
export class Team {
    @Prop()
    region: string;

    @Prop()
    coach: string;

    @Prop()
    sub: string;

    @Prop()
    players: string[];

    playersObj: any[];
}

export const TeamsSchema = SchemaFactory.createForClass(Team);
