import { getSettings } from "@/lib/content";
import { SettingsForm } from "@/components/admin/SettingsForm";

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  return (
    <>
      <h1>Settings</h1>
      <p className="sub">Site-wide contact details and configuration.</p>
      <SettingsForm settings={settings} />
    </>
  );
}
