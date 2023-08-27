export const generateId = () => {
    const random = Math.random().toString(36).slice(2)
    const date = Date.now().toString(36)
    return "ces" + random + date
}