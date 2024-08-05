export type BridgePayload = {
    rpcId: string
    method: string
    params: any[]
}

type LooseErrorObj = {
    code?: string;
    message?: string;
    stack?: string;
}
export async function runAndCatchErr<T = any>(proc: Function, mark?: string): Promise<{
    result: T | null
    error?: LooseErrorObj
}> {
    try {
        console.debug('[debug] runAndCatchErr:: mark', mark);
        const result = await proc();
        // console.debug('[debug] runAndCatchErr:: result', result);

        return {
            result: result
        };
    } catch (err) {
        console.error('runAndCatchErr:: err occured', err)

        return {
            result: null,
            error: {
                code: (err as any).code,
                message: err.message,
                stack: err.stack,
            }
        };
    }
}