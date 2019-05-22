import fetch from 'utils/fetch';

export function getMenu(node){
  return fetch({
    url:'login/loadTree.action?node='+node,
    method:'get'
  });
}

export function logout(){
  return fetch({
    url:'login/logout.action',
    method:'get'
  });
}

export function login(){
  window.location.href = process.env.BASE_API+'login/login.action';
}

export function getUserList(){
  return fetch({
    url:'http://tro1.deppontest.com:8080/gis-history-service/user/list?uerName='+userName+"&gender="+gender+"&pageNum="+pageNum+"&pageSize="+pageSize,
    method: 'get',
    // credentials:'include'
  })
}

export function getButtonAuth(code) {
  var list = new Array()
  list.push({"code":code});
  return fetch({
    url:'login/findPermission.action',
    method: 'post',
    data: 'list='+JSON.stringify(list),//请求数据
    headers:{"Content-Type": "application/x-www-form-urlencoded"}
    
  })
}