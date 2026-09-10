export interface ApiCall {
  url: string;
  method: string;
  status: number;
  statusText?: string;
  timestamp: string;
  duration: number;
  requestHeaders?: Record<string, string>;
  responseHeaders?: Record<string, string>;
  requestBody?: any;
  responseBody?: any;
}

export class ApiValidator {
  private apiCalls: ApiCall[] = [];

  /**
   * Add an API call to the list
   */
  addApiCall(call: ApiCall): void {
    this.apiCalls.push(call);
  }

  /**
   * Get all API calls
   */
  getAllApiCalls(): ApiCall[] {
    return this.apiCalls;
  }

  /**
   * Get unique endpoints from API calls
   */
  getUniqueEndpoints(): string[] {
    const endpoints = this.apiCalls.map(call => {
      try {
        const url = new URL(call.url);
        return url.pathname;
      } catch {
        return call.url;
      }
    });
    return [...new Set(endpoints)];
  }

  /**
   * Get calls by endpoint
   */
  getCallsByEndpoint(endpoint: string): ApiCall[] {
    return this.apiCalls.filter(call => call.url.includes(endpoint));
  }

  /**
   * Validate all API calls have successful status codes
   */
  validateAllSuccess(): { passed: boolean; failed: ApiCall[] } {
    const failed = this.apiCalls.filter(call => call.status < 200 || call.status >= 300);
    return {
      passed: failed.length === 0,
      failed: failed
    };
  }

  /**
   * Validate specific status code
   */
  validateStatusCodes(expectedStatus: number = 200): { passed: boolean; failed: ApiCall[] } {
    const failed = this.apiCalls.filter(call => call.status !== expectedStatus);
    return {
      passed: failed.length === 0,
      failed: failed
    };
  }

  /**
   * Generate a summary report
   */
  generateReport(): string {
    const total = this.apiCalls.length;
    const success = this.apiCalls.filter(call => call.status >= 200 && call.status < 300).length;
    const failed = total - success;
    const successRate = total > 0 ? ((success / total) * 100).toFixed(2) : '0.00';
    
    let report = '=== API Validation Report ===\n';
    report += `Total API Calls: ${total}\n`;
    report += `Successful: ${success}\n`;
    report += `Failed: ${failed}\n`;
    report += `Success Rate: ${successRate}%\n\n`;
    
    report += 'Endpoints Called:\n';
    const endpoints = this.getUniqueEndpoints();
    endpoints.forEach(endpoint => {
      const calls = this.getCallsByEndpoint(endpoint);
      const statuses = [...new Set(calls.map(c => c.status))];
      const methods = [...new Set(calls.map(c => c.method))];
      report += `  ${endpoint} - Methods: ${methods.join(', ')} - Statuses: ${statuses.join(', ')} (${calls.length} calls)\n`;
    });
    
    if (failed > 0) {
      report += '\nFailed Calls:\n';
      this.apiCalls.filter(call => call.status < 200 || call.status >= 300).forEach(call => {
        report += `  ${call.method} ${call.url} - Status: ${call.status}\n`;
      });
    }
    
    return report;
  }

  /**
   * Get statistics about API calls
   */
  getStats(): Record<string, any> {
    const total = this.apiCalls.length;
    const success = this.apiCalls.filter(call => call.status >= 200 && call.status < 300).length;
    
    return {
      total,
      success,
      failed: total - success,
      successRate: total > 0 ? (success / total) * 100 : 0,
      uniqueEndpoints: this.getUniqueEndpoints().length,
      statusCodes: this.apiCalls.reduce((acc, call) => {
        acc[call.status] = (acc[call.status] || 0) + 1;
        return acc;
      }, {} as Record<number, number>),
      averageDuration: total > 0 ? this.apiCalls.reduce((sum, call) => sum + call.duration, 0) / total : 0
    };
  }
}