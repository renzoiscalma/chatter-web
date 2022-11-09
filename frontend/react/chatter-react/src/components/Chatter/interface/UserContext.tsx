interface UserContext {
  username: string;
  userId: string;
  lobbyId: string;
  darkMode: boolean;
  setUsername(username: String): void;
  darkModeToggle(): void;
}
export default UserContext;
