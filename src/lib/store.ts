import { ComplianceReport } from './types';

export interface GlobalStats {
    complianceScore: number;
    totalClusters: number;
    activeRegions: number;
    scansPerformed: number;
    lastSync: Date;
}

// Initial Mock State
let stats: GlobalStats = {
    complianceScore: 89,
    totalClusters: 12,
    activeRegions: 8,
    scansPerformed: 142,
    lastSync: new Date()
};

let scanHistory: ComplianceReport[] = [];

export const store = {
    getStats: () => ({ ...stats }),

    updateStats: (newStats: Partial<GlobalStats>) => {
        stats = { ...stats, ...newStats };
    },

    addScan: (report: ComplianceReport) => {
        scanHistory.unshift(report);
        // Update stats logic
        stats.scansPerformed++;
        // Simple logic: if critical, lower score slightly; if clean, raise it
        if (report.status === 'critical') {
            stats.complianceScore = Math.max(0, stats.complianceScore - 5);
        } else if (report.status === 'compliant') {
            stats.complianceScore = Math.min(100, stats.complianceScore + 1);
        }
    },

    getRecentScans: (limit = 5) => {
        return scanHistory.slice(0, limit);
    }
};
