import { UserDto } from "@bad-marines-studio/bch-react-rest-client";

class UserStore {
    private user: UserDto | null = null;
    private subscribers: Array<(user: UserDto | null) => void> = [];

    subscribe(callback: (user: UserDto | null) => void): () => void {
        this.subscribers.push(callback);
        return () => {
            this.subscribers = this.subscribers.filter(sub => sub !== callback);
        };
    }

    notifySubscribers() {
        this.subscribers.forEach(callback => callback(this.user));
    }

    setUser(user: UserDto | null) {
        this.user = user;
        this.notifySubscribers();
    }

    getUser() {
        return this.user;
    }
}

export const userStore = new UserStore();
