// Simple authentication service for admin access
const ADMIN_CREDENTIALS = {
  email: 'duku@joben.eu',
  password: 'Bigboss2025'
};

export class AuthService {
  private static readonly TOKEN_KEY = 'admin_token';
  private static readonly LOGIN_KEY = 'admin_logged_in';

  // Login with email and password
  static login(email: string, password: string): boolean {
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      // Generate a simple token (in production, use proper JWT)
      const token = btoa(`${email}:${Date.now()}`);
      localStorage.setItem(this.TOKEN_KEY, token);
      localStorage.setItem(this.LOGIN_KEY, 'true');
      return true;
    }
    return false;
  }

  // Logout
  static logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.LOGIN_KEY);
  }

  // Check if user is authenticated
  static isAuthenticated(): boolean {
    return localStorage.getItem(this.LOGIN_KEY) === 'true';
  }

  // Get stored token
  static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Validate session (check if token exists and is not expired)
  static validateSession(): boolean {
    const token = this.getToken();
    const isLoggedIn = this.isAuthenticated();
    
    if (!token || !isLoggedIn) {
      return false;
    }

    try {
      // Simple token validation (decode and check timestamp)
      const decoded = atob(token);
      const [email, timestamp] = decoded.split(':');
      
      // Token expires after 24 hours
      const tokenAge = Date.now() - parseInt(timestamp);
      const twentyFourHours = 24 * 60 * 60 * 1000;
      
      if (tokenAge > twentyFourHours) {
        this.logout();
        return false;
      }
      
      return email === ADMIN_CREDENTIALS.email;
    } catch (error) {
      this.logout();
      return false;
    }
  }
}