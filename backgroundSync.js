export const initBackgroundSync = () => {
    navigator.serviceWorker.register('/sw.js');
};

export const requestSync = () => {
    navigator.serviceWorker.ready.then(function(swRegistration) {
        return swRegistration.sync.register('SYNC_DATA');
    });
};