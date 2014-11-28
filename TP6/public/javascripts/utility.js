
// Encode les caractères spéciaux de HTML.
function encodeHTML(data) {
    return data.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
