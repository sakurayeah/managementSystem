import $ from 'jquery';

function fn() {};

export default function request(opts) {
  const {
    data = {},
    url = '',
    success = fn,
    error = fn,
    type = 'POST',
  } = opts;

  // 如果请求地址不存在，则无法往下走
  if (!url) {
    return;
  }

  $.ajax({
    url,
    data,
    type,
    dataType: 'json',
    success: (res) => {
      if (res.success) {
        success(res);
      } else {
        error(res);
      }
    },
    error: (res) => {
      error(res);
    }
  })
}