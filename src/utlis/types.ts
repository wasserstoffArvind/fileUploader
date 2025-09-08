export interface Transaction {
  date: string;
  description: string;
  amount: number;
}

export interface StatementDetails {
  userName: string;
  bankName: string;
  cardName: string;
}

export interface ApiResponse {
  statement_details: StatementDetails;
  transactions: Transaction[];
  total_purchase_amount: number;
  verification_status: string;
}
