// script.js
async function authenticate() {
    if (!window.PublicKeyCredential) {
        alert("Votre appareil ne supporte pas l'authentification biométrique.");
        return;
    }

    try {
        const credential = await navigator.credentials.get({
            publicKey: {
                challenge: new Uint8Array(32),
                timeout: 60000,
                allowCredentials: [],
                userVerification: "required",
                rpId: window.location.hostname
            }
        });

        if (credential) {
            window.location.href = "https://pornn.com"; // Remplace par ton vrai site
        }
    } catch (error) {
        alert("Échec de l'authentification : " + error.message);
    }
}
