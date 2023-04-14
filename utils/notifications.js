import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

async function sendNotification(title,body,delay=0){
    const trigger = {
        seconds: delay,
    };
    const content = {
        title: title,
        body: body,
    };
    await Notifications.scheduleNotificationAsync({content,trigger});
}

function cancelNotifications(){
    Notifications.cancelAllScheduledNotificationsAsync();
}

export { sendNotification, cancelNotifications };