import { createRouter, defineEventHandler, useBase } from "h3";

const router = createRouter();

router.get(
  "/info",
  defineEventHandler((event) => {
    const query = getQuery(event);
    const userInfo = {
      username: "admin",
      sex: "male",
      age: "35",
      logo: "60",
    };
    return userInfo;
  })
);

router.post(
  "/login",
  defineEventHandler(async (event) => {
    const body = await readBody(event);
    console.log(body);
    // 模拟登入成功
    if (body.name == "admin" && body.password == "admin") {
    } else {
      return sendRedirect(
        event,
        "/login?errorMessage=账号或密码错误，账号:admin,密码：admin",
        302
      );
    }
  })
);

export default useBase("/api/user", router.handler);
