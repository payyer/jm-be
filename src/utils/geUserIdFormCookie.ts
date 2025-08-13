export const getUserIdFormCookie = (cookie) => {
    const [type, token] = cookie?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
}