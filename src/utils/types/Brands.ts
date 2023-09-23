import { BaseInterface } from "@src/services/api.types";
import { GeneralApiProblem } from "@src/services/apiProblem";

export type BrandsRes = {
  list: Brand[];
  total: number;
};

export type Overlay = "modal" | "drawer";

export type StateType = {
  modal: boolean;
  drawer: boolean;
};

export interface Brand extends BaseInterface {
  name: string;
  fullName: string;
  country: string;
  yearFounded: string;
  logo: string;
}

export type FetchBrandsRes =
  | GeneralApiProblem
  | {
      kind: "ok";
      data: any;
    };

export type CreateBrandRes =
  | GeneralApiProblem
  | {
      kind: "ok";
    };

export type EditBrandRes =
  | GeneralApiProblem
  | {
      kind: "ok";
    };

export type DeleteBrandsRes =
  | GeneralApiProblem
  | {
      kind: "ok";
    };
