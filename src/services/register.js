import request from "@/services/request";

export function registerUser(data) {
  return request({
    url: "/join",
    method: "post",
    data: {
      "id": data.id,
      "name": data.name,
      "profileImage": data.profileImage,
      "sido": data.sido,
      "sigungu": data.sigungu,
      "dong": data.dong,
      "birthday": data.birthday,
      "detail": data.detail,
      "isPublish": data.isPublish,
      "categories": data.categories,
      "gender": data.gender
    }
  });
}
