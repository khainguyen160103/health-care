import { useAuthContext } from "../../context/AuthContext";
import { useSignOut } from "../../hooks/useAuth";
import Button from "../ui/button/Button";

interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  department?: string;
}

interface HeaderProps {
  user: User;
}

export default function Header({ user }: HeaderProps) {
  const signOutMutation = useSignOut();

  const handleLogout = () => {
    signOutMutation.mutate();
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Welcome, {user.first_name} {user.last_name}
          </h2>
          <span className="ml-3 text-sm text-gray-500 capitalize">
            ({user.role})
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {user.email}
          </span>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            disabled={signOutMutation.isPending}
          >
            {signOutMutation.isPending ? "Logging out..." : "Logout"}
          </Button>
        </div>
      </div>
    </header>
  );
}