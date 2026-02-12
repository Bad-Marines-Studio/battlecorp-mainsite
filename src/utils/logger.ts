type LogLevel = 'verbose' | 'log' | 'warn' | 'error';

export class Logger {
    private static enabledLevels: Set<LogLevel> = new Set(['log', 'warn', 'error']);

    static initFromEnv(envValue?: string) {
        if (!envValue) return;
        const levels = envValue.split(',').map(l => l.trim() as LogLevel);
        Logger.setLevels(levels);
    }

    static enable(level: LogLevel) {
        Logger.enabledLevels.add(level);
    }

    static disable(level: LogLevel) {
        Logger.enabledLevels.delete(level);
    }

    static verbose(...args: any[]) {
        if (Logger.enabledLevels.has('verbose')) {
            console.log('[VERBOSE]', ...args);
        }
    }

    static log(...args: any[]) {
        if (Logger.enabledLevels.has('log')) {
            console.log('[LOG]', ...args);
        }
    }

    static warn(...args: any[]) {
        if (Logger.enabledLevels.has('warn')) {
            console.warn('[WARN]', ...args);
        }
    }

    static error(...args: any[]) {
        if (Logger.enabledLevels.has('error')) {
            console.error('[ERROR]', ...args);
        }
    }

    static setLevels(levels: LogLevel[]) {
        Logger.enabledLevels = new Set(levels);
    }
}

Logger.initFromEnv(import.meta.env.VITE_LOG_LEVELS);
