import { PlayerInterface } from 'interfaces/player';
import { GameInterface } from 'interfaces/game';
import { GetQueryInterface } from 'interfaces';

export interface ParticipationInterface {
  id?: string;
  player_id: string;
  game_id: string;
  created_at?: any;
  updated_at?: any;

  player?: PlayerInterface;
  game?: GameInterface;
  _count?: {};
}

export interface ParticipationGetQueryInterface extends GetQueryInterface {
  id?: string;
  player_id?: string;
  game_id?: string;
}
