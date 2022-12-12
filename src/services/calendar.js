import request from "@/services/request";

export function regularSet(data) {
    return request({
      url: "/user/regular",
      method: "post",
      data: {
        "userId" : data.userId,
        "day" : data.day,
        "startTime" : data.startTime,
        "endTime" : data.endTime,
        "title" : data.title,
        "detail" : data.detail,
        "isPublish" : data.isPublish
      }
    });
  }
  export function regularGet(id) {
    return request({
      url: "/user/schedule/"+id+"/1",
      method: "get",
    });
  }
  export function regularRemove(userID,scheduleId) {
    return request({
      url: "/user/regular/"+userID+"/" +scheduleId,
      method: "delete",
    });
  }
  export function irregularSet(data) {
    return request({
      url: "/user/irregular",
      method: "post",
      data: {
        "userId" : data.userId,
        "date" : data.date,
        "startTime" : data.startTime,
        "endTime" : data.endTime,
        "title" : data.title,
        "detail" : data.detail
      }
    });
  }
  export function irregularGet(id) {
    return request({
      url: "/user/schedule/"+id+"/2",
      method: "get",
    });
  }
  export function irregularRemove(userID,scheduleId){
    return request({
      url: "/user/irregular/"+userID+"/" +scheduleId,
      method: "delete",
    });
  }
