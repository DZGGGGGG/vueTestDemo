import { login, logout, getInfo } from "@/api/user";
import { getList,getFamilyList,shotOffUser,createuser } from "@/api/dashboard";
import {
  getToken,
  setToken,
  removeToken,
  setFamilyId,
  getFamilyId
} from "@/utils/auth";
import { resetRouter } from "@/router";

const getDefaultState = () => {
  return {
    token: getToken(),
    familyId: getFamilyId(),
    name: "",
    avatar: ""
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  }
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ familyId: username.trim(), password: password })
        .then(response => {
          const { data } = response;
          commit("SET_TOKEN", data.token);
          console.log("---------", data);
          setToken(data.token);
          setFamilyId(username.trim());
          resolve(response);
        })
        .catch(error => {
          console.log("---------", error);
          reject(error);
        });
    });
  },

  // get user info
  getList({ commit, state }) {
    return new Promise((resolve, reject) => {
      getList()
        .then(response => {
          const { data } = response;
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getFamilyList({ commit, state }, info) {
    return new Promise((resolve, reject) => {
      getFamilyList(info)
        .then(response => {
          const { data } = response;
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  shotOffUser({ commit, state }, userId) {
    return new Promise((resolve, reject) => {
      shotOffUser(userId)
        .then(response => {
          const { data } = response;
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  createuser({ commit, state }, info) {
    return new Promise((resolve, reject) => {
      createuser(info)
        .then(response => {
          const { data } = response;
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          removeToken(); // must remove  token  first
          resetRouter();
          commit("RESET_STATE");
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken(); // must remove  token  first
      commit("RESET_STATE");
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
