import request from "@/services/request";
export function MyMoimList(userid) {
    return request({
        url: "/user/moim/" + userid,
        method: "get"
    });
}
export function MoimCreate(data) {
    return request({
        url: "/moim",
        method: "post",
        data: {
            "userId":data.userId,
            "categoryId":data.categoryId,
            "title":data.title,
            "content":data.content,
            "sido":data.sido,
            "sigungu":data.sigungu,
            "dong":data.dong,
            "isPublish":data.isPublish,
            "isFreeEnter":data.isFreeEnter,
            "maxMember":data.maxMember
        }
    });
}