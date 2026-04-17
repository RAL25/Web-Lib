const atual = new Date();
const depois = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

if ((Number(depois) - Number(atual)) / (24 * 60 * 60 * 1000) >= 5) {
  console.log("Pode aumentar o prazo");
} else {
  console.log("Ainda não pode aumentar o prazo. Leia mais um pouco");
}
