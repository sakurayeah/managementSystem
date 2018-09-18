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

export default {
  'POST /userAdd.json': function (req = {}, res) {
    res.json({
      id: 1,
      success: true,
    })
  },

  'POST /userEdit.json': function (req = {}, res) {
    res.json({
      id: 1,
      success: true,
    })
  },

  'GET /userList.json': function(req, res) {
    res.json({
      userData,
      success: true,
    })
  },

  'POST /userDel.json': function(req, res) {
    res.json({
      success: true,
      id: 1
    })
  },

  'GET /bookList.json': function(req, res) {
    res.json({
      bookData,
      success: true,
    })
  },
};
