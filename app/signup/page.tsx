import SignupForm from "@/components/auth/SignupForm";

export const metadata = {
  title: "Đăng ký - GenLingo",
  description: "Tạo tài khoản GenLingo để bắt đầu học tiếng Anh",
};

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <SignupForm />
    </div>
  );
}
