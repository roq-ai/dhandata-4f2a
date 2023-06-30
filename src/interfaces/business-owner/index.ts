import { GameInterface } from 'interfaces/game';
import { TeamMemberInterface } from 'interfaces/team-member';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface BusinessOwnerInterface {
  id?: string;
  user_id: string;
  business_name: string;
  created_at?: any;
  updated_at?: any;
  game?: GameInterface[];
  team_member?: TeamMemberInterface[];
  user?: UserInterface;
  _count?: {
    game?: number;
    team_member?: number;
  };
}

export interface BusinessOwnerGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  business_name?: string;
}
