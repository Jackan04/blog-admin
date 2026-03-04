export default class BlogService {
  constructor() {
    this.baseUrl = "http://localhost:3000/api";
  }

  // Private helper to handle all fetch logic
  async #request(endpoint, method = "GET", body = null) {
    const url = `${this.baseUrl}${endpoint}`;

    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwt") || "",
      },
    };

    if (body && ["POST", "PUT", "PATCH"].includes(method)) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data.message);
      error.statusCode = data.statusCode || response.status;
      error.validationErrors = data.validationErrors || [];
      throw error; 
    }

    return data;
  }

  async getAllPosts() {
    return this.#request("/admin/posts");
  }

  async login(credentials) {
    const data = await this.#request("/auth/login", "POST", credentials);
    if (data.token) {
      localStorage.setItem("jwt", data.token);
    }
    return data;
  }

  logout() {
    localStorage.removeItem("jwt");
  }
}
