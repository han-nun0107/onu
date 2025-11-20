type User = {
  avatar_url: string;
  email: string;
  created_at: string;
};

export default function UserInfo({ user }: { user: User }) {
  return (
    <article className="mt-11 flex flex-col items-center justify-center gap-3">
      <div className="flex items-center justify-center gap-4">
        <img
          src={user.avatar_url}
          alt="profile"
          className="h-20 w-20 rounded-full border-4 border-indigo-300 shadow-lg"
        />
        <h2 className="text-xl font-bold">{user.email || "user@email.com"}</h2>
      </div>
      <p className="text-sm text-gray-500">{`가입일: ${
        user.created_at || "가입일: --"
      }`}</p>
    </article>
  );
}
