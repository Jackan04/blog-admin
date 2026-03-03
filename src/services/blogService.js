class BlogService {
  constructor() {
    this.options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzcyNTY4MjM3LCJleHAiOjE3NzI2NTQ2Mzd9.I5CRLhfzZba6lSy6HND1KCMcq0h2fXXs84cGHq71Rb0`,
      },
    };
  }

  async getAllPosts() {
    const result = await fetch(
      "http://localhost:3000/api/admin/posts",
      this.options,
    );

    return await result.json();
  }
}

export default new BlogService();
