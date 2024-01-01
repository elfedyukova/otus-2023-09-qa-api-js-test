// контроллеры, обёртка запросов к API
import supertest from "supertest";
import config from "./config";

const { url } = config;
let token = "";
let userID = "e829fff0-7aad-4aa7-a145-75e2d2aa5a65";

const user = {
  token: (payload) => {
    return supertest(url)
      .post("/Account/v1/GenerateToken")
      .set("Accept", "application/json")
      .send(payload);
  },

  async getAuthToken() {
    const payload = config.credential;
    const res = await this.token(payload);
    return res.body.token;
  },

  async getAuthTokenInCache() {
    token = await this.getAuthToken;
    return this.token;
  },

  login: (payload) => {
    return supertest(url)
      .post("/Account/v1/Authorized")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send(payload);
  },

  info: (payload) => {
    return supertest(url)
      .get("/Account/v1/User/8385b6fa-de02-4eaa-ac9a-118c7d69313a")
      .set("Accept", "application/json")
      .set(
        "Authorization",
        `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InN0cmluZyIsInBhc3N3b3JkIjoiNTZTdHJpbmdAIiwiaWF0IjoxNzA0MTIyMzc3fQ.i_6Mbie85KqPcPd3uo0xqke4M0xblNIO0PXrNgWlum4`,
      )
      .send(payload);
  },

  infoFailed: (payload) => {
    return supertest(url)
      .get("/Account/v1/User/666")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send(payload);
  },

  infoWithoutToken: (payload) => {
    return supertest(url)
      .get("/Account/v1/User/" + `${userID}`)
      .set("Accept", "application/json")
      .send(payload);
  },

  delete: (payload) => {
    return supertest(url)
      .delete("/Account/v1/User/" + `${userID}`)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send(payload);
  },

  deleteWithoutToken: (payload) => {
    return supertest(url)
      .delete("/Account/v1/User/" + `${userID}`)
      .set("Accept", "application/json")
      .send(payload);
  },

  deleteFailed: (payload) => {
    return supertest(url)
      .delete("/Account/v1/User/666")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send(payload);
  },
};

export default user;
