
// ! BUAT REQUEST URL REFRESH TOKEN
export const refreshToken = async () => {
    
}

const getCurrentTimeStamp = () => Math.floor(Date.now() / 1000)

export const shouldRefreshToken = (expiresAt) => {
    const currentTimeStamp = getCurrentTimeStamp()
    return expiresAt - currentTimeStamp <= 20
}