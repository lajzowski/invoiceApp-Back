import { Users } from '../users/users.entity';

export interface BusinessInterface {
  id: string;
  name: string;
  nip: number;
  address: string;
  postcode: string;
  city: string;
  type: number;
  vat: number;
  subdomain: string;
  user: Users;
  date_created: Date;
}
