type DynamicObject = {
    [key: string]: string
}
export const getFiledUpdate = (obj, objUpdate) => {
    const updateFiled: DynamicObject = {}
    for (const [key] of Object.entries(objUpdate)) {
        if (obj[key] !== objUpdate[key]) {
            updateFiled[key] = objUpdate[key]
        }
    }
    return updateFiled
}