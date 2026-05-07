Console.log("Initializing App & Messaging Services...");

// 3 second ka delay taki page ki speed par asar na pade
setTimeout(async function() {
    try {
        if ('serviceWorker' in navigator) {
            // Firebase Messaging Setup
            const messaging = firebase.messaging();

            // Service worker register karna
            const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
            console.log("Service Worker Registered successfully!");
            
            // Token Generate karna
            const token = await messaging.getToken({ 
                serviceWorkerRegistration: registration,
                vapidKey: 'BAz469owbN-inqTHgRqjkzPlkBb4relDbcwioSpZ0h4HBWy911MDdPXTJysCtEeOQ8IvYKShRB1XcsttDlddmag' 
            });

            if (token) {
                console.log("FCM Token received:", token);
                // Future me agar notification bhejna ho to ye token database me save kara sakte hain
            } else {
                console.warn("No registration token available. User might have blocked notifications.");
            }

            // Jab app open ho tab aane wale messages ko handle karna
            messaging.onMessage((payload) => {
                console.log('Message received in foreground: ', payload);
                // Aap chaho to yahan custom popup/alert dikha sakte ho
            });

        } else {
            console.warn("Service Workers are not supported in this browser.");
        }
    } catch (e) {
        console.error("Firebase setup or Registration Error:", e);
    }
}, 3000);
