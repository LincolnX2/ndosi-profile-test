export interface ApiCall {
  url: string;
  method: string;
  status: number;
  timestamp: string;
  duration: number;
}

export class ApiValidator {
  private apiCalls: ApiCall[] = [];

  addApiCall(call: ApiCall): void {
    this.apiCalls.push(call);
  }

  getAllApiCalls(): ApiCall[] {
    return this.apiCalls;
  }

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

  validateAllSuccess(): { passed: boolean; failed: ApiCall[] } {
    const failed = this.apiCalls.filter(call => call.status < 200 || call.status >= 300);
    return {
      passed: failed.length === 0,
      failed: failed
    };
  }
}