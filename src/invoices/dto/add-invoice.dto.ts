import { FvBaseEntries } from '../fv_base_entries.entity';

export class AddInvoiceDto {
  number: string;

  date_created: Date;
  date_sold: Date;
  date_payment: Date;

  payment_type: number;
  buyer_id: string;
  buyer_type: number;
  buyer_name: string;
  buyer_nip: number;
  buyer_address: string;
  buyer_city: string;

  seller_name: string;
  seller_nip: number;
  seller_address: string;
  seller_postcode: string;
  seller_city: string;
  seller_signature: string;

  comments: string;

  status: number;

  entries: FvBaseEntries[];
}
