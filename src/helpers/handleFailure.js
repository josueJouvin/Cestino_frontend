import alertToast from "../utilities/alertToast";

export function handleFailure({nameBack,error}) {
    nameBack.current = error.response.data.name;
    alertToast({ type: "error", msg: error.response.data.msg });
}