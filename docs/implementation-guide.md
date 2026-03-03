# Document Control System - Implementation Guide

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+
- PostgreSQL 14+
- AWS Account (for S3 storage)
- Domain for SSL certificates

### **Installation**
```bash
# Clone repository
git clone https://github.com/bobohthepooh-design/agent-git.git
cd agent-git

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Setup database
npm run db:setup

# Run development server
npm run dev
```

## 🗄️ Database Schema

### **Documents Table**
```sql
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  content TEXT,
  file_url VARCHAR(500),
  file_hash VARCHAR(64),
  version INTEGER DEFAULT 1,
  status VARCHAR(50) DEFAULT 'draft',
  created_by UUID REFERENCES users(id),
  approved_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### **Users Table**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  department VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### **Audit Logs Table**
```sql
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  action VARCHAR(100) NOT NULL,
  resource_type VARCHAR(50),
  resource_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address INET,
  user_agent TEXT,
  timestamp TIMESTAMP DEFAULT NOW(),
  blockchain_hash VARCHAR(64)
);
```

## 🔐 Security Implementation

### **Encryption Setup**
```typescript
// File encryption utilities
import crypto from 'crypto';

const algorithm = 'aes-256-gcm';
const secretKey = process.env.ENCRYPTION_KEY;

export function encryptFile(buffer: Buffer): { encrypted: Buffer; iv: Buffer } {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipher(algorithm, secretKey);
  cipher.setAAD(iv);
  
  const encrypted = Buffer.concat([
    cipher.update(buffer),
    cipher.final()
  ]);
  
  return { encrypted, iv };
}

export function decryptFile(encrypted: Buffer, iv: Buffer): Buffer {
  const decipher = crypto.createDecipher(algorithm, secretKey);
  decipher.setAAD(iv);
  
  return Buffer.concat([
    decipher.update(encrypted),
    decipher.final()
  ]);
}
```

### **Digital Signatures**
```typescript
import { createHash } from 'crypto';

export function generateFileHash(buffer: Buffer): string {
  return createHash('sha256').update(buffer).digest('hex');
}

export function verifyFileIntegrity(
  file: Buffer, 
  expectedHash: string
): boolean {
  const actualHash = generateFileHash(file);
  return actualHash === expectedHash;
}
```

## 📝 API Implementation

### **Document Upload API**
```typescript
// pages/api/documents/upload.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { encryptFile, generateFileHash } from '@/lib/security';
import { s3Client } from '@/lib/storage';
import { prisma } from '@/lib/database';

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const file = req.files.document;
    const buffer = Buffer.from(file.data);
    
    // Encrypt file
    const { encrypted, iv } = encryptFile(buffer);
    
    // Generate hash
    const fileHash = generateFileHash(buffer);
    
    // Upload to S3
    const uploadResult = await s3Client.upload({
      Bucket: process.env.S3_BUCKET,
      Key: `documents/${fileHash}`,
      Body: encrypted,
      Metadata: {
        iv: iv.toString('hex'),
        originalName: file.name,
        uploadTime: new Date().toISOString()
      }
    });
    
    // Save to database
    const document = await prisma.document.create({
      data: {
        title: file.name,
        fileUrl: uploadResult.Location,
        fileHash,
        version: 1,
        status: 'pending_approval',
        createdBy: req.user.id
      }
    });
    
    // Log audit
    await prisma.auditLog.create({
      data: {
        userId: req.user.id,
        action: 'DOCUMENT_UPLOAD',
        resourceType: 'document',
        resourceId: document.id,
        newValues: { title: file.name, status: 'pending_approval' },
        ipAddress: req.ip,
        userAgent: req.headers['user-agent']
      }
    });
    
    res.status(201).json({ document });
    
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
}
```

### **Approval Workflow API**
```typescript
// pages/api/documents/[id]/approve.ts
export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id } = req.query;
    const { approved, comments } = req.body;
    
    // Update document status
    const document = await prisma.document.update({
      where: { id },
      data: {
        status: approved ? 'approved' : 'rejected',
        approvedBy: req.user.id,
        updatedAt: new Date()
      }
    });
    
    // Send notifications
    if (approved) {
      await notificationService.sendApprovalNotification(document);
    }
    
    // Log audit
    await prisma.auditLog.create({
      data: {
        userId: req.user.id,
        action: 'DOCUMENT_APPROVAL',
        resourceType: 'document',
        resourceId: id,
        newValues: { status: approved ? 'approved' : 'rejected', comments },
        ipAddress: req.ip,
        userAgent: req.headers['user-agent']
      }
    });
    
    res.json({ document });
    
  } catch (error) {
    console.error('Approval error:', error);
    res.status(500).json({ error: 'Approval failed' });
  }
}
```

## 🔍 Search & Filtering

### **Advanced Search API**
```typescript
// pages/api/documents/search.ts
export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  const { 
    query, 
    status, 
    department, 
    dateFrom, 
    dateTo,
    page = 1,
    limit = 20 
  } = req.query;
  
  const where = {};
  
  if (query) {
    where.OR = [
      { title: { contains: query, mode: 'insensitive' } },
      { content: { contains: query, mode: 'insensitive' } }
    ];
  }
  
  if (status) {
    where.status = status;
  }
  
  if (department) {
    where.createdBy = {
      department: department
    };
  }
  
  if (dateFrom || dateTo) {
    where.createdAt = {};
    if (dateFrom) where.createdAt.gte = new Date(dateFrom);
    if (dateTo) where.createdAt.lte = new Date(dateTo);
  }
  
  const documents = await prisma.document.findMany({
    where,
    include: {
      createdBy: {
        select: { name: true, email: true, department: true }
      }
    },
    orderBy: { createdAt: 'desc' },
    skip: (Number(page) - 1) * Number(limit),
    take: Number(limit)
  });
  
  const total = await prisma.document.count({ where });
  
  res.json({
    documents,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / Number(limit))
    }
  });
}
```

## 📊 Analytics & Reporting

### **Compliance Dashboard**
```typescript
// pages/api/analytics/compliance.ts
export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  const { dateRange = '30d' } = req.query;
  
  // Calculate compliance metrics
  const totalDocuments = await prisma.document.count();
  const approvedDocuments = await prisma.document.count({
    where: { status: 'approved' }
  });
  const pendingDocuments = await prisma.document.count({
    where: { status: 'pending_approval' }
  });
  
  const auditLogs = await prisma.auditLog.groupBy({
    by: ['action'],
    where: {
      timestamp: {
        gte: new Date(Date.now() - getDaysInMs(dateRange))
      }
    },
    _count: true
  });
  
  const compliance = {
    totalDocuments,
    approvedDocuments,
    pendingDocuments,
    approvalRate: (approvedDocuments / totalDocuments) * 100,
    auditActions: auditLogs,
    lastAudit: await prisma.auditLog.findFirst({
      orderBy: { timestamp: 'desc' }
    })
  };
  
  res.json(compliance);
}
```

## 🚀 Deployment

### **Environment Configuration**
```bash
# Production Environment Variables
DATABASE_URL=postgresql://user:password@host:5432/database
ENCRYPTION_KEY=your-256-bit-encryption-key
S3_BUCKET=your-document-bucket
S3_REGION=us-east-1
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=https://your-domain.com
```

### **Docker Configuration**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### **Docker Compose**
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/documents
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis
  
  db:
    image: postgres:14
    environment:
      POSTGRES_DB: documents
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
  
  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

## 📋 Testing

### **Unit Tests**
```typescript
// __tests__/documents.test.ts
import { encryptFile, decryptFile, generateFileHash } from '@/lib/security';

