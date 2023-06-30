import { UserInterface } from 'interfaces/user';
import { BusinessOwnerInterface } from 'interfaces/business-owner';
import { GetQueryInterface } from 'interfaces';

export interface TeamMemberInterface {
  id?: string;
  user_id: string;
  business_owner_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  business_owner?: BusinessOwnerInterface;
  _count?: {};
}

export interface TeamMemberGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  business_owner_id?: string;
}
