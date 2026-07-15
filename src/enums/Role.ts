export enum Role {
  USER = "USER",
  EDITOR = "EDITOR",
  ADMIN = "ADMIN",
}

export const RoleLabels: Record<Role, string> = {
  [Role.USER]: "User",
  [Role.EDITOR]: "Editor",
  [Role.ADMIN]: "Admin",
};
