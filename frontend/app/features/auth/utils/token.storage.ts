const TOKEN_KEY = 'auth_token';

const saveToken = (token: string) =>  {
    try {
        if (typeof window !== 'undefined') {
            localStorage.setItem(TOKEN_KEY, token)
        }
    } catch (error) {
        console.error('Error saving token:', error)
    }
}

const getToken = (): string | null => {
    try {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(TOKEN_KEY)
        }
    } catch (error) {
        console.error('Error getting token:', error)
    }
    return null;
}

const removeToken = () => {
    try {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(TOKEN_KEY)
        }
    }
    catch (error) {
        console.error('Error removing token', error)
    }
}

const hasToken = (): boolean => {
    const token = getToken();
    return token !== null;
}


export const tokenStorage = {
    saveToken,
    getToken,
    removeToken,
    hasToken
};

