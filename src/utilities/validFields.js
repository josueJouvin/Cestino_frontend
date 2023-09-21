import alertToast from "./alertToast";

export function validFields(requiredFields) {
    if (requiredFields.some((field) => !field.trim() || typeof field !== "string")) {
        alertToast({type:"error", msg:"Todos los campos son obligatorios." })
        return false
    }
    return true
}