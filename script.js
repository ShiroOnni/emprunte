document.getElementById("loginBtn").addEventListener("click", async function () {
    const errorMessage = document.getElementById("errorMessage");

    if (!window.PublicKeyCredential) {
        errorMessage.textContent = "Votre appareil ne supporte pas l'authentification biométrique.";
        return;
    }

    try {
        const credential = await navigator.credentials.get({
            publicKey: {
                challenge: new Uint8Array(32), // Sécurise la requête
                timeout: 60000,
                userVerification: "required",
                rpId: "ton-domaine.com", // 🔥 Remplace par TON domaine (ex: monapp.vercel.app)
                allowCredentials: [], // ✅ Bloque la demande de Passkey
                authenticatorSelection: { 
                    authenticatorAttachment: "platform", // ✅ Force Face ID / Touch ID
                    residentKey: "discouraged",
                    userVerification: "required"
                }
            },
            mediation: "optional" // ✅ Évite le QR Code
        });

        if (credential) {
            alert("Authentification réussie !");
            window.location.href = "https://ton-domaine.com"; // 🔄 Remplace par l'URL finale
        }
    } catch (error) {
        console.error("Erreur d'authentification :", error);
        errorMessage.textContent = "Échec de l'authentification : " + error.message;
    }
});
