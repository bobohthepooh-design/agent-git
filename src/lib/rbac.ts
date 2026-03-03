// Role-Based Access Control (RBAC)
export interface Permission {
  resource: string;
  action: string;
  conditions?: Record<string, any>;
}

export interface Role {
  id: string;
  name: string;
  permissions: Permission[];
}

export class RBACService {
  private static roles: Map<string, Role> = new Map();

  static defineRole(roleId: string, role: Role): void {
    this.roles.set(roleId, role);
  }

  static hasPermission(
    userRole: string,
    resource: string,
    action: string,
    context?: Record<string, any>
  ): boolean {
    const role = this.roles.get(userRole);
    if (!role) return false;

    return role.permissions.some(permission => {
      const matchesResource = permission.resource === resource || permission.resource === '*';
      const matchesAction = permission.action === action || permission.action === '*';
      
      if (!matchesResource || !matchesAction) return false;

      // Check conditions if any
      if (permission.conditions && context) {
        return this.checkConditions(permission.conditions, context);
      }

      return true;
    });
  }

  private static checkConditions(
    conditions: Record<string, any>,
    context: Record<string, any>
  ): boolean {
    return Object.entries(conditions).every(([key, value]) => {
      return context[key] === value;
    });
  }

  static getUserPermissions(userRole: string): Permission[] {
    const role = this.roles.get(userRole);
    return role?.permissions || [];
  }
}

// Define default roles
RBACService.defineRole('admin', {
  id: 'admin',
  name: 'Administrator',
  permissions: [
    { resource: '*', action: '*' }, // Full access
  ],
});

RBACService.defineRole('manager', {
  id: 'manager',
  name: 'Manager',
  permissions: [
    { resource: 'documents', action: 'read' },
    { resource: 'documents', action: 'write' },
    { resource: 'documents', action: 'delete' },
    { resource: 'approvals', action: 'read' },
    { resource: 'approvals', action: 'approve' },
    { resource: 'users', action: 'read', conditions: { department: 'same' } },
  ],
});

RBACService.defineRole('user', {
  id: 'user',
  name: 'User',
  permissions: [
    { resource: 'documents', action: 'read', conditions: { department: 'same' } },
    { resource: 'documents', action: 'write' },
    { resource: 'approvals', action: 'read', conditions: { assigned: true } },
  ],
});

RBACService.defineRole('auditor', {
  id: 'auditor',
  name: 'Auditor',
  permissions: [
    { resource: 'documents', action: 'read' },
    { resource: 'audit', action: 'read' },
    { resource: 'audit', action: 'write' },
  ],
});
