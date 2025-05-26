export interface login {
  email: string;
  password: string;
}

export interface loginResponse {
  user: User;
  access: string;
  refresh: string;
}

export interface User {
  id: string;
  password?: string; // Optional for security reasons
  last_login?: string; // Optional, can be used for tracking last login time
  is_staff?: boolean; // Optional, indicates if the user is a staff member
  is_active?: boolean; // Optional, indicates if the user account is active
  email: string;
  last_name: string;
  first_name: string;
  user_type: string;
}
