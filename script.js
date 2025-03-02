document.getElementById("loginBtn").addEventListener("click", async function () {
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.textContent = "";

    if (!window.PublicKeyCredential) {
        errorMessage.textContent = "Votre appareil ne supporte pas l'authentification biométrique.";
        return;
    }

    try {
        // ✅ Utilise un challenge généré de manière sécurisée
        const challenge = new Uint8Array(32);
        window.crypto.getRandomValues(challenge);

        const credential = await navigator.credentials.get({
            publicKey: {
                challenge: challenge.buffer, // ✅ Utilise un ArrayBuffer valide
                timeout: 60000,
                userVerification: "required",
                rpId: window.location.hostname,
                allowCredentials: [{
                    type: "public-key",
                    transports: ["internal"] // ✅ Force l'utilisation de Face ID / Touch ID
                }],
                authenticatorSelection: { 
                    authenticatorAttachment: "platform",
                    residentKey: "discouraged",
                    userVerification: "required"
                }
            },
            mediation: "optional"
        });

        if (credential) {
            alert("Authentification réussie !");
            window.location.href = "/success.html"; // ✅ Redirection après succès
        }
    } catch (error) {
        console.error("Erreur d'authentification :", error);
        errorMessage.textContent = "Échec de l'authentification : " + error.message;
    }
});
