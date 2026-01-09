type User = {
  name: string;
  email: string;
  password: string;
};

const USERS_KEY = "neurobeats_users";
const SESSION_KEY = "neurobeats_session";

function getUsers(): User[] {
  return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
}

function saveUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function signUp(name: string, email: string, password: string) {
  const users = getUsers();

  const exists = users.find((u) => u.email === email);
  if (exists) {
    throw new Error("User already exists");
  }

  users.push({ name, email, password });
  saveUsers(users);

  localStorage.setItem(SESSION_KEY, email);
}

export function login(email: string, password: string) {
  const users = getUsers();

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    throw new Error("Invalid email or password");
  }

  localStorage.setItem(SESSION_KEY, email);
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

export function getCurrentUser(): User | null {
  const email = localStorage.getItem(SESSION_KEY);
  if (!email) return null;

  const users = getUsers();
  return users.find((u) => u.email === email) || null;
}
