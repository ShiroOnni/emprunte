document.getElementById("loginBtn").addEventListener("click", async function () {
    const errorMessage = document.getElementById("errorMessage");

    if (!window.PublicKeyCredential) {
        errorMessage.textContent = "Votre appareil ne supporte pas l'authentification biométrique.";
        return;
    }

    try {
        const credential = await navigator.credentials.get({
            publicKey: {
                challenge: new Uint8Array(32),
                timeout: 60000,
                userVerification: "required",
                rpId: "emprunte.vercel.app",  // Mets le domaine exact de ton site
                allowCredentials: [] // Empêche la demande de Passkey / QR Code
            }
        });

        if (credential) {
            window.location.href = "https://ton-site.com"; // Remplace par l'URL où tu veux rediriger
        }
    } catch (error) {
        console.error("Erreur d'authentification :", error);
        errorMessage.textContent = "Échec de l'authentification : " + error.message;
    }
});
