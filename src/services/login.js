import request from "@/services/request";
export async function getLogin() {
    return await request({
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