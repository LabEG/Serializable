export var LogLevels;
(function (LogLevels) {
    LogLevels[LogLevels["Trace"] = 0] = "Trace";
    LogLevels[LogLevels["Debug"] = 1] = "Debug";
    LogLevels[LogLevels["Information"] = 2] = "Information";
    LogLevels[LogLevels["Warning"] = 3] = "Warning";
    LogLevels[LogLevels["Error"] = 4] = "Error";
    LogLevels[LogLevels["Critical"] = 5] = "Critical";
    LogLevels[LogLevels["None"] = 6] = "None";
})(LogLevels || (LogLevels = {}));
