export class ApiFetch {
  constructor() {
    this.baseUrl = "dd";
  }

  async get(url) {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      const message = await response.text();
      throw new Error(` request failed: ${response.status} ${message}`);
    }
    return response.json();
  }

  async post(urt, data){
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(` request failed: ${response.status} ${message}`);
  }
  return response.json()
  }

  async del(url) {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      const message = await response.text();
      throw new Error(` request failed: ${response.status} ${message}`);
    }
    return response.json();
  }


}
