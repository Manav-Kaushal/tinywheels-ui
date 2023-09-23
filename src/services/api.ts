import { appConfig } from "@utils/config";
import { getLoginUrl, productsEndpoints } from "@utils/endPoints";
import {
  CreateBrandRes,
  DeleteBrandsRes,
  EditBrandRes,
  FetchBrandsRes,
} from "@utils/types/Brands";
import { CreateProductRes } from "@utils/types/Products";
import { ApisauceInstance, create } from "apisauce";
import { getSession } from "next-auth/react";
import * as Types from "./api.types";
import { getGeneralApiProblem } from "./apiProblem";

export const DEFAULT_CONFIG = {
  timeout: 10000,
  url: appConfig.apiBaseUrl,
};

export class Api {
  apisauce: ApisauceInstance;
  config: Types.ApiConfig;
  constructor(config = DEFAULT_CONFIG) {
    this.config = config;
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    });
  }

  async login(data: any): Promise<any> {
    const res = await this.apisauce.post(getLoginUrl(), data);
    if (!res.ok) {
      const problem = getGeneralApiProblem(res);
      if (problem) return problem;
    }

    return { kind: "ok", data: res?.data || {} };
  }

  // BRANDS START
  async getAllBrands(): Promise<FetchBrandsRes> {
    const res = await this.apisauce.get("/brands");
    if (!res.ok) {
      const problem = getGeneralApiProblem(res);
      if (problem) return problem;
    }

    return { kind: "ok", data: res?.data || [] };
  }

  async createBrand(data: any): Promise<CreateBrandRes> {
    const res = await this.apisauce.post("/brands/new", data, {
      headers: {
        "Content-Type":
          data instanceof FormData ? "multipart/form-data" : "application/json",
      },
    });
    if (!res.ok) {
      const problem = getGeneralApiProblem(res);
      if (problem) return problem;
    }

    return { kind: "ok" };
  }

  async editBrand(id: string, data: FormData): Promise<EditBrandRes> {
    const res = await this.apisauce.put("/brands/" + id, data, {
      headers: {
        "Content-Type":
          data instanceof FormData ? "multipart/form-data" : "application/json",
      },
    });
    if (!res.ok) {
      const problem = getGeneralApiProblem(res);
      if (problem) return problem;
    }

    return { kind: "ok" };
  }

  async deleteBrand(id: string): Promise<DeleteBrandsRes> {
    const res = await this.apisauce.delete("/brands/" + id);
    if (!res.ok) {
      const problem = getGeneralApiProblem(res);
      if (problem) return problem;
    }

    return { kind: "ok" };
  }
  // BRANDS END

  // PRODUCTS START
  async getProducts(): Promise<any> {
    const res = await this.apisauce.get(productsEndpoints.getAll);
    if (!res.ok) {
      const problem = getGeneralApiProblem(res);
      if (problem) return problem;
    }

    return { kind: "ok", data: res?.data || [] };
  }

  async createProduct(data: FormData): Promise<CreateProductRes> {
    const res = await this.apisauce.post("/products/new", data, {
      headers: {
        "Content-Type":
          data instanceof FormData ? "multipart/form-data" : "application/json",
      },
    });
    if (!res.ok) {
      const problem = getGeneralApiProblem(res);
      if (problem) return problem;
    }

    return { kind: "ok" };
  }
  // PRODUCTS END
}

export const api = new Api();

api.apisauce.setBaseURL(appConfig.apiBaseUrl);

api.apisauce.addAsyncRequestTransform((request: any) => async () => {
  const t: any = await getSession();

  const userToken = t?.user?.token;

  if (userToken) {
    request.headers.authorization = `Bearer ${userToken}`;
  } else {
    delete request.headers.token;
  }
});
