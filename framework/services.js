// контроллеры, обёртка запросов к API
import supertest from "supertest";
import config from "./config";

const { url } = config;
let token = "";
let userID = "d242c2cc-875e-4a4d-b02f-1c8a5ff0632b";

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
      .get("/Account/v1/User/" + `${userID}`)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
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
