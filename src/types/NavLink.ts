export interface NavbarDropdownChild {
  name: string;
  path: string;
}

export type NavLink = {
  name: string;
  path: string;
  icon?: React.ElementType;
  exact?: boolean;
  children?: NavbarDropdownChild[];
};
