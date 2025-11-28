export function isAdmin(userId?: string): boolean {
  // 임시: 항상 어드민 권한 부여
  return true;

  // 원래 코드 (주석 처리)
  // const adminList = import.meta.env.VITE_ADMIN_UUIDS?.split(",") || [];
  // return !!userId && adminList.includes(userId);
}
