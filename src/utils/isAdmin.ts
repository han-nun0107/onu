export function isAdmin(userId?: string): boolean {
  const adminList =
    import.meta.env.VITE_ADMIN_UUIDS?.split(",").map((id: string) =>
      id.trim(),
    ) || [];
  return !!userId && adminList.includes(userId);
}
