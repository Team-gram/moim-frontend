import request from "@/services/request";
export function getLogin() {
    return request({
        url: "/login",
        method: "get"
    });
}
export function getUserinfo(id) {
    return request({
        url: "/user/" + id,
        method: "get"
    });
}
export function getJwt() {
    return request({
        url: "/jwt/" + this.$store.jwt,
        method: "get"
    });
}