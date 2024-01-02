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
      const res = await user.token({ userName: "string", password: "string" });
      expect(res.body.token).toBe(null);
      expect(res.body.expires).toBe(null);
      expect(res.body.status).toBe("Failed");
      expect(res.body.result).toBe("User authorization failed.");
    });
    test("Генерация токена без пароля и логина", async () => {
      const res = await user.token();
      expect(res.body.code).toBe("1200");
      expect(res.body.message).toBe("UserName and Password required.");
      expect(res.status).toBe(400);
    });
  });
});

describe("Создание пользователя", () => {
  describe("Позитивные тесты", () => {
    test("Успешное создание", async () => {
      function getRandom() {
        return Math.random();
      }
      let randomInt = getRandom();
      const res = await user.signup({
        userName: "string",
        password: randomInt + "560String@",
      });
      expect(res.status).toBe(201);
      expect(res.body.username).toBe("string");
    });
  });

  describe("Создание пользователя - с ошибкой", () => {
    test("Создание пользователя failed.", async () => {
      const res = await user.signup({
        userName: "string",
        password: "56String@",
      });
      expect(res.body.message).toBe("User exists!");
      expect(res.body.code).toBe("1204");
      expect(res.status).toBe(406);
    });
    test("Создание пользователя без пароля и логина", async () => {
      const res = await user.signup();
      expect(res.body.code).toBe("1200");
      expect(res.body.message).toBe("UserName and Password required.");
      expect(res.status).toBe(400);
    });

    test("Создание пользователя с коротким паролем", async () => {
      const res = await user.signup({ userName: "string", password: "t" });
      expect(res.status).toBe(400);
      expect(res.body.code).toBe("1300");
      expect(res.body.message).toBe(
        "Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.",
      );
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
      const res = await user.login({ userName: "string", password: "string" });
      expect(res.body.code).toBe("1207");
      expect(res.body.message).toBe("User not found!");
      expect(res.status).toBe(404);
    });

    test("Авторизация без пароля и логина", async () => {
      const res = await user.login();
      expect(res.body.code).toBe("1200");
      expect(res.body.message).toBe("UserName and Password required.");
      expect(res.status).toBe(400);
    });
  });
});

describe("Получение информации о пользователе", () => {
  describe("Позитивный тест", () => {
    test("Успешное получение информации", async () => {
      const res = await user.info();
      expect(res.body.userId).toBe("8385b6fa-de02-4eaa-ac9a-118c7d69313a");
      expect(res.body.username).toBe("string");
      expect(res.status).toBe(200);
    });
  });

  describe("Негативные тесты", () => {
    test("Пользователь не найден", async () => {
      const res = await user.infoFailed();
      expect(res.body.code).toBe("1207");
      expect(res.body.message).toBe("User not found!");
    });
    test("Получение информации без пароля и логина", async () => {
      const res = await user.infoWithoutToken();
      expect(res.body.code).toBe("1200");
      expect(res.body.message).toBe("User not authorized!");
      expect(res.status).toBe(401);
    });
  });
});

describe("Удаление пользователя", () => {
  describe("успешно", () => {
    test("Успешное удаление", async () => {
      const res = await user.delete(config.credential);
      expect(res.status).toBe(204);
    });
    test("Пользователь не найден после удаления", async () => {
      const res = await user.infoAfterDeleted(config.credential);
      expect(res.body.code).toBe("1207");
      expect(res.body.message).toBe("User not found!");
    });
  });

  describe("Негативные тесты", () => {
    test("Удаление пользователя с несуществующим id", async () => {
      const res = await user.deleteFailed();
      expect(res.status).toBe(200);
      expect(res.body.code).toBe("1207");
      expect(res.body.message).toBe("User Id not correct!");
    });
    test("Удаление пользователя без пароля и логина", async () => {
      const res = await user.deleteWithoutToken();
      expect(res.body.code).toBe("1200");
      expect(res.body.message).toBe("User not authorized!");
      expect(res.status).toBe(401);
    });
  });
});
