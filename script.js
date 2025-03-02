document.getElementById("loginBtn").addEventListener("click", async function () {
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.textContent = "";

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
                rpId: window.location.hostname, // Utilise automatiquement le bon domaine
                allowCredentials: [{ // Empêche le QR Code en forçant l'appareil local
                    type: "public-key",
                    transports: ["internal"]
                }],
                authenticatorSelection: { 
                    authenticatorAttachment: "platform", // Force l'utilisation de Face ID / Touch ID
                    residentKey: "discouraged",
                    userVerification: "required"
                }
            },
            mediation: "optional" // Évite la demande de Passkey / QR Code
        });

        if (credential) {
            alert("Authentification réussie !");
            window.location.href = "/success.html"; // Redirection après succès
        }
    } catch (error) {
        console.error("Erreur d'authentification :", error);
        errorMessage.textContent = "Échec de l'authentification : " + error.message;
    }
});
