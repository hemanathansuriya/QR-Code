document.addEventListener("DOMContentLoaded", () => {
    const qrText = document.getElementById("qr-text");
    const generateBtn = document.getElementById("generate-btn");
    const downloadBtn = document.getElementById("download-btn");
    const qrcodediv = document.getElementById("qrcode");
    let qrCode = null;

    generateBtn.addEventListener("click", () => {
        const text = qrText.value.trim();
        if (!text) {
            return alert("⚠ Please enter a valid text or URL");
        }

        // Clear previous QR
        qrcodediv.innerHTML = "";

        // Custom colorful QR
        const colors = ["#ff6a00", "#ee0979", "#12c2e9", "#c471ed", "#f64f59"];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        qrCode = new QRCode(qrcodediv, {
            text: text,
            width: 220,
            height: 220,
            colorDark: randomColor,
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H,
        });

        downloadBtn.style.display = "block";
    });

    downloadBtn.addEventListener("click", () => {
        const canvas = qrcodediv.querySelector("canvas");
        if (!canvas) {
            return alert("⚠ Please generate a QR code first");
        }
        const link = document.createElement("a");
        link.download = "qrcode.png";
        link.href = canvas.toDataURL("image/png");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    qrText.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            generateBtn.click();
        }
    });
});
