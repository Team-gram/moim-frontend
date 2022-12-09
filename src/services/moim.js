import request from "@/services/request";
export function MyMoimList(userid) {
  return request({
    url: "/user/moim/" + userid,
    method: "get",
  });
}
export function MoimCreate(data) {
  return request({
    url: "/moim",
    method: "post",
    data: {
      userId: data.userId,
      categoryId: data.categoryId,
      title: data.title,
      content: data.content,
      sido: data.sido,
      sigungu: data.sigungu,
      dong: data.dong,
      isPublish: data.isPublish,
      isFreeEnter: data.isFreeEnter,
      maxMember: data.maxMember,
    },
  });
}
export function SearchMoim(data) {
  return request({
    url: "/moim",
    method: "get",
    params: {
      categoryId: data.categoryId,
      sido: data.sido,
      sigungu: data.sigungu,
      dong: data.dong,
      title: data.title,
    },
  });
}
export function MoimDetail(id) {
  return request({
    url: "/moim/" + id,
    method: "get",
    params: {
      id: id,
    },
  });
}

export function JoinFreeMoim(id, userId) {
  return request({
    url: "/moim/free",
    method: "post",
    data: {
      moimId: id,
      userId: userId,
    },
  });
}

export function JoinPassMoim(id, userId, message) {
  return request({
    url: "/moim/pass",
    method: "post",
    data: {
      moimId: id,
      userId: userId,
      message: message,
    },
  });
}

export function GetRecommendMoin(userId) {
  return request({
    url: "/user/recommend/" + userId,
    method: "get",
    params: {
      userId: userId,
    },
  });
}

export function newMoimRef(moimId, moimScheduleId, name) {
  return request({
    url: "/meet/ref",
    method: "post",
    data: {
      moimId: moimId, 
      moimScheduleId: moimScheduleId, 
      name: name
    }
  })
}

export function takeMoimRef(id, userId) {
  return request({
    url: "/meet/ref",
    method: "put",
    data: {
      id: id,
      userId: userId
    }
  })
}

export function getMoimRef(moimId, moimScheduleId) {
  return request({
    url: "/meet/ref/"+moimId+"/"+moimScheduleId,
    method: "get",
    params: {
      moimId: moimId,
      moimScheduleId: moimScheduleId
    }
  })
}

export function deleteMoimRef(id) {
  return request({
    url: "/meet/ref",
    method: "delete",
    data: {
      id: id,
    }
  })
}

export function getMoimMember(moimId) {
  return request({
    url: "/moim/member/"+moimId,
    method: "get",
    params: {
      moimId: moimId,
    }
  })
}

export function InviteMoim(moimId, userId, message) {
  return request({
    url: "/moim/invite",
    method: "post",
    data: {
      moimId: moimId,
      userId: userId,
      message: message
    }
  })
}

export function joinMeet(moimId, moimScheduleId, userId) {
  return request({
    url: "/meet",
    method: "post",
    data: {
      moimId: moimId,
      moimScheduleId: moimScheduleId,
      userId: userId,
    }
  })
}

export function getOutMeet(moimId, moimScheduleId, userId) {
  return request({
    url: "/meet",
    method: "delete",
    data: {
      moimId: moimId,
      moimScheduleId: moimScheduleId,
      userId: userId,
    }
  })
}

export function getMeetMembers(moimId, moimScheduleId) {
  return request({
    url: "/meet/"+moimId+"/"+moimScheduleId,
    method: "get",
    data: {
      moimId: moimId,
      moimScheduleId: moimScheduleId,
    }
  })
}

export function LeaveMoim(moimId, userId) {
  return request({
    url: "/moim/leave",
    method: "delete",
    data: {
      moimId: moimId,
      userId: userId,
    }
  })

}

export function changeMoimUserLevel(moimId, userId, level) {
  return request({
    url: "/moim/member/level",
    method: "put",
    data: {
      moimId: moimId,
      userId: userId,
      level: level
    }
  })

}