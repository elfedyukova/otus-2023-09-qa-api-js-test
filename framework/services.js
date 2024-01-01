// контроллеры, обёртка запросов к API
import supertest from "supertest";
import config from "./config";

const { url } = config;
let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InN0cmluZyIsInBhc3N3b3JkIjoiNTFTdHJpbmdAIiwiaWF0IjoxNzA0MTEzODAxfQ.8OlHF1yRFr5yN5as_SwuPwzAI-KA0MzDHu79lL5Dawk";

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
      .get("/Account/v1/User/a3d59e85-2ea7-4ae7-8a1b-e265c8dfb963")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send(payload);
  },

  delete: (payload) => {
    return supertest(url)
      .delete("/Account/v1/User/a3d59e85-2ea7-4ae7-8a1b-e265c8dfb963")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send(payload);
  },
};

export default user;
