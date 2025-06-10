export interface TokenData {
  userId: string;
  username: string;
  email: string;
  isVerified: boolean;
}
export interface RegisterFormData {
  firstname?: string;
  lastname?: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterFormErrors {
  firstname?: string;
  lastname?: string;
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginFormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export interface ForgotPasswordState {
  email: string;
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
}

export interface VerificationState {
  status: "loading" | "success" | "error" | "expired";
  message: string;
}

export interface DashboardCardProps {
  title: string;
  index: number;
}

export interface SidebarUser {
  username: string;
  email: string;
  avatar?: string;
  initials?: string;
}

export interface SidebarSubMenuItem {
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  href: string;
}

export interface SidebarMenuItem {
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  href?: string;
  submenu?: SidebarSubMenuItem[];
}

export interface SidebarProps {
  activeItem?: string;
}

export interface SettingsFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
