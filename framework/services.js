// контроллеры, обёртка запросов к API
import supertest from "supertest";
import config from "./config";

const { url } = config;

let token = "";
let userID = "f6223abe-ef23-4a75-93cf-679dc5245b5f";
let isbn = "9781449325862";

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

  signup: (payload) => {
    return supertest(url)
      .post("/Account/v1/User")
      .set("Accept", "application/json")
      .send(payload);
  },

  info: (payload, userID) => {
    return supertest(url)
      .get(`/Account/v1/User/${userID}`)
      .set("Accept", "application/json")
      .set(
        "Authorization",
        `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InN0cmluZyIsInBhc3N3b3JkIjoiMTg1OTdTdHJpbmdAMCIsImlhdCI6MTcwODUyOTQwMX0.4I49ZvVDoopR-xlPj6QAXIzZFo6e_AafnahNMPP6pFc`,
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
      .get(`/Account/v1/User/${userID}`)
      .set("Accept", "application/json")
      .send(payload);
  },

  infoAfterDeleted: (payload) => {
    return supertest(url)
      .get(`"/Account/v1/User/${userID}`)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send(payload);
  },

  delete: (payload) => {
    return supertest(url)
      .delete(`/Account/v1/User/${userID}`)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send(payload);
  },

  deleteWithoutToken: (payload) => {
    return supertest(url)
      .delete(`/Account/v1/User/${userID}`)
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

  createBook: (payload) => {
    return supertest(url)
      .post("/BookStore/v1/Books")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send(payload);
  },

  createBookWithoutToken: (payload) => {
    return supertest(url)
      .post("/BookStore/v1/Books")
      .set("Accept", "application/json")
      .send(payload);
  },

  updateBook: (payload) => {
    return supertest(url)
      .put(`/BookStore/v1/Books/${isbn}`)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send(payload);
  },

  updateBookWithoutToken: (payload) => {
    return supertest(url)
      .put(`/BookStore/v1/Books/${isbn}`)
      .set("Accept", "application/json")
      .send(payload);
  },

  getInfoBook: (payload) => {
    return supertest(url)
      .get("/BookStore/v1/Book?ISBN=9781449325862")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send(payload);
  },

  getInfoBookWithoutIsbn: (payload) => {
    return supertest(url)
      .get("/BookStore/v1/Book?ISBN=")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send(payload);
  },

  getInfoBookWithoutToken: (payload) => {
    return supertest(url)
      .get(`/BookStore/v1/Book?ISBN=${isbn}`)
      .set("Accept", "application/json")
      .send(payload);
  },

  deleteBook: (payload) => {
    return supertest(url)
      .delete("/BookStore/v1/Book")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send(payload);
  },

  deleteBookWithoutToken: (payload) => {
    return supertest(url)
      .delete("/BookStore/v1/Book")
      .set("Accept", "application/json")
      .send(payload);
  },

  deleteBookFailed: (payload) => {
    return supertest(url)
      .delete("/BookStore/v1/Book")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send(payload);
  },
};

export default user;
