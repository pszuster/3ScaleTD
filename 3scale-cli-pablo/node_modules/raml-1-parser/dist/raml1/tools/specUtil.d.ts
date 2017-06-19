export declare function link(link: string, caption?: string): string;
export declare class LinkProcessor {
    occuredLinks: {
        [key: string]: boolean;
    };
    resolvedLinks: {
        [key: string]: boolean;
    };
    unresolvedLinks: string[];
    processLinks(text: string): string;
}
