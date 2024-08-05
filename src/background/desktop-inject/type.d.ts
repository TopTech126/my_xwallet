interface Window {
    rabbyDesktop: {
        ipcRenderer: {
            sendMessage<T extends string>(
                channel: T,
                ...args: any[]
            ): void;
            invoke<T extends any, U extends string>(
                channel: U,
                ...args: any[]
            ): Promise<T>;
            on: {
                <T extends string>(
                    channel: T,
                    func: (...args: any[]) => void
                ): (() => void) | undefined;
                <T extends string>(
                    channel: T,
                    func: (event: any) => void
                ): (() => void) | undefined;
            };
            once: {
                <T extends string>(
                    channel: T,
                    func: (...args: any[]) => void
                ): (() => void) | undefined;
                <T extends string>(
                    channel: T,
                    func: (event: any) => void
                ): (() => void) | undefined;
            };
        };
        rendererHelpers: {
            b64ToObjLink: (b64: string) => string;
            bufToObjLink: (buf: Buffer | Uint8Array) => string;
      
            formatDappURLToShow: (dappURL: string) => string;
        };
    };
}