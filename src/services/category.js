import request from "@/services/request";

export function getAllParentCategory() {
  return request({
    url: "/category/0",
    method: "get",
  });
}

export function getChildCategory(parentId) {
  return request({
    url: "/category/"+parentId,
    method: "get",
  });
}
export function getCategoryname(categoryId){
  return request({
    url: "/category/name/"+categoryId,
    method: "get",
  });
}