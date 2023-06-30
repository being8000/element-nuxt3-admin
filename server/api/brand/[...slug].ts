import { createRouter, defineEventHandler, useBase } from "h3";
import Mock from "mockjs";
const router = createRouter();

router.get(
  "/list",
  defineEventHandler((event) => {
    const query = getQuery(event);
    const { pageSize } = query;
    const Random = Mock.Random;
    var data = Mock.mock({
      // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
      [`records|${pageSize || 10}`]: [
        {
          // 属性 id 是一个自增数，起始值为 1，每次增 1
          "id|+1": 1,
          brandName: "@firstName @title(1)",
          "status|1": ["published", "draft", "deleted"],
          firstName: "@first",
          createTime: "@datetime",
          updateTime: "@datetime",
          logo: function () {
            return Random.image(
              "200x100",
              Random.color(),
              "#FFF",
              "png",
              Random.string("firstName")
            );
          },
        },
      ],
    });
    data.total = data.records.length * 4;
    return data;
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

export default useBase("/api/brand", router.handler);
