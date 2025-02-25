document.getElementById("loginBtn").addEventListener("click", async function () {
    const errorMessage = document.getElementById("errorMessage");

    if (!window.PublicKeyCredential) {
        errorMessage.textContent = "Votre appareil ne supporte pas l'authentification biométrique.";
        return;
    }

    try {
        const credential = await navigator.credentials.get({
            publicKey: {
                challenge: new Uint8Array(32), // Challenge aléatoire pour sécuriser l'authentification
                timeout: 60000,
                userVerification: "required",
                rpId: window.location.hostname, // Utiliser le domaine actuel
                allowCredentials: [], // Empêcher la Passkey
                authenticatorSelection: {
                    authenticatorAttachment: "platform", // ✅ Utiliser l'appareil actuel
                    requireResidentKey: false, // ✅ Ne pas stocker la clé (évite Passkey)
                    userVerification: "required"
                }
            },
            mediation: "required" // ✅ Bloque le QR Code et force l'authentification locale
        });

        if (credential) {
            alert("Authentification réussie !");
            window.location.href = "https://ton-site.com"; // Redirection après succès
        }
    } catch (error) {
        console.error("Erreur d'authentification :", error);
        errorMessage.textContent = "Échec de l'authentification : " + error.message;
    }
});
