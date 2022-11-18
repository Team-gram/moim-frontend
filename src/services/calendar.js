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
        "detail" : data.detail
      }
    });
  }