import { Post, User, Photo } from '../Types/api.js';

// Клас для роботи з API
export default class APIManager {
  private readonly baseUrl: string = 'https://jsonplaceholder.typicode.com';

  public async fetchPosts(limit: number = 6): Promise<Post[]> {
    try {
      const response: Response = await fetch(`${this.baseUrl}/posts?_limit=${limit}`);
      const data: Post[] = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      return [];
    }
  }

  public async fetchUsers(limit: number = 6): Promise<User[]> {
    try {
      const response: Response = await fetch(`${this.baseUrl}/users?_limit=${limit}`);
      const data: User[] = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  }

  public async fetchPhotos(limit: number = 12): Promise<Photo[]> {
    try {
      const response: Response = await fetch(`${this.baseUrl}/photos?_limit=${limit}`);
      const data: Photo[] = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching photos:', error);
      return [];
    }
  }
}
