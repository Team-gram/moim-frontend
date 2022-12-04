import request from "@/services/request";

// 모임방 가입 승인
export function MessageAccept(messageId, moimId, userId) {
  return request({
    url: "/user/message/accept",
    method: "post",
    data: {
      "messageId": messageId,
      "moimId": moimId,
      "userId": userId,
    }
  });
}
  
  // 모임방 가입 거절
  export function MessageReject(messageId, moimId, userId) {
    return request({
      url: "/user/message/reject",
      method: "post",
      data: {
        "messageId": messageId,
        "moimId": moimId,
        "userId": userId,
      }
    });
  }

//메시지 조회
export function GetAllMessage(userId) {
  return request({
    url: "/user/message/"+userId,
    method: "get",
    data: {
      "userId": userId,
    }
  })
}