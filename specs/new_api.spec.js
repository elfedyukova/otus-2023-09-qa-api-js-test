import user from "../framework/services";
import config from "../framework/config";

describe("Генерация токена", () => {
  describe("Генерация токена - успешно", () => {
    test("Успешная", async () => {
      const res = await user.token(config.credential);
      expect(res.body.result).toBe("User authorized successfully.");
      expect(res.status).toBe(200);
      expect(res.body.status).toBe("Success");
    });
  });

  describe("Генерация токена - с ошибкой", () => {
    test("Генерация токена failed.", async () => {
      const res = await user.login("string", "string"); // падает с ошибкой Received: {"code": "1200", "message": "UserName and Password required."}
      expect(res.body).toBe("Failed");
      expect(res.body.result).toBe("User authorization failed.");
    });
  });
});

describe("Авторизация", () => {
  describe("Позитивный тест", () => {
    test("Успешная авторизация", async () => {
      const res = await user.login(config.credential);
      expect(res.body).toBe(true);
      expect(res.status).toBe(200);
    });
  });

  describe("Негативные тесты", () => {
    test("User authorization failed.", async () => {
      const res = await user.login("string", "string"); // Received: "UserName and Password required."
      expect(res.body.code).toBe("1207");
      expect(res.body.message).toBe("User not found!");
      expect(res.status).toBe(404);
    });
  });
});

describe("Получение информации о пользователе", () => {
  describe("Позитивный тест", () => {
    test("Успешное получение информации", async () => {
      const res = await user.info();
      expect(res.body.userId).toBe("d242c2cc-875e-4a4d-b02f-1c8a5ff0632b");
      expect(res.body.username).toBe("string");
      expect(res.status).toBe(200);
    });
  });

  describe("Пользователь не найден", () => {
    test("failed", async () => {
      const res = await user.info("string", "string");
      expect(res.body.code).toBe("1207");
      expect(res.body.message).toBe("User not found!");
    });
  });
});

describe("Удаление пользователя", () => {
  describe("успешно", () => {
    test("Успешное удаление", async () => {
      const res = await user.delete(config.credential);
      expect(res.status).toBe(204);
    });
    describe("Пользователь не найден после удаления", () => {
      test("failed", async () => {
        const res = await user.info(config.credential);
        expect(res.body.code).toBe("1207");
        expect(res.body.message).toBe("User not found!");
      });
    });
  });

  describe("с ошибкой", () => {
    test("failed", async () => {
      const res = await user.delete(config.credential);
      expect(res.status).toBe(200);
      expect(res.body.code).toBe("1207");
      expect(res.body.message).toBe("User Id not correct!");
    });
  });
});
