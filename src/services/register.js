import request from "@/services/request";

export function registerUser(id, name, profileImage, sido, sigungu, dong, gender, birthday, detail, isPublish, categories) {
  return request({
    url: "/join",
    method: "post",
    data: {
      "id": id,
      "name": name,
      "profileImage": profileImage,
      "sido": sido,
      "sigungu": sigungu,
      "dong": dong,
      "birthday": birthday,
      "detail": detail,
      "isPublish": isPublish,
      "categories": categories
    }
  });
}
