import LoginForm from "@/components/auth/LoginForm";

export const metadata = {
  title: "Đăng nhập - GenLingo",
  description: "Đăng nhập vào GenLingo để học tiếng Anh",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <LoginForm />
    </div>
  );
}
