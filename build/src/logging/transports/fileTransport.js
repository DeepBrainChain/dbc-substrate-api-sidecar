"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileTransport = void 0;
const winston_1 = require("winston");
const SidecarConfig_1 = require("../../SidecarConfig");
const fileTransport = (fileName) => {
    return new winston_1.transports.File({
        level: SidecarConfig_1.SidecarConfig.config.LOG.LEVEL,
        filename: `${SidecarConfig_1.SidecarConfig.config.LOG.WRITE_PATH}/${fileName}`,
        handleExceptions: true,
        maxsize: SidecarConfig_1.SidecarConfig.config.LOG.WRITE_MAX_FILE_SIZE,
        maxFiles: SidecarConfig_1.SidecarConfig.config.LOG.WRITE_MAX_FILES,
    });
};
exports.fileTransport = fileTransport;
//# sourceMappingURL=fileTransport.js.map