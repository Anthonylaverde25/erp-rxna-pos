export interface StatusInfo {
  value: string;
  label: string;
}

export interface Company {
  id: number;
  name: string;
  // Añadir más campos según se requiera
}

export interface AuthUser {
  id: number;
  email: string;
  name: string;
  full_name: string;
  last_name: string;
  phone: string | null;
  role: string | null;
  siglas: string;
  is_active: boolean;
  needs_password_change: boolean;
  active_company_id: number;
  companies: Company[];
  address: string | null;
  color: string | null;
  status: StatusInfo;
}

export interface AuthSessionData {
  token: string;
  token_type: string;
  user: AuthUser;
}
