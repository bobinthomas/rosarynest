"use client";

export function LogoutButton() {
  return (
    <button
      type="button"
      className="admin-btn secondary"
      onClick={async () => {
        await fetch("/api/auth", { method: "DELETE" });
        window.location.href = "/admin/login";
      }}
    >
      Log out
    </button>
  );
}
