import request from "@/services/request";

export function chatSet(data) {
  return request({
    url: "/moim/chat",
    method: "post",
    data:{
      "moimId" : data.moimId,
      "userId" : data.id,
      "content": data.message
    }
  });
}
export function chatGet(moimid) {
  return request({
    url: "/moim/chat/"+moimid,
    method: "Get",
  });
}