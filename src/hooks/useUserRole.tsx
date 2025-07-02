
import { useState, useEffect } from "react";

type UserRole = "Homeowner" | "Contractor" | "Engineer" | "Developer" | "Admin";

interface UserRoleHook {
  role: UserRole;
  setRole: (role: UserRole) => void;
  permissions: string[];
}

const rolePermissions = {
  Homeowner: ["view_project", "request_quote"],
  Contractor: ["generate_design", "edit_budget", "download_bom", "view_schedule", "view_project", "request_quote"],
  Engineer: ["export_ifc", "modify_design_logic", "generate_design", "edit_budget", "download_bom", "view_schedule", "view_project", "request_quote"],
  Developer: ["generate_design", "edit_budget", "download_bom", "view_schedule", "view_project", "request_quote"],
  Admin: ["manage_users", "set_pricing", "integrate_partners", "export_ifc", "modify_design_logic", "generate_design", "edit_budget", "download_bom", "view_schedule", "view_project", "request_quote"]
};

export const useUserRole = (): UserRoleHook => {
  const [role, setRole] = useState<UserRole>("Contractor");

  useEffect(() => {
    // In a real app, this would come from authentication
    const savedRole = localStorage.getItem("userRole") as UserRole;
    if (savedRole && Object.keys(rolePermissions).includes(savedRole)) {
      setRole(savedRole);
    }
  }, []);

  const updateRole = (newRole: UserRole) => {
    setRole(newRole);
    localStorage.setItem("userRole", newRole);
  };

  return {
    role,
    setRole: updateRole,
    permissions: rolePermissions[role]
  };
};
