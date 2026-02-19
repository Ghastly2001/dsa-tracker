const BASE_URL = process.env.BASE_URL || "http://localhost:4000/api";

export const loginUser = async (data: { email: string; password: string }) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  return res.json();
};

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Registration failed");
  }

  return res.json();
};

export const getTopics = async () => {
  const res = await fetch(`${BASE_URL}/topics`);

  if (!res.ok) {
    throw new Error("Failed to fetch topics");
  }

  return res.json();
};

export const getUserProfile = async (token: string) => {
  const res = await fetch(`${BASE_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user profile");
  }

  return res.json();
};

export const toggleProgress = async (problemId: string, token: string) => {
  const res = await fetch(`${BASE_URL}/progress/${problemId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to toggle progress");
  }

  return res.json();
};
