// Клас для роботи з API
export default class APIManager {
    constructor() {
        this.baseUrl = 'https://jsonplaceholder.typicode.com';
    }
    async fetchPosts(limit = 6) {
        try {
            const response = await fetch(`${this.baseUrl}/posts?_limit=${limit}`);
            const data = await response.json();
            return data;
        }
        catch (error) {
            console.error('Error fetching posts:', error);
            return [];
        }
    }
    async fetchUsers(limit = 6) {
        try {
            const response = await fetch(`${this.baseUrl}/users?_limit=${limit}`);
            const data = await response.json();
            return data;
        }
        catch (error) {
            console.error('Error fetching users:', error);
            return [];
        }
    }
    async fetchPhotos(limit = 12) {
        try {
            const response = await fetch(`${this.baseUrl}/photos?_limit=${limit}`);
            const data = await response.json();
            return data;
        }
        catch (error) {
            console.error('Error fetching photos:', error);
            return [];
        }
    }
}
