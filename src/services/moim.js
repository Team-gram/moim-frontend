import request from "@/services/request";
export function MyMoimList(userid) {
    return request({
        url: "/user/moim/" + userid,
        method: "get"
    });
}
export function MoimCreate(data) {
    return request({
        url: "/moim/",
        method: "post",
        data: {
            "userid" : data
        }
    });
}