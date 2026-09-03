import { getPerformanceAnalyticsService } from "./analytics.service";

/**
 * Backward compatibility alias for performance service (points to analytics service).
 */
export const getPerformanceService = getPerformanceAnalyticsService;
