// API route for document upload
import { NextRequest, NextResponse } from 'next/server';
import { DocumentWorkflowService } from '@/features/documents/services/workflow.service';
import { AuthService } from '@/lib/auth';
import { RBACService } from '@/lib/rbac';

export async function POST(request: NextRequest) {
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
    if (!RBACService.hasPermission(user.role, 'documents', 'write')) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    // Parse form data
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const department = formData.get('department') as string;
    const confidentiality = formData.get('confidentiality') as string;

    if (!file || !title || !department) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate file
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      return NextResponse.json({ error: 'File too large' }, { status: 400 });
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload document
    const document = await DocumentWorkflowService.uploadDocument(buffer, {
      title,
      description,
      department,
      confidentiality,
      uploadedBy: user.userId
    });

    // Initiate approval workflow
    await DocumentWorkflowService.initiateApproval(
      document.id,
      `${department}_workflow`,
      user.userId
    );

    return NextResponse.json({ 
      message: 'Document uploaded successfully',
      document 
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
