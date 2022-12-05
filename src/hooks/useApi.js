import useAuth from "./useAuth";

const useApi = () => {
  const { auth, setAuth } = useAuth();
  const baseUrl = "http://localhost:5506/api/blog";
  let controller;
  const openCall = async (
    endpoint,
    method = "GET",
    data = null,
  ) => {
    controller = new AbortController();
    let options = {
      mode: "cors",
      method: method,
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      signal: controller.signal,
    };

    let optionsData;
    if (data) {
      optionsData = {
        ...options, 
        body: JSON.stringify(data)
      };
      options = optionsData;
    }

    const response = await fetch(baseUrl + endpoint, options);
    return response.json();
  };

  const protectedCall = async (
    endpoint,
    method = "GET",
    data = null,
    upload = false
  ) => {
    controller = new AbortController();
    const { accessToken } = auth;
    let options = {
      mode: "cors",
      method: method,
      signal: controller.signal,
    };

    let optionsData;
    if (data) {
      if (upload) {
        let formData = new FormData();
        for (const [key, value] of Object.entries(data)) {
          formData.append(key, value);
        }

        optionsData = {
          ...options,
          body: formData,
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
        options = optionsData;
      } else {
        optionsData = {
          ...options,
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${accessToken}`,
          },
        };
        options = optionsData;
      }
    } else {
      optionsData = {
        ...options,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
      };
      options = optionsData;
    }

    const response = await fetch(baseUrl + endpoint, options);
    return response.json();
  };

  const logIn = async (user = {}) => {
    const method = "POST";
    const loginEndpoint = "/users/login";

    return await openCall(loginEndpoint, method, user);
  };

  const uploadCall = async(
    endpoint,
    method = 'GET',
    data = null
  ) => {
    let formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    };
    const {access_token} = auth;
    let options = {
      mode: "cors",
      method: method,
      body: formData,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${access_token}`,
      }
  };
  const response = await fetch(baseUrl + endpoint, options);
  return response.json();
  };

  return { openCall, protectedCall, controller, logIn, uploadCall, setAuth, auth };
};

export default useApi;