
const Mock = require('mockjs');

let userData = [
  {
    "id": 10000,
    "name": "一韬",
    "age": "25",
    "gender": "male"
  },
  {
    "id": 10001,
    "name": "张三",
    "age": "30",
    "gender": "female"
  }
]

// 模拟 添加用户 的后台返回
Mock.mock(/userAdd.json/, 'post', function(options) {
  const {
    body
  } = options;
  // 用作放新用户的信息
  const newUser = {};

  // 取最后一个用户的id，加一，当做新增用户的id
  newUser.id = userData[userData.length - 1].id + 1;

  // 用作标记请求是否失败
  let err = false;

  body.split('&').map((v) => {
    const bodyItem = v.split('=');
    // 将传过来的 name、age、gender 放入 newUser 里
    if (bodyItem[0] && bodyItem[1]) {
      // 中文的名字要进行 解码
      if (bodyItem[0] === 'name') {
        bodyItem[1] = decodeURI(bodyItem[1])
      }
      newUser[bodyItem[0]] = bodyItem[1];
    // 如果上面传的内容不存在，则当做请求失败
    } else {
      err = true;
    }
  });

  // err 为 true 时，模拟请求失败的情况
  if (err) {
    return {
      success: false
    }
  }

  // 当请求成功时，将新增的用户信息放入 userData
  userData.push(newUser);

  // 请求成功时，返回用户 id
  return {
    id: newUser.id,
    success: true,
  };
})


// 获取 用户|图书 列表
Mock.mock(/userList.json/, 'get', function(options) {
  const {
    url
  } = options;

  // url 后不带参数
  if (url.indexOf('?') < 0 ) {
    // 返回全部用户列表
    return {
      data: userData,
      success: true,
    }
  // url 后带参数
  } else {
    const params = url.split('?')[1];

    const userInfo = userData.filter(function(item){
      return item.id === Number(params.split('=')[1])
    });
    // 返回单个用户信息
    return {
      info: userInfo[0],
      success: true,
    };
  }
});

// 模拟 删除用户 的后台返回
Mock.mock(/userDel.json/, 'post', function(options) {
  const {
    body
  } = options;

  userData = userData.filter(function(item){
    return item.id !== Number(body.split('=')[1])
  });

  // 请求成功时，返回新的用户列表
  return {
    data: userData,
    success: true,
  };
});

// 模拟 修改用户信息 的后台返回
Mock.mock(/userEdit.json/, 'post', function(options) {
  const {
    body
  } = options;

  // 用作放修改的用户信息
  const modifyUser = {};

  // 用作标记请求是否失败
  let err = false;

  body.split('&').map((v) => {
    const bodyItem = v.split('=');
    // 将传过来的 name、age、gender、id 放入 modifyUser 里
    if (bodyItem[0] && bodyItem[1]) {
      // 中文的名字要进行 解码
      if (bodyItem[0] === 'name') {
        bodyItem[1] = decodeURI(bodyItem[1])
      }
      if (bodyItem[0] === 'id') {
        bodyItem[1] = Number(bodyItem[1])
      }
      modifyUser[bodyItem[0]] = bodyItem[1];
    // 如果上面传的内容不存在，则当做请求失败
    } else {
      err = true;
    }
  });

  // err 为 true 时，模拟请求失败的情况
  if (err) {
    return {
      success: false
    }
  }

  // 当请求成功时，将老的一条替换成新的一条
  userData.map((item, index) => {
    if (item.id === modifyUser.id) {
      userData[index] = modifyUser;
    }
  })

  // 请求成功时，返回success 为 true
  return {
    success: true,
    id: modifyUser.id,
  };
})
