import { ACCESS_TOKEN_KEY } from "../../constants/auth";

class TokenStore {
    private token: string | null = localStorage.getItem(ACCESS_TOKEN_KEY);
    private subscribers: ((token: string | null) => void)[] = [];

    subscribe(callback: (token: string | null) => void): () => void {
        this.subscribers.push(callback);
        return () => {
            this.subscribers = this.subscribers.filter(sub => sub !== callback);
        };
    }

    notifySubscribers() {
        this.subscribers.forEach(callback => callback(this.token));
    }

    setToken(token: string | null) {
        this.token = token;
        if (token) localStorage.setItem(ACCESS_TOKEN_KEY, token);
        else localStorage.removeItem(ACCESS_TOKEN_KEY);
        this.notifySubscribers();
    }

    getToken() {
        return this.token;
    }
}

export const tokenStore = new TokenStore();
