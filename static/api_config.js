var api = {
  table_list: "/AdminApi/PassageUser/GetIndexPaged",
  edit_table_item: "/AdminApi/PassageUser/Edit",
  table_item_details: "/AdminApi/PassageUser/Detail",
  del_table_item:'/AdminApi/PassageUser/Delete'
};
const host = "http://ysl.entfly.com"; // 开发域名
// const host = 'https://1.mengniuarla.com'  // 生产域名
var is_debug = true;

module.exports = {
  host,
  api: api,
  is_debug: is_debug
};
