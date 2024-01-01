// контроллеры, обёртка запросов к API
import supertest from "supertest";
import config from "./config";

const { url } = config;
let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InN0cmluZyIsInBhc3N3b3JkIjoiNTJTdHJpbmdAIiwiaWF0IjoxNzA0MTE2NDAxfQ.KduTvCmd69PXq5wK3hHlMMgukXu5By9Ve-E_CGAcnk4";
let userID = "d242c2cc-875e-4a4d-b02f-1c8a5ff0632b";

const user = {
  token: (payload) => {
    return supertest(url)
      .post("/Account/v1/GenerateToken")
      .set("Accept", "application/json")
      .send(payload);
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

  delete: (payload) => {
    return supertest(url)
      .delete("/Account/v1/User/" + `${userID}`)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send(payload);
  },
};

export default user;