describe('Security Functions', () => {
  test('should encrypt and decrypt file correctly', () => {
    const original = Buffer.from('test content');
    const { encrypted, iv } = encryptFile(original);
    const decrypted = decryptFile(encrypted, iv);
    
    expect(decrypted.toString()).toBe(original.toString());
  });
  
  test('should generate consistent hash', () => {
    const content = Buffer.from('test content');
    const hash1 = generateFileHash(content);
    const hash2 = generateFileHash(content);
    
    expect(hash1).toBe(hash2);
  });
});
```

### **Integration Tests**
```typescript
// __tests__/api.test.ts
import { createMocks } from 'node-mocks-http';
import handler from '@/pages/api/documents/upload';

describe('/api/documents/upload', () => {
  test('should upload document successfully', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: { title: 'Test Document' }
    });
    
    await handler(req, res);
    
    expect(res._getStatusCode()).toBe(201);
    expect(JSON.parse(res._getData())).toHaveProperty('document');
  });
});
```

## 🔧 Maintenance

### **Backup Procedures**
```bash
#!/bin/bash
# backup-database.sh
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="backup_$DATE.sql"

pg_dump $DATABASE_URL > $BACKUP_FILE

# Upload to S3
aws s3 cp $BACKUP_FILE s3://your-backup-bucket/database/

# Clean local files
rm $BACKUP_FILE

echo "Backup completed: $BACKUP_FILE"
```

### **Log Rotation**
```bash
#!/bin/bash
# rotate-logs.sh
LOG_DIR="/var/log/documents"
RETENTION_DAYS=30

find $LOG_DIR -name "*.log" -mtime +$RETENTION_DAYS -delete

echo "Log rotation completed"
```

## 📞 Support & Monitoring

### **Health Checks**
```typescript
// pages/api/health.ts
export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`;
    
    // Check S3 connection
    await s3Client.listBuckets();
    
    // Check Redis connection
    await redis.ping();
    
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: 'connected',
        storage: 'connected',
        cache: 'connected'
      }
    });
    
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}
```

### **Performance Monitoring**
```typescript
// lib/monitoring.ts
export class PerformanceMonitor {
  static trackApiCall(endpoint: string, duration: number) {
    // Send to monitoring service
    fetch('https://monitoring.your-domain.com/api/metrics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        endpoint,
        duration,
        timestamp: new Date().toISOString()
      })
    });
  }
  
  static trackError(error: Error, context: any) {
    // Send error tracking
    fetch('https://monitoring.your-domain.com/api/errors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: error.message,
        stack: error.stack,
        context,
        timestamp: new Date().toISOString()
      })
    });
  }
}
```

---

## 🎯 Next Steps

1. **Setup development environment**
2. **Create database schema**
3. **Implement authentication**
4. **Build document management APIs**
5. **Add approval workflows**
6. **Implement security features**
7. **Setup monitoring**
8. **Deploy to production**

This system provides enterprise-grade document control with full audit trails, compliance features, and robust security.
