// API route for document upload
import { NextRequest, NextResponse } from 'next/server';
import { DocumentWorkflowService } from '@/features/documents/services/workflow.service';
import { AuthService } from '@/lib/auth';
import { RBACService } from '@/lib/rbac';

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 API: Upload request received');
    
    // Authenticate user (simplified for demo)
    const token = AuthService.extractTokenFromHeaders(request.headers);
    console.log('🔐 Token:', token ? 'Present' : 'Missing');
    
    if (!token) {
      console.error('❌ No token provided');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = AuthService.verifyToken(token);
    if (!user) {
      // For demo purposes, allow mock token
      if (token !== 'mock-token') {
        console.error('❌ Invalid token');
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
      }
      console.log('✅ Using mock token for demo');
    }

    // Check permissions (simplified for demo)
    const mockUser = user || { userId: 'demo-user', role: 'manager', department: 'Finance' };
    console.log('👤 User:', mockUser);
    
    if (!RBACService.hasPermission(mockUser.role, 'documents', 'write')) {
      console.error('❌ Insufficient permissions');
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    // Parse form data
    const formData = await request.formData();
    console.log('📋 FormData received');
    
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const department = formData.get('department') as string;
    const confidentiality = formData.get('confidentiality') as string;

    console.log('📁 File info:', file ? { name: file.name, size: file.size, type: file.type } : 'No file');
    console.log('📋 Metadata:', { title, description, department, confidentiality });

    if (!file || !title || !department) {
      console.error('❌ Missing required fields');
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate file
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      console.error('❌ Invalid file type:', file.type);
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      console.error('❌ File too large:', file.size);
      return NextResponse.json({ error: 'File too large' }, { status: 400 });
    }

    console.log('✅ File validation passed');

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    console.log('📦 File converted to buffer, size:', buffer.length);

    // Upload document (mock implementation for now)
    console.log('📤 Uploading document...');
    const document = await DocumentWorkflowService.uploadDocument(buffer, {
      title,
      description,
      department,
      confidentiality,
      uploadedBy: mockUser.userId
    });

    console.log('📄 Document created:', document);

    // Initiate approval workflow
    console.log('🔄 Initiating approval workflow...');
    await DocumentWorkflowService.initiateApproval(
      document.id,
      `${department}_workflow`,
      mockUser.userId
    );

    console.log('✅ Upload process completed successfully');

    return NextResponse.json({ 
      message: 'Document uploaded successfully',
      document,
      workflow: 'Approval initiated'
    });

  } catch (error) {
    console.error('💥 Upload API error:', error);
    return NextResponse.json({ 
      error: 'Upload failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
