
import resolversApi = require("./resolversApi");
export declare function hasAsyncRequests(): boolean;
export interface NotifyCallback {
    (url: string): void;
}
export declare function addLoadCallback(listener: NotifyCallback): void;
export declare function addNotify(url: string): void;
export declare function removeNotity(url: string): void;
export declare function isWaitingFor(url: any): boolean;
export declare function set(url: string, content: resolversApi.Response): void;
export declare function get(url: string): resolversApi.Response;
