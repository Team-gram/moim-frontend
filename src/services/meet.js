import request from "@/services/request";

export function AllMeet(moimid){
  return request({
    url: "/meet/"+moimid,
    method: "get",
  });
}