export interface MenuItem {
  label: string;
  action?: () => void;
  children?: MenuItem[];
}
