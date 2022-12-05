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
  console.log(encodeURI(encodeURIComponent(sido)))
  return request({
    url: "/place/recommend/"+ encodeURI(encodeURIComponent(sido)) +"/" + encodeURI(encodeURIComponent(sigungu)),
    method: "get",
  })
}