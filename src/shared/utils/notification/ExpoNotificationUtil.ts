import * as Notifications from 'expo-notifications';

export class ExpoNotificationUtil {
    static async requestPermission(): Promise<boolean> {
        try {
            console.log('Solicitando permisos de notificación...');
            const { status } = await Notifications.requestPermissionsAsync();
            console.log('Estado de permisos:', status);
            return status === 'granted';
        } catch (error) {
            console.error('Error al solicitar permisos:', error);
            return false;
        }
    }

    static async getExpoPushToken(): Promise<string | null> { 
        try {
            const status = await this.requestPermission();
            if (!status) {
                console.log('Permisos denegados');
                return null;
            }
            console.log('Obteniendo push token...');
            
            // Para desarrollo local, puedes necesitar esto:
            const token = await Notifications.getExpoPushTokenAsync({
                projectId: 'tu-project-id', // Si usas EAS, esto es necesario
            });
            
            console.log('Token obtenido:', token.data);
            return token.data;
        } catch (error) {
            console.error('Error al obtener push token:', error);
            return null;
        }
    }

    static async scheduleLocalNotification(
        title: string, 
        body: string, 
        secondsFromNow: number
    ): Promise<string | null> {
        try {
            console.log('Programando notificación...');
            console.log('Título:', title);
            console.log('Cuerpo:', body);
            console.log('Segundos:', secondsFromNow);
            
            // Asegúrate de tener permisos primero
            const hasPermission = await this.requestPermission();
            if (!hasPermission) {
                console.log('No hay permisos para programar notificación');
                return null;
            }
            
            const notificationId = await Notifications.scheduleNotificationAsync({
                content: {
                    title,
                    body,
                    sound: true,
                    priority: Notifications.AndroidNotificationPriority.HIGH,
                    badge: 3,
                    launchImageName: 'default',
                    data: { type: 'study-reminder' },
                },
                trigger: {

                    seconds: secondsFromNow,
                    channelId: "default",
                },
            });
            
            console.log('✅ Notificación programada con ID:', notificationId);
            console.log('📱 Se mostrará en', secondsFromNow, 'segundos');
            
            return notificationId;
        } catch (error) {
            console.error('❌ Error al programar notificación:', error);
            return null;
        }
    }   

    static async clearAllNotifications(): Promise<void> {
        try {
            console.log('Limpiando todas las notificaciones...');
            await Notifications.cancelAllScheduledNotificationsAsync();
            console.log('✅ Todas las notificaciones han sido canceladas');
        } catch (error) {
            console.error('❌ Error al limpiar notificaciones:', error);
        }
    }
}