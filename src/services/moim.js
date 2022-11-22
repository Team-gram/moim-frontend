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
export function SearchMoim(data) {
    return request({
        url: "/moim",
        method: "get",
        params: {
            "categoryId": data.categoryId,
            "sido": data.sido,
            "sigungu": data.sigungu,
            "dong": data.dong,
            "title": data.title,
        }
    })
}
export function MoimDetail(id) {
    return request({
        url: "/moim/"+id,
        method: "get",
        params: {
            "id": id,
        }
    })
}

export function JoinFreeMoim(id, userId){
    return request({
        url: "/moim/free",
        method: "post",
        data: {
            "moimId": id,
            "userId": userId,
        }
    })
}

export function JoinPassMoim(id, userId, message){
    return request({
        url: "/moim/pass",
        method: "post",
        data: {
            "moimId": id,
            "userId": userId,
            "message": message,
        }
    })
}