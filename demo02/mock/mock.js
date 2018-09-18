
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

let bookData = [
  {
    "id": 1000,
    "name": "白雪公主",
    "price": 9990,
    "ownerId": 10000
  },
  {
    "id": 1001,
    "name": "灰姑娘",
    "price": 1990,
    "ownerId": 10001
  }
]

// 添加 用户|图书
Mock.mock(/(user|book)Add.json/, 'post', function(options) {
  const {
    body,
    url
  } = options;
  // 用作放新用户的信息
  let oldData = /user/.test(url) ? userData : bookData;
  const newData = {};

  // 取最后一个用户的id，加一，当做新增用户的id
  newData.id = oldData[oldData.length - 1].id + 1;

  // 用作标记请求是否失败
  let err = false;

  body.split('&').map((v) => {
    const bodyItem = v.split('=');
    // 将传过来的 name、age、gender 放入 newData 里
    if (bodyItem[0] && bodyItem[1]) {
      // 中文的名字要进行 解码
      if (bodyItem[0] === 'name') {
        bodyItem[1] = decodeURI(bodyItem[1])
      }
      newData[bodyItem[0]] = bodyItem[1];
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
  // 当请求成功时，将新增信息放入 oldData
  oldData.push(newData);

  // 请求成功时，返回用户 id
  return {
    id: newData.id,
    success: true,
  };
})


// 获取 用户|图书 列表
Mock.mock(/(user|book)List.json/, 'get', function(options) {
  const {
    url
  } = options;

  const oldData = /user/.test(url) ? userData : bookData;

  // url 后不带参数
  if (url.indexOf('?') < 0 ) {
    // 返回全部列表
    return {
      data: oldData,
      success: true,
    }
  // url 后带参数
  } else {
    const params = url.split('?')[1];

    const infoData = oldData.filter(function(item){
      return item.id === Number(params.split('=')[1])
    });
    // 返回单个信息
    return {
      info: infoData[0],
      success: true,
    };
  }
});

// 删除 用户|图书
Mock.mock(/(user|book)Del.json/, 'post', function(options) {
  const {
    body,
    url
  } = options;

  let oldData = /user/.test(url) ? userData : bookData;
  
  // 删除此条 id 对应的信息
  oldData.map((item, index) => {
    if (item.id === Number(body.split('=')[1])) {
      oldData.splice(index, 1);
    }
  })

  // 请求成功时，返回新的用户列表
  return {
    data: oldData,
    success: true,
  };
});

// 修改用户信息
Mock.mock(/(user|book)Edit.json/, 'post', function(options) {
  const {
    body,
    url
  } = options;

  let oldData = /user/.test(url) ? userData : bookData;
  // 用作放修改的用户信息
  const modifyData = {};

  // 用作标记请求是否失败
  let err = false;

  body.split('&').map((v) => {
    const bodyItem = v.split('=');
    // 将传过来的参数放入 modifyData 里
    if (bodyItem[0] && bodyItem[1]) {
      // 中文的名字要进行 解码
      if (bodyItem[0] === 'name') {
        bodyItem[1] = decodeURI(bodyItem[1])
      }
      if (bodyItem[0] === 'id') {
        bodyItem[1] = Number(bodyItem[1])
      }
      if (bodyItem[0] === 'ownerId') {
        bodyItem[1] = Number(bodyItem[1])
      }
      modifyData[bodyItem[0]] = bodyItem[1];
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
  oldData.map((item, index) => {
    if (item.id === modifyData.id) {
      oldData[index] = modifyData;
    }
  })

  console.log(oldData, bookData, userData)

  // 请求成功时，返回success 为 true
  return {
    success: true,
    id: modifyData.id,
  };
})
