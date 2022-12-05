import request from "@/services/request";

export function historySet(data,text) {
  return request({
    url: "/place/history",
    method: "post",
    data: {
      "addressId": data.id,
      "placeName": data.place_name,
      "categoryGroupName": data.category_group_name,
      "sido": text[0],
      "sigungu": text[1],
      "dong": text[2]
    }
  })
}
export function recommendplace(sido,sigungu) {
  return request({
    url: "/place/recommend/?sido="+sido +"&sigungu=" +sigungu,
    method: "get",
  })
}
export function MoimplaceSet(MoimId,Scheduleid,place) {
  let text = String(place.road_address_name).split(" ");
  return request({
    url: "/place",
    method: "post",
    data: {
      "moimId": MoimId,
      "scheduleId": Scheduleid,
      "addressId": place.id,
      "placeName" : place.place_name,
      "sido": text[0],
      "sigungu": text[1],
      "dong": text[2]
    }
  })
}
export function MoimplaceGet(MoimId,Scheduleid) {
  return request({
    url: "/place/"+MoimId+"/"+Scheduleid,
    method: "get",
  })
}
export function MoimplaceRemove(placeId) {
  return request({
    url: "/place/" + placeId,
    method: "delete",
  })
}