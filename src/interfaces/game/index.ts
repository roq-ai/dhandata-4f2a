import { ParticipationInterface } from 'interfaces/participation';
import { WinInterface } from 'interfaces/win';
import { BusinessOwnerInterface } from 'interfaces/business-owner';
import { GetQueryInterface } from 'interfaces';

export interface GameInterface {
  id?: string;
  business_owner_id: string;
  fee: number;
  status: string;
  created_at?: any;
  updated_at?: any;
  participation?: ParticipationInterface[];
  win?: WinInterface[];
  business_owner?: BusinessOwnerInterface;
  _count?: {
    participation?: number;
    win?: number;
  };
}

export interface GameGetQueryInterface extends GetQueryInterface {
  id?: string;
  business_owner_id?: string;
  status?: string;
}
