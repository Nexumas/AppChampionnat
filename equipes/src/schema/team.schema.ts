import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Player } from './player.schemas';
import { TeamInterface } from 'src/dto/team.dto';
import { PlayerInterface } from 'src/dto/player.dto';
import { ObjectId } from 'mongodb';

export type TeamDocument = HydratedDocument<Team>;

@Schema()
export class Team {

    constructor(id: Types.ObjectId, region: string, coach: string, sub: string, playersObj: PlayerInterface[]) {
        this._id = id, this.region = region, this.coach = coach, this.sub = sub, this.playersObj = playersObj;
    }

    @Prop({ type: SchemaTypes.ObjectId })
    _id: Types.ObjectId

    @Prop()
    region: string;

    @Prop()
    coach: string;

    @Prop()
    sub: string;

    @Prop()
    players: string[];

    playersObj: PlayerInterface[];

    static convertToTeamObj(t: TeamInterface): Team {
        return new Team(
            new ObjectId(t._id),
            t.region,
            t.coach,
            t.sub,
            t.players ? t.players: []
        );
    }

}

export const TeamsSchema = SchemaFactory.createForClass(Team);
