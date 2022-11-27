import request from "@/services/request";

export function regularMoimSet(data) {
    return request({
      url: "/moim/regular",
      method: "post",
      data: {
        "moimId" : data.moimId,
        "day" : data.day,
        "startTime" : data.startTime,
        "endTime" : data.endTime,
        "scheduleName" : data.scheduleName,
        "scheduleDetail" : data.scheduleDetail
      }
    });
  }
  export function regularMoimGet(id) {
    return request({
      url: "/moim/schedule/"+id+"/1",
      method: "get",
    });
  }
  export function regularMoimRemove(userID,scheduleId) {
    return request({
      url: "/moim/regular/"+userID+"/" +scheduleId,
      method: "delete",
    });
  }

  export function irregularMoimGet(id) {
    return request({
      url: "/moim/schedule/"+id+"/2",
      method: "get",
    });
  }
  export function irregularMoimRemove(userID,scheduleId){
    return request({
      url: "/moim/irregular/"+userID+"/" +scheduleId,
      method: "delete",
    });
  }
