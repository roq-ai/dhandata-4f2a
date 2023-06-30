import { ParticipationInterface } from 'interfaces/participation';
import { WinInterface } from 'interfaces/win';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface PlayerInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  participation?: ParticipationInterface[];
  win?: WinInterface[];
  user?: UserInterface;
  _count?: {
    participation?: number;
    win?: number;
  };
}

export interface PlayerGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
