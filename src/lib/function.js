import { useLocation, useNavigate, useParams } from "react-router-dom";

export function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }
  return ComponentWithRouterProp;
}

export let abortController;

export const apiConnection = async(endpoint, method="GET", data=null) => {
    abortController = new AbortController(); 
    const baseUrl = "http://localhost:5506/api/blog";

    let options = {
        mode: "cors",
        method: method,
        headers: { "Content-Type": "application/json" },
        signal : abortController.signal
    };

    let optionsData;
    if(data) {
        optionsData = { ...options, body : JSON.stringify(data)};
        options = optionsData
    }

    const response = await fetch(baseUrl + endpoint, options);
    return response.json();
};

export const connectApiToFetchImage = async (endpoint, method="GET", data=null)=>{
    const baseUrl = "http://localhost:5506/api/blog"; // /post

    let formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }
    let options = {
        mode: "cors",
        method: method,
        body: formData,
       
    };
    const response = await fetch(baseUrl + endpoint, options);
    return response.json();
}

export const connectToProtectedApi = async(endpoint, accessToken='', method="GET", data=null)=>{
  abortController = new AbortController();
  const baseUrl = "http://localhost:5506/api/blog";
  let options = {
    mode: "cors",
    method: method,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    },
    signal: abortController.signal
  };

  if(data) {
    let optionsData = {...options, body: JSON.stringify(data)};
    options = optionsData
  }
  const response = await fetch(baseUrl + endpoint, options);
  return response.json()
};