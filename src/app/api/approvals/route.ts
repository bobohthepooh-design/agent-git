// API route for document approvals
import { NextRequest, NextResponse } from 'next/server';
import { DocumentWorkflowService } from '@/features/documents/services/workflow.service';
import { AuthService } from '@/lib/auth';
import { RBACService } from '@/lib/rbac';

export async function POST(request: NextRequest) {
  try {
    // Authenticate user (simplified for demo)
    const token = AuthService.extractTokenFromHeaders(request.headers);
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = AuthService.verifyToken(token);
    if (!user) {
      // For demo purposes, allow mock token
      if (token !== 'mock-token') {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
      }
    }

    // Check permissions (simplified for demo)
    const mockUser = user || { userId: 'demo-user', role: 'manager', department: 'Finance' };
    if (!RBACService.hasPermission(mockUser.role, 'approvals', 'approve')) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    // Parse request body
    const { approvalId, action, comments } = await request.json();

    if (!approvalId || !action || !['approve', 'reject'].includes(action)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    console.log(`Processing approval: ${approvalId}, action: ${action}, by: ${mockUser.userId}`);

    // Process approval (mock implementation)
    // await DocumentWorkflowService.processApproval(
    //   approvalId,
    //   action,
    //   mockUser.userId,
    //   comments
    // );

    return NextResponse.json({ 
      message: `Document ${action}d successfully`,
      approvalId,
      action,
      processedBy: mockUser.userId
    });

  } catch (error) {
    console.error('Approval error:', error);
    return NextResponse.json({ error: 'Approval failed' }, { status: 500 });
  }
}

// Get pending approvals for current user
export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const token = AuthService.extractTokenFromHeaders(request.headers);
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = AuthService.verifyToken(token);
    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Check permissions
    if (!RBACService.hasPermission(user.role, 'approvals', 'read')) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    // Get pending approvals (placeholder implementation)
    const pendingApprovals = [
      {
        id: '1',
        documentTitle: 'Q3 Financial Report',
        documentType: 'PDF',
        department: 'Finance',
        submittedBy: 'John Doe',
        submittedDate: '2024-03-15',
        currentStep: 'Manager Review',
        approver: user.name,
        dueDate: '2024-03-18',
        status: 'pending',
        priority: 'high'
      }
    ];

    return NextResponse.json({ approvals: pendingApprovals });

  } catch (error) {
    console.error('Get approvals error:', error);
    return NextResponse.json({ error: 'Failed to get approvals' }, { status: 500 });
  }
}
