// Logger utility for consistent logging across the application
export class Logger {
  private static isDebug = process.env.ENABLE_DEBUG_MODE === 'true';
  
  static debug(message: string, ...args: any[]) {
    if (this.isDebug) {
      console.log(`🔍 [DEBUG] ${message}`, ...args);
    }
  }
  
  static info(message: string, ...args: any[]) {
    console.log(`ℹ️ [INFO] ${message}`, ...args);
  }
  
  static warn(message: string, ...args: any[]) {
    console.warn(`⚠️ [WARN] ${message}`, ...args);
  }
  
  static error(message: string, ...args: any[]) {
    console.error(`❌ [ERROR] ${message}`, ...args);
  }
  
  static success(message: string, ...args: any[]) {
    console.log(`✅ [SUCCESS] ${message}`, ...args);
  }
  
  static performance(operation: string, startTime: number) {
    const duration = performance.now() - startTime;
    this.debug(`Performance: ${operation} took ${duration.toFixed(2)}ms`);
  }
}
