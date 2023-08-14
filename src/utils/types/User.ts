import { RolesEnum } from "@utils/enums/Roles";

export type UserType = {
  _id: string;
  name: string;
  email: string;
  role: RolesEnum;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: 0;
};
