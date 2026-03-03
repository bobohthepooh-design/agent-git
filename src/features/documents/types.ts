// Document types for Bank-DMS
export interface Document {
  id: string;
  title: string;
  description?: string;
  content?: string;
  fileUrl?: string;
  fileHash?: string;
  fileSize?: number;
  fileType?: string;
  version: number;
  status: 'draft' | 'pending_approval' | 'approved' | 'rejected' | 'archived';
  department: string;
  confidentiality: 'public' | 'internal' | 'confidential' | 'secret';
  retentionPolicy?: string;
  createdBy: string;
  approvedBy?: string;
  createdAt: Date;
  updatedAt: Date;
  expiresAt?: Date;
}

export interface DocumentVersion {
  id: string;
  documentId: string;
  version: number;
  title: string;
  content?: string;
  fileUrl?: string;
  fileHash: string;
  fileSize?: number;
  fileType?: string;
  changeLog?: string;
  createdBy: string;
  createdAt: Date;
}

export interface Approval {
  id: string;
  documentId: string;
  workflowId: string;
  step: number;
  approverId: string;
  approverName: string;
  approverRole: string;
  status: 'pending' | 'approved' | 'rejected' | 'escalated';
  comments?: string;
  actionDate?: Date;
  dueDate?: Date;
  createdAt: Date;
}

export interface Workflow {
  id: string;
  name: string;
  description?: string;
  department: string;
  steps: WorkflowStep[];
  isActive: boolean;
  createdAt: Date;
}

export interface WorkflowStep {
  id: string;
  step: number;
  role: string;
  action: 'approve' | 'review' | 'sign';
  dueDays?: number;
  escalationRole?: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  resourceType: 'document' | 'user' | 'role' | 'workflow';
  resourceId: string;
  oldValues?: Record<string, any>;
  newValues?: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
  blockchainHash?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  department: string;
  role: string;
  permissions: string[];
  isActive: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Role {
  id: string;
  name: string;
  description?: string;
  permissions: Permission[];
  department?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  resource: string;
  action: string;
  conditions?: Record<string, any>;
}

export interface RetentionPolicy {
  id: string;
  name: string;
  description?: string;
  department: string;
  documentTypes: string[];
  retentionPeriod: number; // in days
  actionAfterRetention: 'delete' | 'archive' | 'review';
  isActive: boolean;
  createdAt: Date;
}
