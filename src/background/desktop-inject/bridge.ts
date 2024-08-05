import { walletController } from "../controller";
import { openapiService, permissionService, sessionService } from "../service";
import { testnetOpenapiService } from "../service/openapi";

import { BridgePayload, runAndCatchErr } from "./utils";

async function onRabbyxRpcQuery (payload: BridgePayload) {
    if (!payload.rpcId) {
        throw new Error('[rabbyx-rpc-query] rpcId is required');
    }

    let retPayload = {
        result: null,
        error: null
    } as any;

    switch (payload.method) {
        case 'walletController.boot': {
            const [password] = payload.params;
            retPayload = await runAndCatchErr(() => {
                return walletController.boot(password);
            }, payload.method)
            break;
        }
        case 'walletController.isBooted': {
            retPayload = await runAndCatchErr(() => {
                return walletController.isBooted.apply(walletController);
            }, payload.method)
            break;
        }
        case 'walletController.isUnlocked': {
            retPayload = await runAndCatchErr(() => {
                return walletController.isUnlocked.apply(walletController);
            }, payload.method)
            break;
        }
        case 'walletController.lockWallet': {
            retPayload = await runAndCatchErr(() => {
                return walletController.lockWallet.apply(walletController);
            }, payload.method)
            break;
        }
        case 'walletController.unlock': {
            retPayload = await runAndCatchErr(() => {
                return walletController.unlock.apply(walletController, payload.params as any);
            }, payload.method)
            break;
        }
        case 'walletController.getConnectedSites': {
            retPayload = await runAndCatchErr(() => {
                return walletController.getConnectedSites.apply(walletController);
            }, payload.method)
            break;
        }
        case 'walletController.importPrivateKey': {
            retPayload = await runAndCatchErr(() => {
                const [password] = payload.params || [];
                return walletController.importPrivateKey.apply(walletController, [password]);
            }, payload.method)
            break;
        }
        case 'walletController.getAlianName': {
            retPayload = await runAndCatchErr(() => {
                const [address] = payload.params || [];
                return walletController.getAlianName.apply(walletController, [address]);
            }, payload.method)
            break;
        }
        case 'walletController.updateAlianName': {
            retPayload = await runAndCatchErr(() => {
                const [address, name] = payload.params || [];
                return walletController.updateAlianName.apply(walletController, [address, name]);
            }, payload.method)
            break;
        }
        default: {
            const [ns, method] = payload.method.split('.');

            if (ns === 'walletController' && typeof walletController[method] === 'function') {
                retPayload = await runAndCatchErr(() => {
                    return walletController[method].apply(walletController, payload.params);
                }, payload.method)
            } else if (ns === 'permissionService' && typeof permissionService[method] === 'function') {
                retPayload = await runAndCatchErr(() => {
                    return permissionService[method].apply(permissionService, payload.params);
                }, payload.method)
            } else if (ns === 'sessionService' && typeof sessionService[method] === 'function') {
                retPayload = await runAndCatchErr(() => {
                    return sessionService[method].apply(sessionService, payload.params);
                }, payload.method)
            } else if (ns === 'openapi' && typeof openapiService[method] === 'function') {
                retPayload = await runAndCatchErr(() => {
                    return openapiService[method].apply(openapiService, payload.params);
                }, payload.method)
            } else if (ns === 'testnetOpenapi' && typeof testnetOpenapiService[method] === 'function') {
                retPayload = await runAndCatchErr(() => {
                    return testnetOpenapiService[method].apply(testnetOpenapiService, payload.params);
                }, payload.method)
            } else {
                retPayload.error = {
                    message: `[rabbyx-rpc-query] method ${payload.method} is not supported`
                }
            }
        }
    }

    // console.debug('[debug] retPayload', retPayload);

    window.rabbyDesktop.ipcRenderer.sendMessage('rabbyx-rpc-respond', JSON.stringify({
        rpcId: payload.rpcId,
        result: retPayload?.result,
        error: retPayload?.error,
    }));
}

if (window.rabbyDesktop?.ipcRenderer.on) {
    console.warn('[debug] window.rabbyDesktop?.ipcRenderer.on', window.rabbyDesktop?.ipcRenderer.on);
    window.rabbyDesktop?.ipcRenderer.on('rabbyx-rpc-query', onRabbyxRpcQuery);
} else {
    document.addEventListener('rabbyx-rpc-query', (e: any) => {
        onRabbyxRpcQuery(e.detail);
    });
}

(window as any)._walletController = walletController;
(window as any)._permissionService = permissionService;
(window as any)._sessionService = sessionService;
(window as any)._openApi = openapiService;
