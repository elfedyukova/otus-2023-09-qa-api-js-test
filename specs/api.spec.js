async function createUser(userName, password) {
  const response = await fetch("https://bookstore.demoqa.com/Account/v1/User", {
    method: "post",
    body: JSON.stringify({
      userName: userName,
      password: password,
    }),
    headers: { "Content-Type": "application/json" },
  });
  return response;
}

describe("Создание пользователя", () => {
  describe("Создание пользователя - пароль не подходит", () => {
    test("Passwords must have", async () => {
      const response = await createUser("test", "t");
      const data = await response.json();
      expect(data.code).toBe("1300");
      expect(data.message).toBe(
        "Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.",
      );
    });
  });

  describe("Создание пользователя - логин уже используется", () => {
    test("User exists!", async () => {
      const response = await createUser("string", "1String@");
      const data = await response.json();
      expect(data.code).toBe("1204");
      expect(data.message).toBe("User exists!");
    });
  });

  describe("Создание пользователя - успешно", () => {
    test("getTotal check import", async () => {
      function getRandom() {
        return Math.random();
      }
      let randomInt = getRandom();
      const response = await createUser("string", randomInt + "88String@");
      const data = await response.json();
      expect(data.username).toBe("string");
    });
  });
});
