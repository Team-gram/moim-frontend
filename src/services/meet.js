import request from "@/services/request";

export function AllMeet(moimid){
  return request({
    url: "/meet/"+moimid,
    method: "get",
  });
}

export function SetPlaceTop(file){
  return request({
    url: "/meet/upper",
    method: "post",
    data:file,
    headers: {
      'Content-Type': 'multipart/form-data;charset=utf8',
    }
  });
}
export function PlaceCurrentStatus(id){
  return request({
    url: "/meet/upper/status/"+id,
    method: "get",
  });
}
export function GetPlaceTop(id){
  return request({
    url: "/meet/upper/"+id,
    method: "get",
  });
}
export function historyTopSet(id){
  return request({
    url: "/meet/upper/history",
    method: "get",
    data:{
      placeUpperId : id,
    }
  });
}