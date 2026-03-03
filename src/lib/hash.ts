// Cryptographic hash utilities
import { createHash, randomBytes } from 'crypto';

export class HashService {
  // Generate SHA-256 hash
  static generateSHA256(data: string | Buffer): string {
    return createHash('sha256').update(data).digest('hex');
  }

  // Generate SHA-256 hash for file integrity verification
  static async hashFile(buffer: Buffer): Promise<string> {
    return this.generateSHA256(buffer);
  }

  // Verify file integrity
  static verifyFileIntegrity(buffer: Buffer, expectedHash: string): boolean {
    const actualHash = this.generateSHA256(buffer);
    return actualHash === expectedHash;
  }

  // Generate random token
  static generateToken(length: number = 32): string {
    return randomBytes(length).toString('hex');
  }

  // Generate blockchain-style hash for audit trails
  static generateBlockchainHash(data: any, previousHash?: string): string {
    const dataString = JSON.stringify(data);
    const combinedData = previousHash ? `${previousHash}${dataString}` : dataString;
    return this.generateSHA256(combinedData);
  }

  // Create HMAC for message authentication
  static generateHMAC(data: string, secret: string): string {
    return createHash('sha256')
      .update(data)
      .update(secret)
      .digest('hex');
  }

  // Verify HMAC
  static verifyHMAC(data: string, secret: string, hmac: string): boolean {
    const expectedHMAC = this.generateHMAC(data, secret);
    return expectedHMAC === hmac;
  }
}
