export interface UserForm {
  id?: number;
  nama?: string | null;
  username?: string | null;
  password?: string | null;
  email?: string | null;
  no_telp?: string | null;
}

export interface KurirUserForm {
  id?: number;
  nama?: string | null;
  username?: string | null;
  password?: string | null;
  kurir_service_id?: number | null;
  location_id?: number | null;
  created_at?: Date | null;
}
