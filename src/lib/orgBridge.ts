let activeOrgId: string | null = null;

export function setActiveOrgIdForApi(orgId: string | null) {
  activeOrgId = orgId;
}

export function getActiveOrgIdForApi(): string | null {
  return activeOrgId;
}
