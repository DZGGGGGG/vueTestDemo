import request from "@/utils/request";

export function getList() {
  return request({
    url: "/familyAdmin/dashboard/getIncome",
    method: "post"
  });
}
export function getFamilyList(data) {
  return request({
    url: "/familyAdmin/member/getMember",
    method: "post",
    data
  });
}

export function shotOffUser(data) {
  return request({
    url: "/familyAdmin/member/removeMember",
    method: "post",
    data
  });
}
