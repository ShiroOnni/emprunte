document.getElementById("loginBtn").addEventListener("click", async function () {
    const errorMessage = document.getElementById("errorMessage");

    if (!window.PublicKeyCredential) {
        errorMessage.textContent = "Votre appareil ne supporte pas l'authentification biométrique.";
        return;
    }

    try {
        const credential = await navigator.credentials.get({
            publicKey: {
                challenge: new Uint8Array(32), // 🔐 Sécurise la requête
                timeout: 60000,
                userVerification: "required",
                rpId: window.location.hostname,
                allowCredentials: [], // ✅ Pas de Passkey existante requise
                authenticatorSelection: { 
                    authenticatorAttachment: "platform", // ✅ Forcer un appareil local
                    residentKey: "discouraged", // ✅ Pas d'enregistrement de clé
                    userVerification: "required"
                }
            },
            mediation: "optional" // ✅ Évite le QR Code et force l'authentification locale
        });

        if (credential) {
            alert("Authentification réussie !");
            window.location.href = "https://ton-site.com"; // 🔄 Redirection après succès
        }
    } catch (error) {
        console.error("Erreur d'authentification :", error);
        errorMessage.textContent = "Échec de l'authentification : " + error.message;
    }
});
