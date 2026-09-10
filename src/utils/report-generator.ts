import fs from 'fs';
import path from 'path';
import { ApiCall } from './api-validator';

export interface TestStep {
  name: string;
  status: 'passed' | 'failed' | 'skipped';
  duration: number;
  timestamp: string;
  screenshot?: string;
  error?: string;
}

export interface TestReport {
  timestamp: string;
  testName: string;
  status: 'passed' | 'failed' | 'skipped';
  duration: number;
  steps: TestStep[];
  apiCalls: ApiCall[];
  screenshots: string[];
  errors: string[];
  environment?: string;
  browser?: string;
}

export class ReportGenerator {
  private reportDir: string;

  constructor(reportDir: string = 'reports/test-reports') {
    this.reportDir = reportDir;
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }
  }

  /**
   * Generate a JSON test report
   */
  generateTestReport(report: TestReport): void {
    const filename = `test-report-${report.timestamp.replace(/[:.]/g, '-')}.json`;
    const filepath = path.join(this.reportDir, filename);
    fs.writeFileSync(filepath, JSON.stringify(report, null, 2));
  }

  /**
   * Generate a markdown report
   */
  generateMarkdownReport(report: TestReport): void {
    let markdown = '# Test Execution Report\n\n';
    markdown += `Generated: ${new Date().toISOString()}\n\n`;
    markdown += `## Test: ${report.testName}\n`;
    markdown += `- Status: **${report.status}**\n`;
    markdown += `- Duration: ${report.duration}ms\n`;
    markdown += `- API Calls: ${report.apiCalls.length}\n`;
    markdown += `- Environment: ${report.environment || 'N/A'}\n\n`;
    
    markdown += '### Steps\n\n';
    markdown += '| Step | Status | Duration |\n';
    markdown += '|------|--------|----------|\n';
    report.steps.forEach(step => {
      markdown += `| ${step.name} | ${step.status} | ${step.duration}ms |\n`;
    });
    
    if (report.apiCalls.length > 0) {
      markdown += '\n### API Calls\n\n';
      markdown += '| Method | URL | Status | Duration |\n';
      markdown += '|--------|-----|--------|----------|\n';
      report.apiCalls.forEach(call => {
        markdown += `| ${call.method} | ${call.url} | ${call.status} | ${call.duration}ms |\n`;
      });
    }
    
    if (report.errors.length > 0) {
      markdown += '\n### Errors\n\n';
      report.errors.forEach(error => {
        markdown += `- ${error}\n`;
      });
    }
    
    const filename = `report-${Date.now()}.md`;
    const filepath = path.join(this.reportDir, filename);
    fs.writeFileSync(filepath, markdown);
  }

  /**
   * Generate a summary report
   */
  generateSummaryReport(reports: TestReport[]): void {
    const total = reports.length;
    const passed = reports.filter(r => r.status === 'passed').length;
    const failed = reports.filter(r => r.status === 'failed').length;
    const skipped = reports.filter(r => r.status === 'skipped').length;
    
    const summary = {
      timestamp: new Date().toISOString(),
      total: total,
      passed: passed,
      failed: failed,
      skipped: skipped,
      successRate: total > 0 ? ((passed / total) * 100).toFixed(2) : '0.00',
      totalDuration: reports.reduce((sum, r) => sum + r.duration, 0),
      averageDuration: total > 0 ? reports.reduce((sum, r) => sum + r.duration, 0) / total : 0,
      reports: reports.map(r => ({
        name: r.testName,
        status: r.status,
        duration: r.duration,
        apiCalls: r.apiCalls.length,
      })),
    };
    
    const filepath = path.join(this.reportDir, `summary-${Date.now()}.json`);
    fs.writeFileSync(filepath, JSON.stringify(summary, null, 2));
  }
}