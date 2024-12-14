export default function AuthError() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600">認証エラー</h1>
        <p className="mt-4 text-gray-600">Authentication Error</p>
        <p className="mt-2 text-gray-500">
          ログインに失敗しました。もう一度お試しください。
        </p>
        <p className="text-gray-500">Login failed. Please try again.</p>
      </div>
    </div>
  );
}
